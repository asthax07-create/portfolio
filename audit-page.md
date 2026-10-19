# Webpage audit: personal profile

Review of `index.html`, `style.css`, and `script.js` against the requested personal profile webpage.

## Requirements checklist

| Requirement | Status | Notes |
| --- | --- | --- |
| HTML in `index.html` | Pass | Single entry page with semantic document structure. |
| All styling in `style.css` | Pass | Linked via `<link rel="stylesheet">`. |
| No inline `style` attributes | Pass | No `style=""` on elements; presentation lives in CSS. |
| Page title | Pass | `<title>Astha \| Software Engineer</title>`. |
| One main heading | Pass | A single `<h1>` introduces the page. |
| About section | Pass | `#about` with heading and biography paragraphs. |
| Skills section as a list | Pass | `#skills` uses a `<ul>` of skills. |
| Projects section with links | Pass | `#projects` lists three projects, each with an `<a href>`. |
| Unknown details marked PLACEHOLDER | Pass | Tagline, bio, contact, skills, project titles/URLs/descriptions, and footer note include the word `PLACEHOLDER`. |
| JavaScript in `script.js` | Pass | Theme toggle, `localStorage` preference, and copyright year. |

## Structure and semantics

- Uses a proper document outline: `header` / `nav` / `main` / `section` / `footer`.
- Section headings are associated with `aria-labelledby` for clearer landmarks.
- Navigation is labeled (`aria-label="Primary"`).
- A skip link is provided for keyboard users.
- Lists are real lists (`ul`/`li`), not styled paragraphs.

## Accessibility and interaction

- Color contrast in both light and dark themes is intended to stay readable (dark green/teal on cream; mint on dark navy).
- Focusable controls include links and the theme button; the skip link becomes visible on focus.
- Theme button exposes `aria-pressed` and updates its label between “Dark mode” and “Light mode”.
- Smooth scrolling is CSS-only; no inline event handlers in HTML.

## Styling notes

- Layout is centered with a readable max width (`720px`).
- Sticky header keeps section links available while scrolling.
- Cards for About, Skills, and Projects keep content grouped.
- A small-screen breakpoint stacks the header so the toggle does not collide with nav links.
- Sections use `scroll-margin-top` so in-page nav targets are not hidden under the sticky header.
- `color-mix` and `backdrop-filter` improve the sticky header; older browsers still get a solid fallback via `--bg`.

## JavaScript notes

- Script is deferred by placement at the end of `body` (no `defer` needed for this load order).
- Theme preference is persisted in `localStorage` under `profile-theme`.
- First visit follows `prefers-color-scheme` when nothing is stored.
- Copyright year is filled at runtime so the footer stays current.

## Placeholders to replace

Search the project for `PLACEHOLDER` and update:

- Professional tagline
- About biography and location/role details
- Email address (`PLACEHOLDER@example.com`)
- Five skill names
- Three project titles, descriptions, and URLs (`https://PLACEHOLDER.example.com/...`)
- Footer note / social link

Known details that were **not** placeholder-tagged: name **Astha** and role **software engineer**.

## Suggested follow-ups (optional)

- Add a real favicon and Open Graph metadata once the public URL is known.
- Replace example project URLs with GitHub or live demos.
- Add a contact form or LinkedIn/GitHub links if desired.
- Consider `prefers-reduced-motion` if more animation is added later.

## Verdict

The page meets the stated HTML/CSS/JS structure, keeps styling external, marks unknown copy with `PLACEHOLDER`, and includes a small accessible enhancement in JavaScript (theme + year).
