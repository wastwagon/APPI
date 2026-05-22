import Link from 'next/link'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-edge bg-paper-white px-4 py-4">
        <Link href="/" className="mx-auto flex max-w-md items-center gap-3">
          <Image src="/images/appi-logo.png" alt="APPI" width={100} height={40} className="h-9 w-auto" />
        </Link>
      </header>
      {children}
    </div>
  )
}
