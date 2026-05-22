'use client'

import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Heading2,
  Heading3,
  Undo2,
  Redo2,
  Unlink,
  ImagePlus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { normalizeRichHtml } from '@/lib/cms-field-types'
import { resolveMediaUrl } from '@/lib/media'
import { MediaPickerDialog } from '@/components/admin/media-picker-dialog'
import type { MediaLibraryItem } from '@/lib/admin-api'

type RichTextEditorProps = {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
}

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void
  active?: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors',
        'hover:bg-paper hover:text-ink',
        active && 'bg-accent-blue/10 text-accent-blue'
      )}
    >
      {children}
    </button>
  )
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const [pickerOpen, setPickerOpen] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          class: 'text-accent-blue underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'my-4 max-h-96 w-auto max-w-full rounded-lg',
        },
      }),
      Placeholder.configure({ placeholder: placeholder ?? 'Write content…' }),
    ],
    content: value || '',
    onUpdate: ({ editor: ed }) => {
      onChange(normalizeRichHtml(ed.getHTML()))
    },
    editorProps: {
      attributes: {
        class:
          'tiptap-editor-content min-h-[8rem] px-4 py-3 text-sm leading-relaxed text-ink focus:outline-none [&_img]:max-w-full',
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    const current = normalizeRichHtml(editor.getHTML())
    const next = normalizeRichHtml(value || '')
    if (current !== next) {
      editor.commands.setContent(next || '<p></p>', { emitUpdate: false })
    }
  }, [editor, value])

  function setLink() {
    if (!editor) return
    const prev = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('Link URL', prev ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  function insertImage(item: MediaLibraryItem) {
    if (!editor || item.type !== 'image') return
    const src = resolveMediaUrl(item.url)
    editor
      .chain()
      .focus()
      .setImage({ src, alt: item.altText ?? item.title ?? '' })
      .run()
  }

  if (!editor) {
    return (
      <div className={cn('h-32 animate-pulse rounded-xl border border-edge bg-paper/60', className)} />
    )
  }

  return (
    <>
      <div className={cn('overflow-hidden rounded-xl border border-edge bg-paper-white shadow-sm', className)}>
        <div className="flex flex-wrap items-center gap-0.5 border-b border-edge/80 bg-paper/50 px-2 py-1.5">
          <ToolbarButton
            label="Bold"
            active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Italic"
            active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-edge" aria-hidden />
          <ToolbarButton
            label="Heading 2"
            active={editor.isActive('heading', { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Heading 3"
            active={editor.isActive('heading', { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-edge" aria-hidden />
          <ToolbarButton
            label="Bullet list"
            active={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Numbered list"
            active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-edge" aria-hidden />
          <ToolbarButton label="Insert image from library" onClick={() => setPickerOpen(true)}>
            <ImagePlus className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Add link" active={editor.isActive('link')} onClick={setLink}>
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Remove link"
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            <Unlink className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-edge" aria-hidden />
          <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>
            <Undo2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>
            <Redo2 className="h-4 w-4" />
          </ToolbarButton>
        </div>
        <EditorContent editor={editor} />
      </div>
      <MediaPickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={insertImage}
        imagesOnly
      />
    </>
  )
}
