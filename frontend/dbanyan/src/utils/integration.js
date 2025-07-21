// Dbanyan Group - Frontend-Backend Integration Helpers
// Optimizes data flow and prevents laggy page transitions

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCartStore, useUIStore, cartUtils } from '../store';
import { apiClient } from '../api';

// === PERFORMANCE OPTIMIZATION HOOKS ===

// Preload critical data on app initialization
export const useAppInitialization = () => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    // Preload featured products for homepage
    queryClient.prefetchQuery({
      queryKey: ['products', 'featured', 4],
      queryFn: () => apiClient.getFeaturedProducts(4),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
    
    // Preload product categories
    queryClient.prefetchQuery({
      queryKey: ['products', { page: 1, per_page: 20 }],
      queryFn: () => apiClient.getProducts({ page: 1, per_page: 20 }),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  }, [queryClient]);
};

// Cart synchronization with backend stock validation
export const useCartSync = () => {
  const { items, updateQuantity, removeItem } = useCartStore();
  const { addNotification } = useUIStore();
  
  useEffect(() => {
    if (items.length === 0) return;
    
    // Periodically validate cart against current stock
    const validateCart = async () => {
      try {
        const stockCheck = await apiClient.checkStock(
          items.map(item => ({
            product_uid: item.product_uid,
            quantity: item.quantity
          }))
        );
        
        if (!stockCheck.available) {
          // Handle stock issues
          stockCheck.issues.forEach(issue => {
            const item = items.find(i => i.product_uid === issue.product_uid);
            if (item) {
              if (issue.issue.includes('not found') || issue.issue.includes('not active')) {
                removeItem(issue.product_uid);
                addNotification({
                  type: 'warning',
                  message: `${item.product_name} is no longer available and was removed from your cart.`
                });
              } else if (issue.issue.includes('Insufficient stock')) {
                const availableMatch = issue.issue.match(/Available: (\d+)/);
                if (availableMatch) {
                  const available = parseInt(availableMatch[1]);
                  updateQuantity(issue.product_uid, available);
                  addNotification({
                    type: 'warning',
                    message: `${item.product_name} quantity updated to ${available} (maximum available).`
                  });
                }
              }
            }
          });
        }
      } catch (error) {
        console.warn('Cart validation failed:', error);
      }
    };
    
    // Validate cart every 2 minutes
    const interval = setInterval(validateCart, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [items, updateQuantity, removeItem, addNotification]);
};

// Page transition optimization
export const usePageTransition = () => {
  const { setPageLoading } = useUIStore();
  
  const startPageTransition = (targetPage) => {
    setPageLoading(true, `Loading ${targetPage}...`);
  };
  
  const endPageTransition = () => {
    setPageLoading(false);
  };
  
  return { startPageTransition, endPageTransition };
};

// === DATA TRANSFORMATION UTILITIES ===

// Transform backend product data for frontend consumption
export const transformProduct = (backendProduct) => {
  return {
    uid: backendProduct.uid,
    name: backendProduct.name,
    description: backendProduct.description,
    shortDescription: backendProduct.short_description,
    category: backendProduct.category,
    price: parseFloat(backendProduct.price),
    compareAtPrice: backendProduct.compare_at_price ? parseFloat(backendProduct.compare_at_price) : null,
    images: backendProduct.images || [],
    ingredients: backendProduct.ingredients || [],
    benefits: backendProduct.benefits || [],
    usageInstructions: backendProduct.usage_instructions,
    nutritionInfo: backendProduct.nutrition_info,
    weight: backendProduct.weight,
    quantity: backendProduct.quantity,
    isPreservativeFree: backendProduct.is_preservative_free,
    isActive: backendProduct.is_active,
    seoTitle: backendProduct.seo_title,
    seoDescription: backendProduct.seo_description,
    createdAt: backendProduct.created_at,
    updatedAt: backendProduct.updated_at
  };
};

// Transform cart data for order creation
export const transformCartForOrder = (cartItems, customerDetails) => {
  return {
    customer_email: customerDetails.email,
    items: cartItems.map(item => ({
      product_uid: item.product_uid,
      product_name: item.product_name,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity
    })),
    shipping_address: {
      full_name: customerDetails.full_name,
      phone: customerDetails.phone,
      address_line_1: customerDetails.address_line_1,
      address_line_2: customerDetails.address_line_2 || '',
      city: customerDetails.city,
      state: customerDetails.state,
      postal_code: customerDetails.postal_code,
      country: customerDetails.country || 'India'
    },
    notes: customerDetails.notes || ''
  };
};

// === ERROR HANDLING UTILITIES ===

// Centralized error handler for API errors
export const handleApiError = (error, addNotification) => {
  let message = 'An unexpected error occurred. Please try again.';
  
  if (error.message) {
    if (error.message.includes('fetch')) {
      message = 'Unable to connect to server. Please check your internet connection.';
    } else if (error.message.includes('404')) {
      message = 'The requested resource was not found.';
    } else if (error.message.includes('400')) {
      message = 'Invalid request. Please check your input and try again.';
    } else if (error.message.includes('500')) {
      message = 'Server error. Please try again in a few moments.';
    } else {
      message = error.message;
    }
  }
  
  addNotification({
    type: 'error',
    message,
    duration: 8000
  });
  
  console.error('API Error:', error);
};

// === PERFORMANCE MONITORING ===

// Track page load performance
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Mark when React app is loaded
    if (typeof window !== 'undefined' && window.performance) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation'] });
      
      return () => observer.disconnect();
    }
  }, []);
};

// === RAZORPAY INTEGRATION HELPER ===

// Load Razorpay script dynamically
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// === EXPORT ALL UTILITIES ===

export const integrationUtils = {
  transformProduct,
  transformCartForOrder,
  handleApiError,
  loadRazorpayScript,
  formatPrice: cartUtils.formatPrice,
  calculateShipping: cartUtils.calculateShipping,
  calculateTax: cartUtils.calculateTax
};
