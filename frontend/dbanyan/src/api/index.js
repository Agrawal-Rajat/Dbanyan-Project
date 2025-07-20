// Dbanyan Group - High-Performance API Configuration
// Optimized for speed and integrated with FastAPI backend
// Following project_context.md Section 3.1 and Protocol 2.2

import { QueryClient, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API Base URL - connects to FastAPI backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Optimized QueryClient for maximum performance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: attemptIndex => Math.min(500 * 2 ** attemptIndex, 3000),
      staleTime: 2 * 60 * 1000, // 2 minutes - aggressive for e-commerce
      gcTime: 5 * 60 * 1000, // 5 minutes (updated from cacheTime)
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// High-performance API client
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.controller = new AbortController();
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: options.signal || this.controller.signal,
      ...options,
    };

    // Add JWT token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('Request aborted:', endpoint);
        return null;
      }
      console.error(`API Error [${endpoint}]:`, error.message);
      throw error;
    }
  }

  // === PRODUCT ENDPOINTS ===
  
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value);
      }
    });
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return this.request(`/products${query}`);
  }

  async getFeaturedProducts(limit = 4) {
    return this.request(`/products/featured?limit=${limit}`);
  }

  async getProduct(uid) {
    return this.request(`/products/${uid}`);
  }

  async searchProducts(query, page = 1, per_page = 10) {
    return this.request(`/products/search?q=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`);
  }

  async checkStock(items) {
    return this.request('/products/check-stock', {
      method: 'POST',
      body: JSON.stringify(items),
    });
  }

  // === ORDER ENDPOINTS ===
  
  async createOrder(orderData) {
    return this.request('/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async confirmPayment(paymentData) {
    return this.request('/orders/confirm-payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getOrder(uid) {
    return this.request(`/orders/${uid}`);
  }

  async getCustomerOrders(email) {
    return this.request(`/orders/customer/${encodeURIComponent(email)}`);
  }

  // === COUPON ENDPOINTS ===
  
  async validateCoupon(code, orderAmount) {
    return this.request('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, order_amount: orderAmount }),
    });
  }

  // === NEWSLETTER ENDPOINTS ===
  
  async subscribeNewsletter(email) {
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async unsubscribeNewsletter(email) {
    return this.request('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// === OPTIMIZED REACT QUERY HOOKS ===

// Products
export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => apiClient.getProducts(params),
    staleTime: 60 * 1000, // 1 minute for product listings
  });
};

export const useFeaturedProducts = (limit = 4) => {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: () => apiClient.getFeaturedProducts(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes for featured products
  });
};

export const useProduct = (uid) => {
  return useQuery({
    queryKey: ['product', uid],
    queryFn: () => apiClient.getProduct(uid),
    enabled: !!uid,
    staleTime: 2 * 60 * 1000, // 2 minutes for individual products
  });
};

export const useSearchProducts = (query, page = 1, per_page = 10) => {
  return useQuery({
    queryKey: ['products', 'search', query, page, per_page],
    queryFn: () => apiClient.searchProducts(query, page, per_page),
    enabled: !!query && query.length > 0,
    staleTime: 30 * 1000, // 30 seconds for search results
  });
};

// Orders
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData) => apiClient.createOrder(orderData),
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paymentData) => apiClient.confirmPayment(paymentData),
    onSuccess: (data) => {
      // Invalidate products to update stock
      queryClient.invalidateQueries({ queryKey: ['products'] });
      // Cache the order
      if (data.order_uid) {
        queryClient.setQueryData(['order', data.order_uid], data);
      }
    },
  });
};

export const useOrder = (uid) => {
  return useQuery({
    queryKey: ['order', uid],
    queryFn: () => apiClient.getOrder(uid),
    enabled: !!uid,
  });
};

export const useCustomerOrders = (email) => {
  return useQuery({
    queryKey: ['orders', 'customer', email],
    queryFn: () => apiClient.getCustomerOrders(email),
    enabled: !!email,
  });
};

// Coupons
export const useValidateCoupon = () => {
  return useMutation({
    mutationFn: ({ code, orderAmount }) => apiClient.validateCoupon(code, orderAmount),
  });
};

// Newsletter
export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: (email) => apiClient.subscribeNewsletter(email),
  });
};

// Stock validation
export const useCheckStock = () => {
  return useMutation({
    mutationFn: (items) => apiClient.checkStock(items),
  });
};
