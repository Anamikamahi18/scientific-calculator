# Manual Testing Checklist: Scientific Calculator Web App

## Basic Functionality
- [ ] Addition, subtraction, multiplication, division work correctly
- [ ] Decimal numbers are handled properly
- [ ] Parentheses affect order of operations as expected
- [ ] Clear (C) removes last entry
- [ ] All Clear (AC) resets calculator

## Advanced Functions
- [ ] sin, cos, tan return correct values
- [ ] arcsin, arccos, arctan return correct values
- [ ] log (base 10) and ln (natural log) work
- [ ] Square root (√), cube root (³√), and nth root work
- [ ] Exponents: x², x³, xʸ work
- [ ] Factorial (!) calculates correctly
- [ ] Percentage (%) works as expected

## Constants
- [ ] π and e insert correct values

## Memory Functions
- [ ] M+ adds displayed value to memory
- [ ] M- subtracts displayed value from memory
- [ ] MR recalls memory value
- [ ] MC clears memory

## Error Handling
- [ ] Division by zero shows error
- [ ] Invalid input (e.g., sqrt of negative) shows error
- [ ] Calculator recovers gracefully from errors

## Keyboard Support
- [ ] Numbers and operators can be entered via keyboard
- [ ] Enter/Return key triggers calculation
- [ ] Backspace removes last entry
- [ ] Delete triggers All Clear (AC)

## Display & History
- [ ] Current input and result are shown clearly
- [ ] Last operation/result is displayed (if implemented)

## Responsiveness
- [ ] Layout adapts to desktop, tablet, and mobile
- [ ] Buttons are touch-friendly on mobile (min 44x44 px)
- [ ] No horizontal scrolling on small screens

## Cross-Browser Compatibility
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Edge
- [ ] Works in Safari (if available)

## Accessibility
- [ ] Sufficient color contrast for text/buttons
- [ ] Buttons are accessible via keyboard (Tab navigation)
- [ ] Screen reader reads button labels and display

---

Check off each item as you test. Add notes for any issues found.