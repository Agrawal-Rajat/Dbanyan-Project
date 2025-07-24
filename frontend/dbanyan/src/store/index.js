// Dbanyan Group - Optimized State Management with Zustand
// High-performance store connecting to FastAPI backend
// Following project_context.md Section 3.1 requirements

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// === CART STORE - Optimized for Performance ===
export const useCartStore = create(
  persist(
    immer((set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,
      isOpen: false,
      
      // Add item to cart with optimistic updates
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            item => item.product_uid === product.uid
          );
          
          if (existingItemIndex > -1) {
            // Update existing item
            state.items[existingItemIndex].quantity += quantity;
          } else {
            // Add new item
            state.items.push({
              product_uid: product.uid,
              product_name: product.name,
              price: parseFloat(product.price),
              quantity: quantity,
              image_url: product.images?.[0]?.url || '',
              weight: product.weight || '',
              max_quantity: product.quantity || 999
            });
          }
          
          // Recalculate totals
          state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
          state.subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        });
      },
      
      // Remove item completely
      removeItem: (productUid) => {
        set((state) => {
          state.items = state.items.filter(item => item.product_uid !== productUid);
          state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
          state.subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        });
      },
      
      // Update item quantity
      updateQuantity: (productUid, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productUid);
          return;
        }
        
        set((state) => {
          const itemIndex = state.items.findIndex(item => item.product_uid === productUid);
          if (itemIndex > -1) {
            state.items[itemIndex].quantity = quantity;
            state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          }
        });
      },
      
      // Clear entire cart
      clearCart: () => {
        set((state) => {
          state.items = [];
          state.totalItems = 0;
          state.subtotal = 0;
          state.isOpen = false;
        });
      },
      
      // Toggle cart visibility
      toggleCart: () => {
        set((state) => {
          state.isOpen = !state.isOpen;
        });
      },
      
      // Close cart
      closeCart: () => {
        set((state) => {
          state.isOpen = false;
        });
      },
      
      // Get cart data formatted for API
      getCartForAPI: () => {
        const { items } = get();
        return items.map(item => ({
          product_uid: item.product_uid,
          product_name: item.product_name,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity
        }));
      },
      
      // Validate cart against stock
      isValidForCheckout: () => {
        const { items } = get();
        return items.length > 0 && items.every(item => 
          item.quantity > 0 && item.quantity <= (item.max_quantity || 999)
        );
      }
    })),
    {
      name: 'dbanyan-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        subtotal: state.subtotal
      })
    }
  )
);

// === CHECKOUT STORE - For multi-step checkout ===
export const useCheckoutStore = create(
  immer((set, get) => ({
    // Checkout steps
    currentStep: 0,
    steps: ['cart', 'shipping', 'payment', 'confirmation'],
    
    // Customer details
    customerDetails: {
      email: '',
      full_name: '',
      phone: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'India'
    },
    
    // Coupon
    couponCode: '',
    couponDiscount: 0,
    couponValid: false,
    
    // Order totals
    subtotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    
    // Order state
    orderId: null,
    razorpayOrderId: null,
    isProcessing: false,
    
    // Actions
    setStep: (step) => {
      set((state) => {
        state.currentStep = typeof step === 'number' ? step : state.steps.indexOf(step);
      });
    },
    
    nextStep: () => {
      set((state) => {
        if (state.currentStep < state.steps.length - 1) {
          state.currentStep += 1;
        }
      });
    },
    
    prevStep: () => {
      set((state) => {
        if (state.currentStep > 0) {
          state.currentStep -= 1;
        }
      });
    },
    
    updateCustomerDetails: (details) => {
      set((state) => {
        Object.assign(state.customerDetails, details);
      });
    },
    
    setCoupon: (code, discount, valid) => {
      set((state) => {
        state.couponCode = code;
        state.couponDiscount = discount;
        state.couponValid = valid;
      });
    },
    
    updateTotals: (totals) => {
      set((state) => {
        Object.assign(state, totals);
      });
    },
    
    setOrderDetails: (orderId, razorpayOrderId) => {
      set((state) => {
        state.orderId = orderId;
        state.razorpayOrderId = razorpayOrderId;
      });
    },
    
    setProcessing: (processing) => {
      set((state) => {
        state.isProcessing = processing;
      });
    },
    
    resetCheckout: () => {
      set((state) => {
        state.currentStep = 0;
        state.customerDetails = {
          email: '',
          full_name: '',
          phone: '',
          address_line_1: '',
          address_line_2: '',
          city: '',
          state: '',
          postal_code: '',
          country: 'India'
        };
        state.couponCode = '';
        state.couponDiscount = 0;
        state.couponValid = false;
        state.orderId = null;
        state.razorpayOrderId = null;
        state.isProcessing = false;
      });
    }
  }))
);

