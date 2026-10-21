/* ==========================================================================
   Khaleb Herrington — content file
   This is the only file you need to edit to add or change pieces.
   Everything below is SAMPLE content. Replace it with your own.
   ========================================================================== */

const SITE = {
  email: 'hello@example.com',                      // TODO: your email
  instagram: 'https://instagram.com/yourhandle',   // TODO: your Instagram
  manifoldProfile: 'https://manifold.xyz/@yourname', // TODO: your Manifold profile
  booking: 'Books open for November. Send placement, size and a few references.'
};

/* --------------------------------------------------------------------------
   HOW TO ADD A PIECE
   Copy any object in WORKS, change the fields, save.

   id         unique, lowercase, no spaces (used in the page link, e.g. #moth-reliquary)
   kind       'tattoo' or 'art'
   title      name of the piece
   year       2026
   image      path to the main photo, e.g. 'images/moth.jpg'
              Leave as null to show a generated ink placeholder.
   alt        short description for screen readers
   ratio      height / width of the image (1.25 = portrait, 1 = square, 0.75 = landscape)
   details    list of [label, value] pairs shown under the title
   thoughts   list of paragraphs
   process    list of steps: { title, text, image }  (image is optional)
   mint       optional. Only for pieces minted on Manifold:
                status:  'available' | 'soon' | 'sold'
                url:     the Manifold link for that piece
                price:   '0.04 ETH'
                edition: '1 of 1'
                chain:   'Ethereum'
                when:    'November 3' (only used when status is 'soon')
   -------------------------------------------------------------------------- */

