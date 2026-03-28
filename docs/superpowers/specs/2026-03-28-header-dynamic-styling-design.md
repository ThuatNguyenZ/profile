---
name: Header Dynamic Styling
description: Dynamic text color for header based on scroll position with smooth transitions
type: spec
---

# Header Dynamic Styling Design

## Problem

Khi user mới load trang và ở vị trí Home section (nền tối), header có `bg-transparent` khiến text màu `text-primary` (xanh đen) không phân biệt được với background.

## Solution

Dynamic text color dựa trên scroll position - text sẽ đổi màu mượt mà khi user scroll từ Home section (nền tối) sang các section khác (nền sáng).

## Design Specifications

### State Management

Thêm state `isAtTop` bên cạnh `isScrolled`:
- `isAtTop`: `scrollY < 100` - đang ở Home section
- `isScrolled`: `scrollY > 50` - đã scroll xuống

### Styling States

| State | Background | Text Color | Border | Shadow |
|-------|------------|------------|--------|--------|
| **At top** | `transparent` | `text-white` | `border-b border-white/10` | none |
| **Scrolled** | `bg-white/95 backdrop-blur-sm` | `text-gray-800` | none | `shadow-lg` |

### Transition Effects

- Tất cả text elements: `transition-colors duration-300`
- Background: `transition-all duration-300` (đã có)
- Border: `transition-all duration-300`

### Components Affected

1. **Logo (`NTT`)**: dynamic color (`text-white` → `text-gray-800`)
2. **Nav items**: dynamic color + `hover:text-secondary`
3. **Social icons**: dynamic color
4. **Mobile menu button**: dynamic color
5. **Mobile menu items**: dynamic color

### Implementation Details

```jsx
// Scroll handler
const handleScroll = () => {
  setIsAtTop(window.scrollY < 100)
  setIsScrolled(window.scrollY > 50)
}

// Conditional classes
textColor: isAtTop ? 'text-white' : 'text-gray-800'
borderClass: isAtTop ? 'border-b border-white/10' : ''
```

## Success Criteria

- [ ] Header text đọc rõ khi ở Home section (trên nền tối)
- [ ] Transition mượt mà khi scroll (không giật cục)
- [ ] Border overlay tạo chuyển tiếp mềm ở mép dưới header
- [ ] Hover effect `text-secondary` hoạt động ở cả 2 states