// === UI STORE - For global UI state ===
export const useUIStore = create(
  immer((set, get) => ({
    // Loading states
    isPageLoading: false,
    isApiLoading: false,
    loadingMessage: '',
    
    // Navigation
    mobileMenuOpen: false,
    searchOpen: false,
    
    // Notifications/Toast
    notifications: [],
    
    // Chat
    isChatOpen: false,
    
    // Product filters
    filters: {
      category: null,
      priceRange: [0, 1000],
      sortBy: 'created_at',
      sortOrder: 'desc'
    },
    
    // Search
    searchQuery: '',
    searchResults: [],
    
    // Actions
    setPageLoading: (loading, message = '') => {
      set((state) => {
        state.isPageLoading = loading;
        state.loadingMessage = message;
      });
    },
    
    setApiLoading: (loading) => {
      set((state) => {
        state.isApiLoading = loading;
      });
    },
    
    toggleMobileMenu: () => {
      set((state) => {
        state.mobileMenuOpen = !state.mobileMenuOpen;
      });
    },
    
    closeMobileMenu: () => {
      set((state) => {
        state.mobileMenuOpen = false;
      });
    },
    
    toggleSearch: () => {
      set((state) => {
        state.searchOpen = !state.searchOpen;
      });
    },
    
    toggleChat: () => {
      set((state) => {
        state.isChatOpen = !state.isChatOpen;
      });
    },
    
    addNotification: (notification) => {
      set((state) => {
        state.notifications.push({
          id: Date.now() + Math.random(),
          type: 'info',
          duration: 5000,
          ...notification
        });
      });
    },
    
    removeNotification: (id) => {
      set((state) => {
        state.notifications = state.notifications.filter(n => n.id !== id);
      });
    },
    
    updateFilters: (newFilters) => {
      set((state) => {
        Object.assign(state.filters, newFilters);
      });
    },
    
    setSearchQuery: (query) => {
      set((state) => {
        state.searchQuery = query;
      });
    },
    
    setSearchResults: (results) => {
      set((state) => {
        state.searchResults = results;
      });
    }
  }))
);

// === USER STORE - Enhanced authentication store ===
export const useUserStore = create(
  persist(
    immer((set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      isLoading: false,
      error: null,
      
      setUser: (user, token) => {
        set((state) => {
          state.user = user;
          state.token = token;
          state.isAuthenticated = !!user;
          state.error = null;
        });
        
        if (token) {
          localStorage.setItem('auth_token', token);
        }
      },
      
      login: async (email, password) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });
        
        try {
          const response = await fetch('http://localhost:8000/api/v1/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Login failed');
          }
          
          const data = await response.json();
          
          set((state) => {
            state.user = data.user;
            state.token = data.access_token;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
          });
          
          localStorage.setItem('auth_token', data.access_token);
          
          return { success: true, user: data.user };
          
        } catch (error) {
          set((state) => {
            state.isLoading = false;
            state.error = error.message;
          });
          
          return { success: false, error: error.message };
        }
      },
      
      signup: async (userData) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });
        
        try {
          // Format data to match backend expectations
          const signupData = {
            email: userData.email,
            password: userData.password,
            full_name: `${userData.firstName} ${userData.lastName}`.trim(),
            phone: userData.phone || null
          };
          
          const response = await fetch('http://localhost:8000/api/v1/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Registration failed');
          }
          
          const data = await response.json();
          
          set((state) => {
            state.user = data.user;
            state.token = data.access_token;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
          });
          
          localStorage.setItem('auth_token', data.access_token);
          
          return { success: true, user: data.user };
          
        } catch (error) {
          set((state) => {
            state.isLoading = false;
            state.error = error.message;
          });
          
          return { success: false, error: error.message };
        }
      },
      
      forgotPassword: async (email) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });
        
        try {
          const response = await fetch('http://localhost:8000/api/v1/auth/forgot-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to send reset email');
          }
          
          set((state) => {
            state.isLoading = false;
          });
          
          return { success: true };
          
        } catch (error) {
          set((state) => {
            state.isLoading = false;
            state.error = error.message;
          });
          
          return { success: false, error: error.message };
        }
      },
      
      resetPassword: async (token, newPassword) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });
        
        try {
          const response = await fetch('http://localhost:8000/api/v1/auth/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, new_password: newPassword }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Password reset failed');
          }
          
          set((state) => {
            state.isLoading = false;
          });
          
          return { success: true };
          
        } catch (error) {
          set((state) => {
            state.isLoading = false;
            state.error = error.message;
          });
          
          return { success: false, error: error.message };
        }
      },
      
      clearError: () => {
        set((state) => {
          state.error = null;
        });
      },
      
      // Initialize auth from localStorage
      initializeAuth: () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Verify token is still valid by making a request to get current user
          fetch('http://localhost:8000/api/v1/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Token invalid');
            }
          })
          .then(userData => {
            set((state) => {
              state.user = userData;
              state.token = token;
              state.isAuthenticated = true;
            });
          })
          .catch(() => {
            localStorage.removeItem('auth_token');
            set((state) => {
              state.user = null;
              state.token = null;
              state.isAuthenticated = false;
            });
          });
        }
      },
      
      logout: () => {
        set((state) => {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.error = null;
        });
        
        localStorage.removeItem('auth_token');
      }
    })),
    {
      name: 'dbanyan-user',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Export utility functions
export const cartUtils = {
  formatPrice: (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
}).format(price);
},

