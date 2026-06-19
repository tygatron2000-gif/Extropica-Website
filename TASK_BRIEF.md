# Task Brief — Fix positioning & remove placeholder content

Read `CLAUDE.md` in this directory first for full project context. The short version:
Extropica Fresh is a **Kenyan grower-exporter** of fresh herbs. The current site was
built from a generic template and wrongly describes the company as a global sourcing
middleman with invented statistics. Your job is to correct this.

Work through the sections below. Confirm with me before deleting whole sections —
edits to copy you can make directly.

---

## 1. Fix the core positioning (highest priority)

### index.html
- **Hero sub** (`.hero-sub`): currently says the company "sources and exports premium-quality
  fresh herbs straight from carefully selected farms." Rewrite around GROWING our own herbs
  in Kenya. Lead with the grower angle.
- **Hero badge** (`.hero-badge`): "🌍 Global Herb Exports" is fine, but consider
  "🌿 Kenyan-Grown Fresh Herbs" to lead with origin.
- **About section** (`#about`): the intro paragraph (`.section-sub`) describes a sourcing
  company. Rewrite so the FIRST thing a reader learns is that we grow our own herbs.
  The four feature rows (Quality Control, Traceability, Compliance, Packaging) are good —
  keep them, but make Traceability explicitly "from our own farm plots."

### products.html
- Every product card has an `.origin` line currently reading "📍 Mediterranean Farms",
  "📍 North African Farms", "📍 Highland Farms", "📍 Scandinavian & Eastern European Farms",
  "📍 South American Farms", etc. **Replace ALL of them** with our real Kenyan origin.
  Ask me for the exact wording (county/region) — default to "📍 Grown in Kenya" if I
  don't specify.
- Product descriptions that imply foreign sourcing (e.g. Thai Basil "a staple in Asian
  cuisines") can stay as use-case descriptions, but remove any implication that WE source
  from those regions.

### Both pages + footer
- Tagline "Built for global fresh herb trade" → keep or adjust, low priority.

---

## 2. Remove invented statistics

### index.html — hero stats block (`.hero-stats`)
The four animated counters are fake: "40+ Countries Served", "200T+ Monthly Volume",
"98% On-Time Delivery", "15+ Herb Varieties".
- Remove the fabricated numbers. Two options — ask me which I prefer:
  (a) Replace the block with honest non-numeric trust signals
      (e.g. "Kenyan-Grown · Family-Run · Export-Ready"), OR
  (b) Remove the `.hero-stats` block entirely until we have real figures.
- If removing entirely, also remove the now-unused counter code in `js/main.js`
  (the `animateCounter`, `startCounters`, and `heroStats` observer blocks) so there's
  no dead code. Leave a comment noting it was removed.

---

## 3. Real contact details

### contact.html
- Email: `exports@extropicafresh.com` → `info@extropica.ke` (confirm exact address with me).
- Phone/WhatsApp: `+1 (555) 000-1234` is a fake US number → replace with the real
  Kenyan number (ask me).
- Business hours: "Mon–Fri, 08:00–18:00 (UTC+2)" → Kenya is **UTC+3**. Fix the timezone.
- **Trust strip** (the dark "Trusted by importers in 🇬🇧🇩🇪🇦🇪🇺🇸🇯🇵🇳🇱🇸🇦" section near the
  bottom): this is invented social proof. Recommend removing it until we have real
  client markets to name. Confirm before deleting.

### Footer (all three pages)
- Footer email/links — make sure nothing references the old fake domain.

---

## 4. Confirm the product list is real
products.html lists 12 herbs: Sweet Basil, Thai Basil, Flat-Leaf Parsley, Curly Parsley,
Spearmint, Peppermint, Coriander/Cilantro, Rosemary, Thyme, Fresh Dill, Lemon Verbena,
Chives. Ask me which of these we actually grow and trim the list to real products only.

---

## What NOT to change
- The overall design, layout, CSS structure, and responsive behavior are good — leave them.
- Don't introduce frameworks or libraries.
- Don't touch DNS or deployment config — that's a separate task.

## Suggested order of work
1. index.html positioning + remove stats
2. contact.html real details + remove fake trust strip
3. products.html origins + trim list
4. Clean up any dead JS

Ask me the open questions (real origin wording, real contact details, which herbs are
real) before finalizing — don't guess on facts.
