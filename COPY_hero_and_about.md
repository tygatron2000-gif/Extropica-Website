# Rewritten copy — Hero & About (grower-focused)

Drop-in replacements for `index.html`. Everything below leads with the fact that
Extropica Fresh **grows its own herbs in Kenya** — the core repositioning.

Anywhere you see `[BRACKETS]`, fill in your real detail before publishing.
No invented numbers are used.

---

## HERO SECTION

### Hero badge (`.hero-badge`)
Currently: `🌍 &nbsp;Global Herb Exports`

Replace with:
```
🌿 &nbsp;Kenyan-Grown Fresh Herbs
```

### Hero title (`.hero-title`)
Currently: "Nature's Finest Herbs, / Delivered Worldwide"

Replace with:
```html
<h1 class="hero-title">
  Grown on Our Farms,<br>
  <span class="accent">Exported Fresh to the World</span>
</h1>
```

### Hero sub (`.hero-sub`)
Currently describes "sourcing from carefully selected farms."

Replace with:
```html
<p class="hero-sub">
  Extropica Fresh grows premium fresh herbs on our own farms in [COUNTY/REGION],
  Kenya — and exports them direct to buyers worldwide. One origin, full
  traceability, and peak freshness from our soil to your shelf.
</p>
```

> Why this works: "our own farms" + a named place is the single line that separates
> you from every trading middleman a buyer has already talked to. It's concrete and
> verifiable, which is exactly what B2B buyers trust.

---

## ABOUT SECTION (`#about`)

### Section label (`.section-label`)
Currently: "Who We Are" — keep, it's fine.

### Section title (`.section-title`)
Currently: "Rooted in Quality, Growing Globally"

Keep this — it already hints at growing. Or sharpen to:
```
We Grow What We Export
```

### Section sub (`.section-sub`)
Currently describes handling sourcing, post-harvest, compliance, logistics.

Replace with:
```html
<p class="section-sub">
  Extropica Fresh is a Kenyan grower and exporter of premium fresh herbs. Unlike
  traders who buy and resell, we cultivate our herbs on our own land — which means
  we control quality from the moment a seed goes in the ground to the moment your
  order ships. We handle the full journey: growing, harvesting, grading, packing,
  phytosanitary compliance, and cold-chain export.
</p>
```

### Feature rows (`.about-features`)
Three of the four are already good. Sharpen the traceability one to lean on the
grower advantage:

**Full Traceability** — replace its `<p>` with:
```
Every order traces back to our own farm plots — not an anonymous supply chain.
```

Keep "Strict Quality Control," "Regulatory Compliance," and "Flexible Packaging"
as they are.

---

## OPTIONAL — replace the removed stats block

If you go with honest trust signals instead of deleting `.hero-stats` entirely,
here are three non-numeric ones to swap in (structure stays, you just lose the
`data-target` counters):

```
Kenyan-Grown   ·   Single-Origin   ·   Export-Ready
```

Or, if you have ONE real number you're confident in (e.g. years operating, or a
real herb count), use just that one rather than four invented ones. One true number
beats four fake ones.

---

## Fill-in checklist before publishing
- [ ] `[COUNTY/REGION]` — where your farms actually are
- [ ] Confirm "We Grow What We Export" vs. keeping original title
- [ ] Decide: honest trust signals, one real stat, or remove the block