calculateShipping: (subtotal) => {
  return subtotal >= 500 ? 0 : 50; // Free shipping above ₹500
},

calculateTax: (taxableAmount) => {
  return taxableAmount * 0.18; // 18% GST
}
};

// === AUTHENTICATION STORE - JWT-based auth with guest/admin flow ===
export const useAuthStore = create(
persist(
  immer((set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    
    // Login action
    login: async (email, password) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });
      
      try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });
        
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
        
        const data = await response.json();
        
        set((state) => {
          state.user = data.user;
          state.token = data.access_token;
          state.isAuthenticated = true;
          state.isLoading = false;
          state.error = null;
        });
        
        return { success: true, user: data.user };
      } catch (error) {
        set((state) => {
          state.isLoading = false;
          state.error = error.message;
        });
        return { success: false, error: error.message };
      }
    },
    
    // Signup action
    signup: async (userData) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });
      
      try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Signup failed');
        }
        
        const data = await response.json();
        
        set((state) => {
          state.user = data.user;
          state.token = data.access_token;
          state.isAuthenticated = true;
          state.isLoading = false;
          state.error = null;
        });
        
        return { success: true, user: data.user };
      } catch (error) {
        set((state) => {
          state.isLoading = false;
          state.error = error.message;
        });
        return { success: false, error: error.message };
      }
    },
    
    // Logout action
    logout: () => {
      set((state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
    },
    
    // Forgot password
    forgotPassword: async (email) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });
      
      try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/forgot-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        });
        
        if (!response.ok) {
          throw new Error('Failed to send reset email');
        }
        
        set((state) => {
          state.isLoading = false;
        });
        
        return { success: true };
      } catch (error) {
        set((state) => {
          state.isLoading = false;
          state.error = error.message;
        });
        return { success: false, error: error.message };
      }
    },
    
    // Reset password
    resetPassword: async (token, newPassword) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });
      
      try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/reset-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, new_password: newPassword })
        });
        
        if (!response.ok) {
          throw new Error('Failed to reset password');
        }
        
        set((state) => {
          state.isLoading = false;
        });
        
        return { success: true };
      } catch (error) {
        set((state) => {
          state.isLoading = false;
          state.error = error.message;
        });
        return { success: false, error: error.message };
      }
    },
    
    // Clear error
    clearError: () => {
      set((state) => {
        state.error = null;
      });
    },
    
    // Update user profile
    updateProfile: async (userData) => {
      const { token } = get();
      
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });
      
      try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        
        const data = await response.json();
        
        set((state) => {
          state.user = data.user;
          state.isLoading = false;
        });
        
        return { success: true };
      } catch (error) {
        set((state) => {
          state.isLoading = false;
          state.error = error.message;
        });
        return { success: false, error: error.message };
      }
    },
    
    // Check authentication status
    checkAuth: async () => {
      const { token } = get();
      
      if (!token) {
        return false;
      }
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          // Token is invalid, logout
          get().logout();
          return false;
        }
        
        const data = await response.json();
        
        set((state) => {
          state.user = data.user;
          state.isAuthenticated = true;
        });
        
        return true;
      } catch (error) {
        get().logout();
        return false;
      }
    }
  })),
  {
    name: 'dbanyan-auth',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      user: state.user,
      token: state.token,
      isAuthenticated: state.isAuthenticated
    })
  }
)
);