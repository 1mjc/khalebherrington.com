# Khaleb Herrington portfolio

Plain HTML, CSS and JS. No build step.

## Run it
Open `index.html` in a browser, or upload the whole folder to any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Add or change work
Everything lives in `js/works.js`. Copy a piece, change the fields, save.
1. Put photos in `images/` and set `image: 'images/your-photo.jpg'`.
   Pieces with `image: null` show a generated ink placeholder.
2. Update `SITE` at the top (email, Instagram, Manifold profile, booking note).
3. For a minted piece, add a `mint` block with `status` set to
   `'available'`, `'soon'` or `'sold'`, and paste the Manifold link into `url`.
   Available pieces get a "For sale on Manifold" badge, appear in the
   "Available to collect" section, and show up under the "For sale" filter.

All text in `works.js` is sample copy. Replace it with your own.

## Aqualine font
Put your licensed font file in `fonts/` as `Aqualine.woff2` (or .woff/.otf/.ttf). Until then the site uses a fallback serif. To convert an .otf/.ttf to woff2, use a free converter such as transfonter.org.

## Files
- `index.html` structure
- `css/style.css` look
- `js/works.js` your content
- `js/app.js` gallery, piece view, hero ink effect
