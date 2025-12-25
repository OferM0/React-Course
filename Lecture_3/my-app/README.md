## Step 1 — Link to State Inventory Document

[State Inventory](./State%20Inventory.md)

## Step 2 — Zustand-Based Cart Sidebar (Global UI State)

### Step 2.1 — Choose Your Sidebar

- Chosen: Cart sidebar
- What opens it: Cart button in the header.
- Where it appears: Right side, overlay.

### Step 2.2 — Design Your Layout/UI Store

- isOpen: boolean (tracks if the sidebar is open, persisted)
- items: array of cart items (persisted)
- addItem, updateQuantity, removeItem, getTotalItemCount functions
- Store file location: `src/stores/cartStore.ts`

### Step 2.3 — Implement in UI

1. A cart button in Header.tsx that toggles isCartOpen state.
2. A CartDrawer component that reads cart items from Zustand store and renders based on isCartOpen.
- The cartStore provides items (array of cart items), and actions like addItem(), updateQuantity(), removeItem() for managing the cart state globally.
- 

## Step 3 — Persist Sidebar with a Custom localStorage Hook

- Added custom hook defined in useLocalStorage.tsx in hookd folder 

### Step 3.1 — Design a Custom Hook

Hook receives:

- key (for example: "cart-drawer-open")
- defaultValue (false/true)

Logic:

- On first load: Try localStorage.getItem(key); if missing or invalid, use defaultValue.
- On every change: Save new value into localStorage.setItem(key, JSON.stringify(value)).

### Step 3.2 — Test Persistence

- Opened sidebar, refreshed → still open.
- Closed sidebar, refreshed → still closed.

- The useLocalStorage hook initializes state from localStorage on mount, saves changes automatically, and handles errors if there are any.   opening/closing the cart drawer persists across page refreshes.

## Step 4 — Global Toast Store (Zustand)

### Step 4.1 — Choose a Library

Chosen: Zustand. because it's lightweight, easy to set up, and provides a simple API for global state management.

Store file location: `src/stores/notificationStore.ts`

### Step 4.2 — Design the Notification Shape

Notification object includes:

- id (string)
- type ('success' | 'error' | 'info')
- message (string)

Store actions:

- addNotification(notification)
- removeNotification(id)

### Step 4.3 — ToastHost Component

The component:

- Subscribes to the Zustand store
- Renders toasts with appropriate styling for different types
- Has close buttons to remove individual toasts
- Mounted in App.tsx for global visibility

- Notifications are objects with id, type, message. Store provides add/remove actions.
- 

## Step 5 — Connect Toasts to Real Events with TanStack Query

### Step 5.1 — Success Toasts

Scenario: Add product to cart

- On success: Show success toast with product name.

Toast appears and closes automatically or manually.

### Step 5.2 — Error Toasts

Scenario: API error in Products query

On error: Shows "Failed to load products" toast with 5s timeout.

Confirmed: Toast appears; query shows its own error UI.

### Step 5.2 — Error Toasts

- API errors in queries/mutations trigger error toasts.

## Step 6 — Theme Toggle (Zustand)

### Step 6.1 — Choose a Library

Chosen: Zustand. Chosen for consistency with other global state.

Store file location: `src/stores/themeStore.ts`

### Step 6.2 — Design the Theme Store

Theme state: "light" | "dark"

Actions: toggleTheme()

Persisted to localStorage.

### Step 6.3 — Toggle Button

Added to Header component, shows Sun/Moon icon based on theme.

### Step 6.4 — Apply CSS Class

Applied "dark" class to document.documentElement when theme is dark.

- Theme toggle button in header, persists across sessions, applies dark mode styles.

## Step 9 — Reflection (Final Deliverable)

- **States in TanStack Query**: Products list and product detail - server state that needs caching and synchronization.
- **States in Context**: None - used Zustand for better performance.
- **States in Zustand**: Cart contents, notifications, theme - global client state that needs persistence and access across components.
- **States in local useState**: Cart drawer open/closed, quantity in ProductDetail, current view - temporary UI state specific to components.
- **Example where global state was clearly correct**: Cart contents - needs to be shared between ProductDetail page, Header (for count), and CartDrawer.
- **Example where local state was intentionally NOT global**: Quantity in ProductDetail - only affects that component's UI and doesn't need to persist or be shared.
- **Short summary**: Learned state differences, that TanStack Query for server state, Zustand for global client state with persistence, and local state for component-specific UI. Proper state architecture improves maintainability.
