# Extropica Fresh — Website Project

## What this project is
A custom-coded static marketing website for **Extropica Fresh**, a Kenyan fresh-herb
**grower-exporter**. Vanilla HTML, CSS, and JavaScript — no build tools, no frameworks,
no server-side code. Will be deployed to the domain `extropica.ke`.

## The single most important thing to get right
Extropica Fresh **grows its own herbs in Kenya** and exports them. It is NOT a
trading middleman that sources produce from farms around the world. This is the
company's biggest competitive advantage and the whole site must reflect it.

When writing or editing copy:
- Use language like "grown on our own farms," "from our soil," "single-origin."
- NEVER use "sourced from carefully selected farms" or imply reselling.
- Product origin is **Kenya** (one place, our own land) — not Mediterranean,
  North African, Highland, Scandinavian, or South American farms.

## Tech stack & structure
- Pages: `index.html` (home), `products.html` (catalog), `contact.html` (inquiry form)
- Styles: `css/style.css` — CSS custom properties in `:root` (green/white/black palette)
- Scripts: `js/main.js` — navbar scroll, hamburger menu, scroll-reveal (IntersectionObserver),
  animated counters, product filter, contact form handler
- Images: `images/` (logo_2.png is the current logo)

## Code conventions
- Keep it vanilla — no libraries or frameworks.
- Match the existing CSS variable system; don't hardcode colors.
- Preserve the existing class names and JS hooks unless deliberately refactoring.
- Mobile-responsive is already in place — keep it working.

## Honesty rules for content
- No invented statistics. If a number isn't real and verified, don't put it on the site.
- No fake social proof (invented client countries, testimonials, partner logos).
- Contact details must be real: domain is `extropica.ke`, Kenya is UTC+3.

## Deployment context (for later)
- Workflow: local Git → GitHub → Hostinger via SSH/`git pull`.
- The `.ke` domain is registered via a Kenyan registrar (KENIC-accredited).
- Email runs on the same domain via MX records — never touch DNS in a way that
  could break company email. Only the A record changes if web hosting moves.
