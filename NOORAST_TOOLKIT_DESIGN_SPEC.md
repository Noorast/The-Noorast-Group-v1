# Noorast Property Passport Toolkit — Design Specification

## Brand Overview
Minimalist, research-led architectural design consultancy with a calm, authoritative, academic aesthetic. Inspired by professional design studios.

---

## Colour Palette

### Primary Colours
```css
--color-background: #FAFAF8      /* Off-white background */
--color-charcoal: #2C2C2C        /* Primary text, headers */
--color-stone: #8B8680           /* Secondary text, muted elements */
--color-stone-light: #D4CFC9     /* Borders, dividers, subtle backgrounds */
```

### Accent & Interactive
```css
--color-accent: #5A5550          /* Subtle accent for hover states */
--color-focus: #2C2C2C           /* Focus rings, active states */
```

### Tailwind Class Mapping
- Background: `bg-[#FAFAF8]`
- Charcoal text: `text-[#2C2C2C]`
- Stone text: `text-[#8B8680]`
- Stone light borders: `border-[#D4CFC9]`

---

## Typography

### Font Family
**Inter** — used throughout entire site (except logo)

### Hierarchy

#### Page Titles
```tsx
<h1 className="text-[#2C2C2C] font-[500] tracking-tight">
  Property Passport
</h1>
```

#### Section Headings
```tsx
<h2 className="text-[#2C2C2C] font-[500] tracking-tight">
  Section Name
</h2>
```

#### Body Text
```tsx
<p className="text-[#2C2C2C] leading-relaxed">
  Standard paragraph text
</p>
```

#### Labels & Small Text
```tsx
<label className="text-[#8B8680] leading-relaxed">
  Form label or caption
</label>
```

### Key Principles
- **Do NOT use** Tailwind font size classes (`text-2xl`, `text-lg`, etc.)
- **Do NOT use** Tailwind font weight classes (`font-bold`, `font-semibold`, etc.)
- **Only use** `font-[500]` for headings or as specified
- **Always use** `tracking-tight` for headings
- **Always use** `leading-relaxed` for body text

---

## Spacing & Layout

### White Space Philosophy
Generous, intentional spacing that allows content to breathe

### Grid System
- Use CSS Grid for structured layouts
- Prefer symmetrical, aligned compositions
- Maintain consistent gutters

### Spacing Scale (Tailwind)
```
p-4, p-6, p-8, p-12     /* Padding */
gap-4, gap-6, gap-8     /* Grid/flex gaps */
mb-4, mb-6, mb-8, mb-12 /* Vertical rhythm */
```

---

## UI Components

### Input Fields
```tsx
<input
  type="text"
  className="w-full px-4 py-3 bg-white border border-[#D4CFC9] text-[#2C2C2C]
             placeholder:text-[#8B8680] leading-relaxed
             focus:outline-none focus:ring-2 focus:ring-[#2C2C2C] focus:border-transparent
             transition-all"
  placeholder="Enter information"
/>
```

### Textarea
```tsx
<textarea
  className="w-full px-4 py-3 bg-white border border-[#D4CFC9] text-[#2C2C2C]
             placeholder:text-[#8B8680] leading-relaxed resize-none
             focus:outline-none focus:ring-2 focus:ring-[#2C2C2C] focus:border-transparent
             transition-all"
  rows={4}
  placeholder="Enter details"
/>
```

### Select Dropdown
```tsx
<select
  className="w-full px-4 py-3 bg-white border border-[#D4CFC9] text-[#2C2C2C]
             leading-relaxed
             focus:outline-none focus:ring-2 focus:ring-[#2C2C2C] focus:border-transparent
             transition-all appearance-none"
>
  <option value="">Select an option</option>
</select>
```

### Primary Button
```tsx
<button
  className="px-8 py-3 bg-[#2C2C2C] text-[#FAFAF8] leading-relaxed
             hover:bg-[#5A5550] transition-all
             focus:outline-none focus:ring-2 focus:ring-[#2C2C2C] focus:ring-offset-2"
>
  Save Section
</button>
```

### Secondary/Outline Button
```tsx
<button
  className="px-8 py-3 bg-transparent border border-[#2C2C2C] text-[#2C2C2C] leading-relaxed
             hover:bg-[#2C2C2C] hover:text-[#FAFAF8] transition-all
             focus:outline-none focus:ring-2 focus:ring-[#2C2C2C] focus:ring-offset-2"
>
  Download PDF
</button>
```

### Card/Section Container
```tsx
<div className="bg-white border border-[#D4CFC9] p-8">
  {/* Content */}
</div>
```

---

## Layout Patterns

### Page Container
```tsx
<div className="min-h-screen bg-[#FAFAF8]">
  <div className="max-w-7xl mx-auto px-6 py-12">
    {/* Page content */}
  </div>
</div>
```

### Two-Column Form Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block mb-2 text-[#8B8680] leading-relaxed">
      Field Label
    </label>
    <input className="..." />
  </div>
  <div>
    <label className="block mb-2 text-[#8B8680] leading-relaxed">
      Field Label
    </label>
    <input className="..." />
  </div>
