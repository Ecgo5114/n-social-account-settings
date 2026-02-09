# New Theme Heuristic Evaluation Report

**Product:** Nitra - Social Accounts Management  
**Scope:** New Theme (layoutStyle = 'new')  
**Evaluation Date:** February 2026  
**Method:** Virtual Expert (Static Code Analysis)

---

## Executive Summary

The New theme presents a card-based, modern layout with improved visual hierarchy and cleaner structure compared to the Current theme. Overall usability is strong with consistent feedback mechanisms, clear navigation, and accessible controls. Key improvement areas include the search label language, touch target sizes, and keyboard operability.

---

## Task Flow Evaluated

| Step | Task | Scope |
|------|------|-------|
| 1 | View sidebar & navigation | New theme layout |
| 2 | Browse social accounts table | Card-based layout |
| 3 | Add account flow | Modal, loading, toast |
| 4 | Disconnect account | Confirmation modal |
| 5 | Reconnect expired account | Button, feedback |
| 6 | Toggle Primary (Instagram) | Action menu, tooltip |

---

## Findings by Heuristic

### 1. Visibility of System Status ✅

**Positive:**
- Connection loading overlay shows platform-specific state during add account
- Toast feedback for success/error (add, disconnect, reconnect)
- Highlighted account row (3s) after adding with scrollIntoView
- Reconnect button shows "Reconnecting..." with spinner
- Social Accounts nav item has active state

**Issues:**
- Search input provides no feedback on input or results (same as Current)

---

### 2. Match Between System and Real World ✅

**Positive:**
- Plain language: "Connected", "Expired", "Primary"
- Familiar platform icons (Twitter, Instagram, LinkedIn)
- "Jump to" and platform names are user-friendly

**Issues:**
- Search label `sr-only` uses "搜尋帳號" (Chinese) — inconsistent with English UI

---

### 3. User Control and Freedom ✅

**Positive:**
- All modals close on overlay click
- Cancel/Close buttons present
- Disconnect requires confirmation

---

### 4. Consistency and Standards ✅

**Positive:**
- Button styles unified (px-4 py-2 rounded-lg)
- Primary color #1A929F consistent
- GroupHeader and AccountRow use same red for expired/error state
- Check/X icons for Connected/Expired (not color-only)

**Issues:**
- Reconnect button: New theme uses solid red `bg-red-600`, Current uses outlined — intentional design difference but worth noting

---

### 5. Error Prevention ✅

**Positive:**
- Platform max limit shows "Maximum reached" and disables
- Disconnect confirmation prevents accidental removal

---

### 6. Recognition Rather Than Recall ✅

**Positive:**
- Nav tooltips when sidebar collapsed
- Platform icons recognizable
- Primary tag with tooltip
- Jump to platform buttons with tooltips

---

### 7. Flexibility and Efficiency ✅

**Positive:**
- Platform groups expand/collapse
- Jump to quick navigation (expansion preview)
- Action menu with View on platform, Set Primary, Reconnect, Disconnect

**Issues:**
- No keyboard shortcuts for power users

---

### 8. Aesthetic and Minimalist Design ✅

**Positive:**
- Clean card layout (bg-gray-100/50 rounded groups)
- White content card on #F5F7FA background
- Clear hierarchy: table header → platform groups → account rows
- No dashed tree lines (simpler than Current)
- Account rows: white bg, teal hover (#85bac01a)

---

### 9. Help Users Recognize, Diagnose, and Recover from Errors ✅

**Positive:**
- Error toasts with specific messages
- Expired banner with CTA
- Disconnect modal explains impact (What will change, Data Preservation)

---

### 10. Help and Documentation ✅

**Positive:**
- Primary tooltip
- Set as Primary tooltip
- Disconnect modal contextual content

---

### 11. Offer Informative Feedback ✅

**Positive:**
- Toast for all key actions
- Loading states (add account, reconnect)
- Highlight animation for new account

---

### 12. Design Dialogs to Yield Closure ✅

**Positive:**
- Add account: clear start → loading → completion
- Disconnect: confirmation → outcome
- Error flow: platform → error type → toast

---

### 13. Seek Universal Usability

**Positive:**
- `html lang="en"`
- sr-only label for search (language fix needed)
- aria-labels in English
- Check/X icons support users who cannot distinguish color alone

**Issues:**
- **Touch targets:** Action menu trigger (~36×36px), platform jump buttons (36×36px) — below 44×44px minimum
- **Keyboard:** No explicit focus-visible enhancement; Tab/Enter/Esc flow should be verified

---

## WCAG Quick Check

| Check | Status |
|-------|--------|
| Alt text on images | ✅ Logo has alt |
| Color contrast | ✅ Gray text on white/light bg |
| Color not sole indicator | ✅ Check/X icons added |
| Labels on inputs | ⚠️ Search label in Chinese |
| Touch targets | ⚠️ Some < 44px |
| Focus visible | ⚠️ Default browser focus |

---

## Severity Summary

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 2 |
| Low | 3 |

---

## Recommendations (Prioritized)

### P2 – Medium

1. **Search label language**  
   - Issue: `sr-only` label "搜尋帳號" is Chinese  
   - Recommendation: Change to "Search accounts"

2. **Touch target size**  
   - Issue: Action menu, platform buttons ~36×36px  
   - Recommendation: Increase to min 44×44px (padding or min dimensions)

### P3 – Low

3. **Keyboard operability**  
   - Recommendation: Verify Tab/Enter/Esc flow for modals and menus

4. **Focus visible**  
   - Recommendation: Add focus-visible ring for interactive elements

5. **Reconnect button consistency**  
   - Note: Solid vs outlined is a design choice; document for consistency

---

## New Theme–Specific Observations

**Improvements over Current theme:**
- Card-based layout reduces visual clutter
- Transparent sidebar integrates better with background
- Collapse button inside sidebar (no floating control)
- Teal-tinted avatar and hover states reinforce brand
- No dashed tree lines — cleaner look

**Considerations:**
- Same modals and flows as Current — shared improvements apply
- LayoutStyleToggle and Demo scenarios are dev tools — hide in production

---

## Conclusion

The New theme meets most usability heuristics with clear structure, feedback, and accessibility support. Addressing the search label language and touch target sizes would resolve the remaining medium-severity issues.
