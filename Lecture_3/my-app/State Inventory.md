# State Inventory

## Pieces of State

- Products list (from TanStack Query in Products.tsx) → Server state
- Product detail (from TanStack Query in ProductDetail.tsx) → Server state
- Cart contents (from Zustand store in stores/cartStore.ts, persisted in localStorage) → Client/UI state
- Cart drawer open/closed (from useLocalStorage in App.tsx) → Client/UI state (persisted)
- Current view (products/product-detail, derived from location in App.tsx) → Client/UI state
- Theme (light/dark, from Zustand store in stores/themeStore.ts, persisted in localStorage) → Client/UI state
- Quantity in ProductDetail (from useState in ProductDetail.tsx) → Client/UI state
- Global fetching indicator (from useIsFetching in App.tsx) → Client/UI state

## Conclusion

Which pieces clearly belong to TanStack Query only: The products list and product detail states, as they are server-side data that needs caching, synchronization, and error handling provided by TanStack Query.

Which pieces make sense as global client state (Context / Zustand / Jotai): The cart contents, notifications list, and theme, as they need to be accessed and modified from multiple components across the app, making Zustand ideal for global state management with localStorage persistence.

Which are local UI state inside components: The cart drawer open/closed state, current view, quantity in ProductDetail, and global fetching indicator, as they are temporary UI toggles or derived states specific to component interactions.
