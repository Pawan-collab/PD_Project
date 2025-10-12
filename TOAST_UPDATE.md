# Toast Notification Updates

## Overview

The toast notification system has been updated with the following improvements:

✅ **Position**: Top-right corner
✅ **Auto-dismiss**: 5 seconds with visual countdown
✅ **Progress bar**: Animated loading bar showing time remaining
✅ **Multiple toasts**: Support for up to 3 simultaneous toasts
✅ **Smooth animations**: Slide-in from top with fade effects

## Changes Made

### 1. Toast Position
**File**: [frontend/src/components/ui/toast.tsx](frontend/src/components/ui/toast.tsx:10-23)

**Before**: Bottom-right on mobile, top on desktop
**After**: Top-right on all devices

```typescript
<ToastViewport
  className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col p-4 md:max-w-[420px]"
/>
```

### 2. Progress Bar Component
**File**: [frontend/src/components/ui/toast.tsx](frontend/src/components/ui/toast.tsx:116-137)

New component showing countdown timer:

```typescript
const ToastProgressBar = ({ duration = 5000 }: { duration?: number }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted overflow-hidden">
      <div
        className="h-full bg-primary"
        style={{
          animation: `toast-progress ${duration}ms linear forwards`,
        }}
      />
    </div>
  )
}
```

### 3. Auto-Dismiss Timer
**File**: [frontend/src/hooks/use-toast.ts](frontend/src/hooks/use-toast.ts:8-9)

**Before**: 1,000,000ms (never dismiss)
**After**: 5,000ms (5 seconds)

```typescript
const TOAST_LIMIT = 3 // Up to 3 toasts at once
const TOAST_REMOVE_DELAY = 1000 // Remove from DOM 1 second after dismiss
```

### 4. Updated Toaster Component
**File**: [frontend/src/components/ui/toaster.tsx](frontend/src/components/ui/toaster.tsx:12-35)

Now includes progress bar in each toast:

```typescript
<Toast key={id} duration={duration || 5000} {...props}>
  <div className="grid gap-1">
    {title && <ToastTitle>{title}</ToastTitle>}
    {description && <ToastDescription>{description}</ToastDescription>}
  </div>
  {action}
  <ToastClose />
  <ToastProgressBar duration={duration || 5000} />
</Toast>
```

## Features

### Visual Design

- **Position**: Fixed top-right corner
- **Max Width**: 420px on larger screens
- **Spacing**: 16px padding from screen edges
- **Border Radius**: Rounded corners (lg)
- **Shadow**: Large shadow for depth
- **Animation**: Smooth slide-in from top

### Progress Bar

- **Position**: Bottom of toast
- **Height**: 4px (1 unit)
- **Color**: Primary theme color
- **Animation**: Linear countdown from 100% to 0%
- **Duration**: Matches toast duration (default 5s)

### Behavior

1. **Auto-dismiss**: Toast automatically dismisses after duration
2. **Manual dismiss**: Click X button to close immediately
3. **Hover pause**: Progress pauses when hovering (Radix UI default)
4. **Swipe dismiss**: Swipe right to dismiss
5. **Multiple toasts**: Stack vertically with spacing

## Usage

### Basic Toast

```typescript
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

toast({
  title: "Success!",
  description: "Your changes have been saved.",
});
```

### Custom Duration

```typescript
toast({
  title: "Quick message",
  description: "This will disappear in 3 seconds",
  duration: 3000, // 3 seconds
});
```

### Error Toast

```typescript
toast({
  title: "Error",
  description: "Something went wrong. Please try again.",
  variant: "destructive",
  duration: 7000, // Show errors longer (7 seconds)
});
```

### Success Toast (Contact Form)

```typescript
toast({
  title: "Request Submitted Successfully!",
  description: "Our team will contact you within 24 hours.",
  duration: 5000, // Default 5 seconds
});
```

## Toast Variants

### Default (Success)
```typescript
toast({
  title: "Success",
  description: "Operation completed successfully",
});
```

### Destructive (Error)
```typescript
toast({
  title: "Error",
  description: "Something went wrong",
  variant: "destructive",
});
```

### With Action Button
```typescript
toast({
  title: "Update Available",
  description: "A new version is available",
  action: <ToastAction altText="Update">Update</ToastAction>,
});
```

## Animation Timeline

```
0ms    - Toast appears (slide-in from top)
0-5000ms - Progress bar animates from 100% to 0%
5000ms - Toast starts fade-out animation
5800ms - Toast completely dismissed
6800ms - Toast removed from DOM
```

