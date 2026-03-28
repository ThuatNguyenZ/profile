# Header Dynamic Styling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement dynamic text color for header that changes from white (at Home section) to dark gray (when scrolled) with smooth transitions.

**Architecture:** Add `isAtTop` state to track when user is at Home section (< 100px scroll). Use conditional Tailwind classes to apply `text-white` when at top, `text-gray-800` when scrolled. Add subtle border overlay for smooth visual transition.

**Tech Stack:** React, Framer Motion, Tailwind CSS

---

### Task 1: Update Header Component with Dynamic Text Colors

**Files:**
- Modify: `src/components/Header.jsx`

- [ ] **Step 1: Add `isAtTop` state**

Add new state variable alongside existing `isScrolled`:

```jsx
const [isAtTop, setIsAtTop] = useState(true)
```

Place on line 18, after `isMobileMenuOpen` state.

- [ ] **Step 2: Update scroll handler**

Modify the `useEffect` scroll handler (lines 20-26):

```jsx
useEffect(() => {
  const handleScroll = () => {
    setIsAtTop(window.scrollY < 100)
    setIsScrolled(window.scrollY > 50)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

- [ ] **Step 3: Add dynamic text color variable**

Add computed class after state declarations (line 27):

```jsx
const textColor = isAtTop ? 'text-white' : 'text-gray-800'
const borderColor = isAtTop ? 'border-white/10' : 'border-transparent'
```

- [ ] **Step 4: Update header element classes**

Modify the header className (lines 37-42):

```jsx
<motion.header
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
  } ${isAtTop ? 'border-b border-white/10' : ''}`}
>
```

- [ ] **Step 5: Update logo text color**

Change logo className (lines 46-52):

```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  className={`text-xl font-bold ${textColor} cursor-pointer`}
  onClick={() => scrollToSection('home')}
>
  NTT<span className="text-secondary">.</span>
</motion.div>
```

- [ ] **Step 6: Update nav items text color**

Modify nav button className (lines 56-62):

```jsx
<button
  key={item.id}
  onClick={() => scrollToSection(item.id)}
  className={`${textColor} hover:text-secondary transition-colors font-medium`}
>
  {item.label}
</button>
```

- [ ] **Step 7: Update mobile menu button color**

Change mobile button className (lines 72-77):

```jsx
<button
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className={`md:hidden p-2 ${textColor}`}
>
  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>
```

- [ ] **Step 8: Update mobile menu items color**

Modify mobile menu button className (lines 89-95):

```jsx
<button
  key={item.id}
  onClick={() => scrollToSection(item.id)}
  className={`text-left ${textColor} hover:text-secondary font-medium py-2`}
>
  {item.label}
</button>
```

- [ ] **Step 9: Commit**

```bash
git add src/components/Header.jsx
git commit -m "feat: add dynamic text color to header based on scroll position"
```

---

### Task 2: Update Social Links Component for Dynamic Colors

**Files:**
- Modify: `src/components/common/SocialLink.jsx` (if exists)
- Modify: `src/components/Header.jsx` (social links section)

- [ ] **Step 1: Check SocialLink component**

Read `src/components/common/SocialLink.jsx` to understand current implementation.

- [ ] **Step 2: Add color prop to SocialLink**

If SocialLink exists, add optional `color` prop:

```jsx
export default function SocialLink({ href, icon: Icon, label, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 ${color || 'text-inherit'} hover:text-secondary transition-colors`}
      aria-label={label}
    >
      <Icon size={20} />
    </a>
  )
}
```

- [ ] **Step 3: Update Header social links**

In `src/components/Header.jsx`, update social links (lines 66-70):

```jsx
<div className="hidden md:flex items-center gap-4">
  <SocialLink href="https://github.com/ThuatNguyenZ" icon={Github} label="" color={textColor} />
  <SocialLink href="https://linkedin.com/in/thuat-nguyen1306/" icon={Linkedin} label="" color={textColor} />
  <SocialLink href="mailto:thuatnguyen2k2info@gmail.com" icon={Mail} label="" color={textColor} />
</div>
```

- [ ] **Step 4: Update mobile menu social links**

Update mobile menu social links (lines 97-101):

```jsx
<div className="flex gap-4 pt-4 border-t">
  <SocialLink href="https://github.com/ThuatNguyenZ" icon={Github} label="GitHub" color={textColor} />
  <SocialLink href="https://linkedin.com/in/thuat-nguyen1306/" icon={Linkedin} label="LinkedIn" color={textColor} />
  <SocialLink href="mailto:thuatnguyen2k2info@gmail.com" icon={Mail} label="Email" color={textColor} />
</div>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/common/SocialLink.jsx src/components/Header.jsx
git commit -m "feat: add dynamic color support to social links"
```

---

### Task 3: Verify and Test

**Files:**
- None (testing only)

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: Server starts on http://localhost:5173 or 5174

- [ ] **Step 2: Visual verification at page top**

Open browser to localhost. Verify:
- Header text (logo, nav items, social icons) is WHITE
- Subtle white border visible at bottom of header
- Background is transparent (Hero background visible through header)

- [ ] **Step 3: Visual verification after scroll**

Scroll down past Home section. Verify:
- Header text changes to DARK GRAY (#1f2937 / gray-800)
- White background with blur appears
- Shadow is visible
- Border disappears

- [ ] **Step 4: Verify transition smoothness**

Scroll slowly up and down around the threshold. Verify:
- Color transition is smooth (0.3s duration)
- No flickering or jarring changes
- Hover effects work in both states

- [ ] **Step 5: Test mobile menu**

Resize browser to mobile width. Open mobile menu at top of page. Verify:
- Mobile menu text is WHITE
- Close menu, scroll down, reopen. Verify text is DARK GRAY
