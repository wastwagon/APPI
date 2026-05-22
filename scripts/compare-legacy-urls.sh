#!/bin/bash
# Compare HTTP status codes: legacy :7200 vs new :3010
OLD="${LEGACY_URL:-http://127.0.0.1:7200}"
NEW="${NEW_URL:-http://127.0.0.1:3010}"

paths=(
  "/"
  "/about" "/about/who-we-are" "/about/strategic-objectives" "/about/leadership" "/about/framework" "/about/declarations"
  "/faq"
  "/platforms" "/platforms/academy" "/platforms/summit" "/platforms/working-groups" "/platforms/reform-dialogues"
  "/platforms/inclusive-leadership" "/platforms/learning-hubs" "/platforms/mediation"
  "/insights" "/insights/publications" "/insights/thought-leadership" "/insights/events" "/insights/press" "/insights/media"
  "/engagement" "/engagement/parties" "/engagement/partner" "/engagement/youth-women" "/engagement/ctpe-afcfta"
  "/summit" "/summit/register" "/summit/media"
  "/contact" "/contact/secretariat" "/contact/mediation" "/contact/social" "/contact-us"
  "/privacy" "/terms" "/accessibility"
  "/member/login" "/member/register" "/member/dashboard" "/member/settings"
)

printf "%-42s %7s %7s %s\n" "PATH" "LEGACY" "NEW" "NOTE"
for p in "${paths[@]}"; do
  o=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "${OLD}${p}" 2>/dev/null || echo "---")
  n=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "${NEW}${p}" 2>/dev/null || echo "---")
  note=""
  if [ "$p" = "/contact-us" ] && [ "$n" = "308" ] || [ "$n" = "301" ]; then note="redirect OK"
  elif [ "$p" = "/about-us" ] && [ "$n" = "308" ] || [ "$n" = "301" ]; then note="redirect OK"
  elif [ "$o" != "$n" ]; then note="DIFF"
  fi
  printf "%-42s %7s %7s %s\n" "$p" "$o" "$n" "$note"
done
