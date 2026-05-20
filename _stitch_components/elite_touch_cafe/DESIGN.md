---
name: Elite Touch Cafe
colors:
  surface: '#fbf8ff'
  surface-dim: '#dbd9e1'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2fb'
  surface-container: '#efecf5'
  surface-container-high: '#eae7ef'
  surface-container-highest: '#e4e1ea'
  on-surface: '#1b1b21'
  on-surface-variant: '#454652'
  inverse-surface: '#303036'
  inverse-on-surface: '#f2eff8'
  outline: '#767683'
  outline-variant: '#c6c5d4'
  surface-tint: '#4c56af'
  primary: '#000666'
  on-primary: '#ffffff'
  primary-container: '#1a237e'
  on-primary-container: '#8690ee'
  inverse-primary: '#bdc2ff'
  secondary: '#4c5a9d'
  on-secondary: '#ffffff'
  secondary-container: '#a7b5fe'
  on-secondary-container: '#364486'
  tertiary: '#380b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#5c1800'
  on-tertiary-container: '#e17c5a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bdc2ff'
  on-primary-fixed: '#000767'
  on-primary-fixed-variant: '#343d96'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b9c3ff'
  on-secondary-fixed: '#001257'
  on-secondary-fixed-variant: '#344283'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59d'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#7b2e12'
  background: '#fbf8ff'
  on-background: '#1b1b21'
  surface-variant: '#e4e1ea'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 36px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  xxl: 80px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style
The design system embodies a premium, "Quiet Luxury" aesthetic tailored for an upscale culinary experience. It balances traditional elegance with modern lightness, targeting a discerning audience that appreciates refinement and intentionality.

The visual style is **Minimalist with an Editorial touch**. It prioritizes breathability and a sense of "air," using white space as a structural element rather than a void. The interface should feel like a high-end physical menu or a boutique magazine: tactile yet digital, grounded yet weightless. Key characteristics include razor-thin lines, sophisticated serif headings, and a restraint in the use of saturated color.

## Colors
The palette is rooted in a "Navy & Snow" philosophy. 
- **Primary & Secondary:** These deep navies are reserved for high-impact moments: typography, primary buttons, and the brand monogram. They provide the necessary "weight" to anchor the airy layout.
- **Accent:** The lavender tint (#e8eaf6) serves as a soft bridge between the stark white and the deep navy. It should be used for subtle backgrounds, hover states, or to differentiate secondary information sections.
- **Backgrounds:** Pure white (#ffffff) is the default canvas to maintain an "airy" feel. The off-white (#f5f5f7) is utilized for section staggering and grouping elements without introducing heavy borders.

## Typography
The typographic pairing is a dialogue between heritage and clarity. 
- **Display & Headlines:** Use *EB Garamond* (selected as the closest match to Cormorant Garamond from the available set). It should be set with tight tracking for a sophisticated, editorial look.
- **Body & UI:** *DM Sans* provides a clean, neutral counterpoint. Its low-contrast, geometric forms ensure legibility at small sizes and maintain the "lightweight" feel.
- **Hierarchy:** Use the uppercase `label-sm` for categories (e.g., "APPETIZERS," "RESERVATIONS") to create a structured, professional rhythm.

## Layout & Spacing
The layout follows a **Fixed Grid** approach on desktop (max-width 1280px) to ensure the editorial compositions remain controlled and balanced. 

- **Generous Margins:** Desktop layouts should utilize 64px external margins to push content inward, creating a "frame" effect.
- **Vertical Rhythm:** Use large `xxl` (80px) spacing between distinct sections to emphasize the "airy" quality.
- **Responsive reflow:** On mobile, margins reduce to 20px, and grid columns collapse from 12 to 4. Elements should transition from side-by-side to stacked, maintaining the vertical white space.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layers** and **Subtle Blurs** rather than heavy shadows.

- **Flat Foundation:** Most cards and surfaces sit flat on the `background-secondary` with a 0.5px border in `accent_color_hex`.
- **Hover States:** Instead of a traditional drop shadow, use a "subtle lift"—a very soft, 15% opacity navy shadow with a large blur (20px) and a slight -2px Y-offset.
- **Overlays:** For modals or mobile menus, use a high-density backdrop blur (20px) with a semi-transparent white tint to maintain the "airy" and "lightweight" feel.

## Shapes
The shape language is controlled and precise. A 0.5rem (8px) base radius is applied to buttons, cards, and input fields. This provides enough softness to feel approachable while maintaining the structural integrity of a premium brand.

The circular badge logo remains the only perfectly round element, acting as a distinct brand signature against the structured rectangular layout of the UI.

## Components
- **Buttons:** Primary buttons are solid `primary_color_hex` with white text. Secondary buttons use a `0.5px` navy border with a transparent background. All buttons have a high-padding (12px top/bottom, 32px left/right) to feel expansive.
- **Input Fields:** Use a 1px bottom border only for a "minimalist" look, or a full 0.5px border in `accent_color_hex`. Labels should always be in the `label-sm` style.
- **Cards:** White background, 0.5px border in `#e8eaf6`, and 8px corner radius. No shadow unless in a hover state.
- **Chips/Tags:** Small, pill-shaped elements using the Lavender Accent background and Navy text for dietary labels or categories.
- **Lists:** Menu items should be styled with a "dotted leader" (price alignment) to mimic classic fine-dining menus.
- **Monogram Badge:** The 'Et' script monogram should be used sparingly as a watermark or a footer seal to reinforce the elite branding.