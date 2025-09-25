# Manual Testing Checklist: Scientific Calculator Web App

## Basic Functionality
- [ ] Addition, subtraction, multiplication, division work correctly
- [ ] Decimal numbers are handled properly
- [ ] Parentheses affect order of operations as expected
- [ ] Clear (C) removes last entry
- [ ] All Clear (AC) resets calculator

## Advanced Functions
- [ ] sin, cos, tan return correct values (in both DEG and RAD modes)
- [ ] sin⁻¹, cos⁻¹, tan⁻¹ return correct values (in both DEG and RAD modes)
- [ ] log (base 10) and ln (natural log) work
- [ ] Square root (√), cube root (³√), and nth root via x^(1/n) work
- [ ] Exponents: x², x³, xʸ, and superscript input work
- [ ] Factorial (!) calculates correctly
- [ ] Percentage (%) works as expected
- [ ] EXP button inserts E and evaluates scientific notation (e.g., 5E3 = 5000)

## Constants
- [ ] π and e insert correct values

## Memory Functions
- [ ] M+ adds displayed value to memory (after evaluation and mid-expression)
- [ ] M- subtracts displayed value from memory
- [ ] MR recalls memory value (replaces display, does not append)
- [ ] MC clears memory (MR after MC shows 0)
- [ ] Large numbers and edge cases (e.g., M+ after MC, M- with negative numbers)

## Ans & History
- [ ] Ans recalls last result after evaluation
- [ ] Ans can be chained (AnsAns = Ans × Ans)
- [ ] Ans after operator (e.g., + Ans) works
- [ ] History shows last operation/result correctly

## DEG/RAD Mode
- [ ] DEG/RAD radio buttons toggle mode
- [ ] Trig and inverse trig functions respect current mode
- [ ] Mode can be changed before and after calculations

## Error Handling
- [ ] Division by zero shows error
- [ ] Invalid input (e.g., sqrt of negative) shows error
- [ ] Calculator recovers gracefully from errors

## Keyboard Support
- [ ] Numbers and operators can be entered via keyboard
- [ ] ^ key for exponentiation
- [ ] Enter/Return and = key trigger calculation
- [ ] Backspace removes last entry
- [ ] Delete triggers All Clear (AC)
- [ ] Keyboard navigation for buttons and radio toggles

## Display & History
- [ ] Current input and result are shown clearly
- [ ] Last operation/result is displayed (history)
- [ ] Superscript exponents display correctly

## Responsiveness & Layout
- [ ] Layout adapts to desktop, tablet, and mobile
- [ ] Buttons are touch-friendly on mobile (min 44x44 px)
- [ ] No horizontal scrolling on small screens
- [ ] Vertical scroll appears on short screens (≤560px) and in landscape mode on phones
- [ ] Calculator fits screen on tall displays

## Power Button
- [ ] ON/OFF disables/enables calculator functionality
- [ ] Display is blank when OFF, restores when ON

## Cross-Browser Compatibility
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Edge
- [ ] Works in Safari (if available)

## Accessibility
- [ ] Sufficient color contrast for text/buttons
- [ ] Buttons and radios are accessible via keyboard (Tab navigation)
- [ ] Screen reader reads button labels and display
- [ ] High contrast mode (if available)

---

Check off each item as you test. Add notes for any issues found.