# Accessibility Component Notes

## What I built by hand

I created three React + TypeScript components:

- Modal dialog
- Tabs
- Disclosure

I implemented their keyboard interactions and ARIA attributes based on the WAI-ARIA Authoring Practices patterns.

## Comparison with shadcn/ui

### 1. Focus management

My modal manually manages focus using `useRef`, `useEffect`, and keyboard handling. A production component such as shadcn's Dialog provides more robust focus management through its underlying primitives.

### 2. Keyboard interaction

My Tabs component implements ArrowLeft, ArrowRight, Home, and End navigation manually. A mature component library handles more keyboard and accessibility edge cases for the widget.

### 3. Additional behavior

My hand-written components are intentionally simple. shadcn's generated components include more complete supporting behavior and structure, making them more suitable as reusable production components.

## What I learned

Building the components myself helped me understand that accessibility is more than adding ARIA attributes. Focus management, keyboard navigation, focus restoration, and correct relationships between interactive elements and their content are all important.