</div>
```

### Section Header Pattern
```tsx
<div className="mb-8">
  <h2 className="text-[#2C2C2C] font-[500] tracking-tight mb-2">
    Section Title
  </h2>
  <p className="text-[#8B8680] leading-relaxed">
    Brief description of this section
  </p>
</div>
```

---

## Interactive States

### Hover States
- Buttons: Background darkens to `#5A5550` or inverts
- Links: Underline appears or colour shifts to `#5A5550`
- Cards: Subtle shadow or border colour change

### Focus States
- Always include `focus:outline-none focus:ring-2 focus:ring-[#2C2C2C]`
- Ring offset for buttons: `focus:ring-offset-2`

### Transitions
- Use `transition-all` for smooth state changes
- Keep animations subtle and professional

---

## Icons & Graphics

### Icon Style
- Use Lucide React icons
- Colour: `text-[#8B8680]` for inactive, `text-[#2C2C2C]` for active
- Size: `w-5 h-5` or `w-6 h-6` depending on context

### Example
```tsx
import { Home, FileText, Download } from 'lucide-react'

<Home className="w-5 h-5 text-[#8B8680]" />
```

---

## British English

Always use British spellings:
- Colour (not color)
- Authorise (not authorize)
- Analyse (not analyze)
- Centre (not center)
- Programme (not program, unless referring to code)

---

## Example: Complete Form Section

```tsx
<div className="bg-white border border-[#D4CFC9] p-8 mb-6">
  <div className="mb-8">
    <h2 className="text-[#2C2C2C] font-[500] tracking-tight mb-2">
      Property Details
    </h2>
    <p className="text-[#8B8680] leading-relaxed">
      Basic information about your property
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div>
      <label className="block mb-2 text-[#8B8680] leading-relaxed">
        Property Address
      </label>
      <input
        type="text"
        className="w-full px-4 py-3 bg-white border border-[#D4CFC9] text-[#2C2C2C]
                   placeholder:text-[#8B8680] leading-relaxed
                   focus:outline-none focus:ring-2 focus:ring-[#2C2C2C] focus:border-transparent
                   transition-all"
        placeholder="123 Example Street"
      />
    </div>

    <div>
      <label className="block mb-2 text-[#8B8680] leading-relaxed">
        Property Type
      </label>
      <select
        className="w-full px-4 py-3 bg-white border border-[#D4CFC9] text-[#2C2C2C]
                   leading-relaxed
                   focus:outline-none focus:ring-2 focus:ring-[#2C2C2C] focus:border-transparent
                   transition-all appearance-none"
      >
        <option value="">Select type</option>
        <option value="detached">Detached House</option>
        <option value="semi">Semi-Detached House</option>
        <option value="terraced">Terraced House</option>
      </select>
    </div>
  </div>

  <div className="mb-6">
    <label className="block mb-2 text-[#8B8680] leading-relaxed">
      Additional Notes
    </label>
    <textarea
      className="w-full px-4 py-3 bg-white border border-[#D4CFC9] text-[#2C2C2C]
                 placeholder:text-[#8B8680] leading-relaxed resize-none
                 focus:outline-none focus:ring-2 focus:ring-[#2C2C2C] focus:border-transparent
                 transition-all"
      rows={4}
      placeholder="Enter any additional details"
    />
  </div>

  <div className="flex gap-4">
    <button
      className="px-8 py-3 bg-[#2C2C2C] text-[#FAFAF8] leading-relaxed
                 hover:bg-[#5A5550] transition-all
                 focus:outline-none focus:ring-2 focus:ring-[#2C2C2C] focus:ring-offset-2"
    >
      Save Section
    </button>
    <button
      className="px-8 py-3 bg-transparent border border-[#2C2C2C] text-[#2C2C2C] leading-relaxed
                 hover:bg-[#2C2C2C] hover:text-[#FAFAF8] transition-all
                 focus:outline-none focus:ring-2 focus:ring-[#2C2C2C] focus:ring-offset-2"
    >
      Reset
    </button>
  </div>
</div>
```

---

## Design Principles Summary

1. **Restraint over decoration** — Avoid unnecessary embellishments
2. **Generous white space** — Let content breathe
3. **Precise alignment** — Use grids and consistent spacing
4. **Subtle interactions** — Transitions should be smooth, not flashy
5. **Academic tone** — Research-led, authoritative, not commercial
6. **Accessibility** — Proper focus states, semantic HTML, sufficient contrast
7. **Consistency** — Follow established patterns throughout

---

## Notes for Implementation

- The Property Passport toolkit should feel like a natural extension of the main Noorast website
- Maintain the same level of polish and attention to detail
- All forms should be clean, organised, and easy to navigate
- PDF exports should use the same colour palette and typography
- Consider progressive disclosure for complex forms (show/hide sections as needed)

---

**Last Updated:** March 2026
**Brand:** Noorast — Pre-Architecture Design Intelligence