const WORKS = [
  {
    id: 'moth-reliquary',
    kind: 'tattoo',
    title: 'Moth reliquary',
    year: 2026,
    image: null,
    alt: 'A moth drawn in black ink with fine wing detail',
    ratio: 1.3,
    details: [['Placement', 'Inner forearm'], ['Size', '16 cm'], ['Time', 'One session, 4 hours']],
    thoughts: [
      'The brief was a moth that looked preserved, not alive. I treated the wings like pressed glass: dense black at the veins, almost nothing in the membrane between them.',
      'The hardest part was leaving space. Every instinct says to fill the wing, and the piece only works because I did not.'
    ],
    process: [
      { title: 'Sketch and reference', text: 'Pencil study built from specimen drawings, then redrawn until the wings were slightly too large for the body.', image: 'sample' },
      { title: 'Stencil', text: 'Linework only. I keep the stencil sparse so the shading is decided on skin, not on paper.' },
      { title: 'Linework', text: 'Single needle for the veins and the antennae. Slow, one continuous pull where possible.' },
      { title: 'Shading', text: 'Blotted black into the body and the wing edges, then fading outward with diluted passes.' }
    ]
  },
  {
    id: 'salt-circle',
    kind: 'tattoo',
    title: 'Salt circle',
    year: 2026,
    image: null,
    alt: 'A ring of fine geometric marks centred on an upper back',
    ratio: 1.0,
    details: [['Placement', 'Upper back'], ['Size', '24 cm'], ['Time', 'Two sessions, 9 hours']],
    thoughts: [
      'A protective circle is mostly arithmetic. The whole thing depends on the spacing of the tick marks being exact, because the eye notices an error before it can name it.',
      'The centre stays empty. The client wanted somewhere for the piece to keep growing.'
    ],
    process: [
      { title: 'Measure', text: 'Compass and ruler on tracing paper, then checked against the client standing and sitting.' },
      { title: 'Linework', text: 'Outer rings first, then the ticks from the cardinal points inward so errors cancel out.' }
    ]
  },
  {
    id: 'the-drowned-hour',
    kind: 'tattoo',
    title: 'The drowned hour',
    year: 2025,
    image: null,
    alt: 'An hourglass dissolving into pooled black ink',
    ratio: 1.4,
    details: [['Placement', 'Calf'], ['Size', '30 cm'], ['Time', 'Two sessions, 8 hours']],
    thoughts: [
      'Time as something that pools instead of falling. The upper chamber holds hard lines. The lower one is only blot.',
      'I let the ink bleed past the glass on purpose. A clean edge would have made it a diagram.'
    ],
    process: [
      { title: 'Composition', text: 'Drew the hourglass straight so it would sit on the muscle, then bent it to the leg in the stencil.' },
      { title: 'Blotting', text: 'Black built up in the lower chamber with a loose, wet-looking pass, then crisped at the rim.' }
    ]
  },
  {
    id: 'hollow-saint',
    kind: 'tattoo',
    title: 'Hollow saint',
    year: 2025,
    image: null,
    alt: 'A robed figure with an empty face, shaded in deep black',
    ratio: 1.25,
    details: [['Placement', 'Outer thigh'], ['Size', '28 cm'], ['Time', 'Three sessions, 13 hours']],
    thoughts: [
      'A figure defined by what is missing. The face is left as skin and the robes carry all the weight.',
      'This one took the longest to shade. Seven distinct values, and the lightest has to survive healing.'
    ],
    process: [
      { title: 'Value map', text: 'A small grayscale study to lock the seven values before touching the stencil.' },
      { title: 'Folds', text: 'Linework for the drapery, then the deepest shadows packed in first.' },
      { title: 'Soft passes', text: 'Mid-tones and the faint halo built last, with a diluted black.' }
    ]
  },
  {
    id: 'nine-veils',
    kind: 'tattoo',
    title: 'Nine veils',
    year: 2024,
    image: null,
    alt: 'Layered translucent veils across a shoulder in fine linework',
    ratio: 1.15,
    details: [['Placement', 'Shoulder and chest'], ['Size', '35 cm'], ['Time', 'Four sessions, 17 hours']],
    thoughts: [
      'Nine layers, each one slightly more transparent than the last. The idea was that you only ever see the piece through itself.',
      'It is the most technical thing I have done and I would still change the fourth veil.'
    ],
    process: [
      { title: 'Layer planning', text: 'Each veil drawn on its own overlay so the overlaps could be solved separately.' },
      { title: 'Build', text: 'Outermost first. Hairline strokes, one value lighter per layer.' }
    ]
  },
  {
    id: 'tide-before-name',
    kind: 'art',
    title: 'Tide before name',
    year: 2026,
    image: null,
    alt: 'A large pooled blot of black ink with fine concentric lines around it',
    ratio: 1.25,
    details: [['Medium', 'Ink on paper, scanned'], ['Size', '40 by 50 cm'], ['Year', '2026']],
    thoughts: [
      'Made from a single drop of ink that I pushed around with breath and a dry brush. The linework came afterwards, a way of putting a measuring tool next to something that refuses to be measured.',
      'It sits close to the beginning of what I think of as my own language.'
    ],
    process: [
      { title: 'The drop', text: 'One pool of ink on wet paper, tilted and blown until it stopped moving.', image: 'sample' },
      { title: 'Linework', text: 'Fine technical pen over the dried blot. Circles first, then the ticks.' },
      { title: 'Scan and mint', text: 'Scanned at high resolution and minted as a single edition on Manifold.' }
    ],
    mint: {
      status: 'available',
      url: 'https://manifold.xyz/@yourname', // TODO: link to this specific mint
      price: '0.04 ETH',
      edition: '1 of 1',
      chain: 'Ethereum'
    }
  },
  {
    id: 'black-sun-study',
    kind: 'art',
    title: 'Black sun study',
    year: 2025,
    image: null,
    alt: 'A black disc with a thin crescent cut from it, surrounded by stippling',
    ratio: 1.0,
    details: [['Medium', 'Ink and stipple on paper'], ['Size', '30 by 30 cm'], ['Year', '2025']],
    thoughts: [
      'Eleven hours of stippling to get a gradient that looks like smoke from across the room and like dust up close.',
      'The sun is black because I wanted it to give off weight instead of light.'
    ],
    process: [
      { title: 'Disc', text: 'Solid black laid first, then the crescent lifted out with a blade.' },
      { title: 'Stipple', text: 'Dots at three sizes, denser toward the edge of the disc.' }
    ],
    mint: {
      status: 'sold',
      url: 'https://manifold.xyz/@yourname',
      price: '0.03 ETH',
      edition: '1 of 1',
      chain: 'Ethereum'
    }
  },
  {
    id: 'witness',
    kind: 'art',
    title: 'Witness',
    year: 2026,
    image: null,
    alt: 'A pair of overlapping circles forming an eye, drawn in ink with delicate shading',
    ratio: 0.8,
    details: [['Medium', 'Ink on paper, scanned'], ['Size', '50 by 40 cm'], ['Year', '2026']],
    thoughts: [
      'An eye built from two overlapping circles. The overlap is the pupil, and I kept it blotted rather than drawn.',
      'This is the first piece I am releasing as an open edition.'
    ],
    process: [
      { title: 'Geometry', text: 'Two circles, measured, then the lens between them traced in pencil.' },
      { title: 'Ink', text: 'Blotted pupil, hairline lashes, a soft shadow under the lid.' }
    ],
    mint: {
      status: 'soon',
      url: '',
      price: '0.02 ETH',
      edition: 'Open edition',
      chain: 'Ethereum',
      when: 'November 3'
    }
  },
  {
    id: 'ash-liturgy',
    kind: 'art',
    title: 'Ash liturgy',
    year: 2024,
    image: null,
    alt: 'Vertical drips of black ink with a measured scale along the left edge',
    ratio: 1.35,
    details: [['Medium', 'Ink on paper'], ['Size', '35 by 48 cm'], ['Year', '2024']],
    thoughts: [
      'Drips held in a column, like a hymn board. I added the ruler marks afterwards to make it feel like a record of something that happened.',
      'Not for sale. This one stays with me.'
    ],
    process: [
      { title: 'Pour', text: 'Ink dropped at the top edge and allowed to run on a nearly vertical sheet.' },
      { title: 'Scale', text: 'Measured tick marks along the left edge, ruled by hand.' }
    ]
  }
];
