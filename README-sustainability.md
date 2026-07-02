# Sustainability Page — Miracle Oman Travel

A drop-in Sustainability page built from the content in
`Miracle_Oman__Sustainability_Web_page_content.docx`, designed for the
WordPress site at [miracleoman.travel](https://miracleoman.travel/).

## Files

| File | What it is |
| --- | --- |
| `sustainability.html` | Full standalone preview. Open in any browser to see how the page will look. Includes the paste-into-WordPress block clearly delimited by comments. |
| `sustainability-wp-block.html` | The exact snippet to paste into a single WordPress "Custom HTML" block (or Elementor "HTML" widget). No `<html>`/`<body>` wrapper — the theme header/footer wraps it. |
| `assets/sustainability/*.jpeg\|.png` | Photos extracted from the docx: training session (Nov 2025), Mutrah trail clean-up (2 photos), Wakan → Jabal Akhdar hike, collected waste bags. |

## How to publish on miracleoman.travel

1. **WP Admin → Pages → Add New.** Title: *Sustainability*. Slug: `/sustainability/`.
2. **Upload the images.** Media Library → Add New → drag every file from
   `assets/sustainability/`. Copy each resulting URL — they'll look like
   `https://miracleoman.travel/wp-content/uploads/2026/07/training-2025.png`.
3. **Add a Custom HTML block** (Gutenberg) *or* an **HTML widget** (Elementor).
4. **Paste** the entire contents of `sustainability-wp-block.html` into it.
5. **Swap the image URLs** in the pasted HTML — search for
   `assets/sustainability/` and replace each src with the matching Media
   Library URL from step 2.
6. **Publish.** The theme header/footer/menu wrap the content automatically.
7. **Menu.** Appearance → Menus (or Elementor header) → add the new page
   under **About Us**.

## Sections included (in order)

1. **Hero** — page title with breadcrumb.
2. **Our Commitment** — Paris Agreement / 1.5 °C narrative.
3. **Mission Statement** — dark green card with SDG tags.
4. **Sustainability Team** — 4 team cards (initials avatars — swap for
   real photos once available).
5. **Message from Ecotourism Consultant** — Ruwan Jayasekara's letter,
   with a portrait slot.
6. **People** — commitments + 4 pillar cards.
7. **Sustainable Workplace Practices** — with 4 metric tiles including
   the 2027 −20% energy / water targets.
8. **Lead the Change — Training** — Nov 2025 session, with the training
   photo from the docx.
9. **Social Sustainability** — 6 pillar cards (11 nationalities etc.).
10. **Responsible Supply Chain + Accommodation Selection** — side by side.
11. **Local Communities** — Oman Women's Association + local suppliers.
12. **Our Initiatives** — 3 project cards (Ramadan 2026, Mutrah, Wakan
    → Jabal Akhdar) with photos from the docx.
13. **Policies & Guidelines** — 4 downloadable policy cards (`href="#"`
    for now — swap in real PDF links).
14. **Your Guide to Responsible Travel in Oman** — coming-soon CTA card
    for the guide Shaira is preparing.

## Design tokens

The page uses a warm Oman-inspired palette exposed as CSS variables
inside `.mo-sustain`:

```css
--mo-forest: #1F3A2E;   /* Jebel Akhdar deep green — primary */
--mo-terra:  #B45B3E;   /* Omani terracotta — accent */
--mo-gold:   #C89A4A;   /* Brass — highlights */
--mo-sand:   #F7F3EB;
--mo-cream:  #FBF7EF;
--mo-papyrus:#EDE3D0;
```

To match miracleoman.travel's exact brand tokens, edit those six lines
at the top of `<style id="mo-sustain-styles">`. Everything else will
retint automatically.

Typography: **Playfair Display** (headings) + **Inter** (body), loaded
from Google Fonts.

All CSS is scoped under `.mo-sustain` so it won't collide with the
theme's styles.

## Things to swap in before going live

- [ ] Real portrait photo of **Ruwan Jayasekara** (replace the placeholder
      landscape image in the "Message from Consultant" section).
- [ ] Real photo of the **Ramadan 2026 charity distribution** (replace
      the Unsplash placeholder in the first initiative card).
- [ ] Real headshots for team cards (replace the initials avatars).
- [ ] Real **hero image** — currently a licensed Unsplash desert photo.
      Swap for one of Miracle Oman's own hero shots.
- [ ] Real **PDF links** for the four policy documents.
- [ ] Real link for the **Responsible Travel Guide** once Shaira's
      document is finalised.
