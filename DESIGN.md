---
name: Melon Math
colors:
  surface: '#111509'
  surface-dim: '#111509'
  surface-bright: '#373b2d'
  surface-container-lowest: '#0c0f05'
  surface-container-low: '#191d11'
  surface-container: '#1d2115'
  surface-container-high: '#272c1f'
  surface-container-highest: '#323629'
  on-surface: '#e1e4d1'
  on-surface-variant: '#c3caae'
  inverse-surface: '#e1e4d1'
  inverse-on-surface: '#2e3225'
  outline: '#8d947b'
  outline-variant: '#434935'
  surface-tint: '#9ed900'
  primary: '#c2ff43'
  on-primary: '#243600'
  primary-container: '#a6e214'
  on-primary-container: '#456100'
  inverse-primary: '#4a6800'
  secondary: '#c5c6ca'
  on-secondary: '#2e3133'
  secondary-container: '#47494c'
  on-secondary-container: '#b7b8bc'
  tertiary: '#f5e7ff'
  on-tertiary: '#3c2656'
  tertiary-container: '#e1c4ff'
  on-tertiary-container: '#664e81'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b8f630'
  primary-fixed-dim: '#9ed900'
  on-primary-fixed: '#141f00'
  on-primary-fixed-variant: '#374e00'
  secondary-fixed: '#e1e2e6'
  secondary-fixed-dim: '#c5c6ca'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#45474a'
  tertiary-fixed: '#efdbff'
  tertiary-fixed-dim: '#d8bbf5'
  on-tertiary-fixed: '#260f3f'
  on-tertiary-fixed-variant: '#533c6e'
  background: '#111509'
  on-background: '#e1e4d1'
  surface-variant: '#323629'
typography:
  h1:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  gutter: 24px
  container-max-width: 1000px
---

## Brand & Style

This design system centers on hyper-focus, utility, and a rhythmic aesthetic inspired by modern minimalist typing tools. The personality is intellectual yet playful, stripping away all unnecessary chrome to prioritize the raw data and user performance.

The style is a blend of **Minimalism** and **Monospaced Utility**. It avoids all decorative flourishes, background artifacts, or watermarks. By utilizing a high-contrast primary accent against a deep, neutral field, the interface directs the eye exclusively toward active tasks. The experience should feel fast, lightweight, and mathematically precise.

## Colors

The palette is strictly functional. The **Melon Green** primary color is reserved for active states, successful inputs, and critical calls to action. 

- **Background**: A deep, flat gray (#212121) that eliminates eye strain.
- **Primary**: The vibrant "Melon Green" serves as the primary focal point.
- **Muted/Secondary**: Used for inactive elements, hints, and sub-labels to maintain a clear visual hierarchy.
- **Text**: Main body text should use a slightly off-white (#d1d0c5) to reduce the harshness of pure white on dark backgrounds, while the secondary text remains lower in contrast (#646669).

## Typography

The design system exclusively utilizes **JetBrains Mono** to reinforce the technical, mathematical nature of the product. The monospaced nature ensures that numerical data aligns perfectly in grids and lists.

- **Weight usage**: Use Bold (700) for primary headings and Regular (400) for all data entry and body content.
- **Alignment**: Given the monospaced constraints, typography should feel architectural. Use generous line heights for body text to ensure readability against the dark background.
- **Case**: Use uppercase sparingly for labels and category headers to create a sense of structure without needing bold lines or boxes.

## Layout & Spacing

This design system uses a **Fixed, Centered Grid** approach. Content is contained within a maximum width of 1000px to keep the user's focus narrow and centralized, mimicking the focused experience of a terminal or a minimalist typing test.

- **Rhythm**: All spacing is based on a 4px baseline.
- **Whitespace**: Be aggressive with whitespace. Elements should breathe; avoid crowding inputs or data visualizations.
- **Alignment**: Vertical alignment should be strictly maintained. Elements should feel like they are "snapped" to a grid.

## Elevation & Depth

To maintain the minimalist aesthetic, this system avoids traditional shadows and blurred glass effects. Depth is communicated through **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Base)**: The main #212121 background.
- **Level 1 (Surface)**: A slightly lighter #2c2c2c for cards or isolated sections.
- **Level 2 (Interaction)**: Rather than rising with shadows, interactive elements change color (Melon Green) or gain a thin 1px solid border in the primary color.
- **Focus**: Active states should feel "lit" by the primary color rather than physically elevated.

## Shapes

The shape language is defined by **Extreme Roundness (Pill-shaped)**. This creates a friendly, modern contrast against the rigid, monospaced typography.

- **Buttons & Toggles**: Must always be fully pill-shaped (border-radius: 9999px).
- **Inputs**: Rounded-xl (1.5rem) to maintain consistency with the pill-shaped theme.
- **Cards**: Use a more subtle rounded-lg (1rem) to frame larger content areas without looking overly "bubbly."

## Components

The components within this design system prioritize speed and clarity.

- **Buttons**: Use two variants. The "Primary" is a solid Melon Green pill with dark text. The "Ghost" variant is transparent with a Melon Green outline or text.
- **Inputs**: Text inputs should be minimalist. In an inactive state, they show only a bottom border or a subtle muted background. Upon focus, they transition to a full Melon Green border. No icons are used unless strictly necessary for functionality.
- **Toggles/Switches**: These must be pill-shaped. The "track" of the toggle should be the muted secondary color, and the "thumb" should be Melon Green when active.
- **Chips/Badges**: Small, pill-shaped containers with a background of #2c2c2c and text in #646669. When active, they flip to Melon Green.
- **Lists**: Tables and lists should have no vertical borders. Use thin, horizontal dividers in #2c2c2c to separate entries, ensuring data is easy to scan horizontally.
- **Math Displays**: Numerical output should be 20% larger than surrounding text to emphasize the core functionality of the product.