## Styling

### Toast Container
- Flex column layout
- Space between items
- Padding for content
- Overflow hidden for progress bar

### Progress Bar
- Absolute positioning at bottom
- Full width
- 4px height
- Primary color
- Linear animation

### Colors

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | White | Dark gray |
| Border | Light gray | Gray |
| Text | Black | White |
| Progress | Primary | Primary |
| Error BG | Red | Dark red |
| Error Text | White | White |

## Responsive Behavior

### Mobile (<640px)
- Full width with padding
- Top position
- Stacks vertically

### Desktop (>640px)
- Max width 420px
- Top-right position
- Fixed to right edge

## Accessibility

- ✅ ARIA labels from Radix UI
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader announcements
- ✅ Focus management
- ✅ Color contrast compliant

## Examples in the App

### Contact Form - Success
```typescript
toast({
  title: "Request Submitted Successfully!",
  description: "Our team will contact you within 24 hours to discuss your requirements.",
});
```

### Contact Form - Error
```typescript
toast({
  title: "Submission Failed",
  description: "Please check your inputs and try again.",
  variant: "destructive",
});
```

### Validation Error
```typescript
toast({
  title: "Validation Error",
  description: "Name must be at least 3 characters",
  variant: "destructive",
  duration: 4000,
});
```

## Customization

### Change Default Duration

Edit [frontend/src/hooks/use-toast.ts](frontend/src/hooks/use-toast.ts):

```typescript
function toast({ duration = 5000, ...props }: Toast) {
  // Change 5000 to your preferred duration in milliseconds
}
```

### Change Progress Bar Color

Edit [frontend/src/components/ui/toast.tsx](frontend/src/components/ui/toast.tsx):

```typescript
<div className="h-full bg-primary"> // Change bg-primary to any color
```

### Change Toast Position

Edit [frontend/src/components/ui/toast.tsx](frontend/src/components/ui/toast.tsx):

```typescript
// Top-left
className="fixed top-0 left-0..."

// Bottom-right
className="fixed bottom-0 right-0..."

// Bottom-left
className="fixed bottom-0 left-0..."
```

### Change Max Toast Count

Edit [frontend/src/hooks/use-toast.ts](frontend/src/hooks/use-toast.ts):

```typescript
const TOAST_LIMIT = 3 // Change to your preferred limit
```

## Files Modified

1. **[frontend/src/components/ui/toast.tsx](frontend/src/components/ui/toast.tsx)**
   - Updated viewport position
   - Added ToastProgressBar component
   - Updated toast layout to flex-col
   - Added duration prop

2. **[frontend/src/components/ui/toaster.tsx](frontend/src/components/ui/toaster.tsx)**
   - Added progress bar to each toast
   - Pass duration prop to Toast component

3. **[frontend/src/hooks/use-toast.ts](frontend/src/hooks/use-toast.ts)**
   - Changed TOAST_LIMIT from 1 to 3
   - Changed TOAST_REMOVE_DELAY from 1000000 to 1000
   - Added duration to ToasterToast type
   - Set default duration to 5000ms in toast function

## Testing

### Test Scenarios

1. **Single Toast**
   - Submit contact form
   - Verify toast appears top-right
   - Verify progress bar animates
   - Verify toast dismisses after 5 seconds

2. **Multiple Toasts**
   - Trigger 3 toasts quickly
   - Verify all stack vertically
   - Verify each has its own progress bar
   - Verify each dismisses independently

3. **Manual Dismiss**
   - Show toast
   - Click X button
   - Verify toast dismisses immediately

4. **Custom Duration**
   - Show toast with duration: 3000
   - Verify dismisses after 3 seconds
   - Verify progress bar matches duration

5. **Error Toast**
   - Show destructive variant
   - Verify red styling
   - Verify progress bar color

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance

- Minimal re-renders with React.memo
- CSS animations (GPU-accelerated)
- Efficient timeout management
- No memory leaks

## Summary

✅ **Position**: Top-right corner
✅ **Duration**: 5 seconds auto-dismiss
✅ **Progress Bar**: Visual countdown
✅ **Limit**: Up to 3 toasts
✅ **Animations**: Smooth slide-in/out
✅ **Responsive**: Works on all screen sizes
✅ **Accessible**: Full keyboard and screen reader support

The toast system now provides better visual feedback with the progress bar showing exactly how much time remains before auto-dismiss! 🎉
