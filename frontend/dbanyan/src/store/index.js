// Dbanyan Group - Global State Management with Zustand
// Following project_context.md Section 3.1 tech stack requirements

import { create } from 'zustand';

// Cart Store - For Section 2.4: Cart & Checkout Flow
export const useCartStore = create((set, get) => ({
  items: [],
  total: 0,
  
  addItem: (product, quantity = 1) => {
    const state = get();
    const existingItem = state.items.find(item => item.id === product.id);
    
    let newItems;
    if (existingItem) {
      newItems = state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...state.items, { ...product, quantity }];
    }
    
    // Calculate new total
    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    set({ items: newItems, total: newTotal });
  },
  
  removeItem: (productId) => {
    const state = get();
    const newItems = state.items.filter(item => item.id !== productId);
    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    set({ items: newItems, total: newTotal });
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    const state = get();
    const newItems = state.items.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    set({ items: newItems, total: newTotal });
  },
  
  calculateTotal: () => {
    const state = get();
    const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    set({ total });
  },
  
  clearCart: () => set({ items: [], total: 0 }),
}));

// UI Store - For general UI state
export const useUIStore = create((set) => ({
  isChatOpen: false,
  isLoading: false,
  notifications: [],
  
  toggleChat: () => set(state => ({ isChatOpen: !state.isChatOpen })),
  setLoading: (loading) => set({ isLoading: loading }),
  
  addNotification: (notification) => set(state => ({
    notifications: [...state.notifications, { ...notification, id: Date.now() }]
  })),
  
  removeNotification: (id) => set(state => ({
    notifications: state.notifications.filter(notif => notif.id !== id)
  })),
}));
