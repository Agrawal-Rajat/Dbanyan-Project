// Dbanyan Group - Payment Service
// Comprehensive payment integration with Razorpay for UPI, Cards, Wallets

import { api } from './api';

class PaymentService {
  constructor() {
    this.razorpay = null;
  }

  /**
   * Initialize Razorpay script
   */
  async initializeRazorpay() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  /**
   * Create order and get Razorpay details
   */
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders/create', orderData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create order');
    }
  }

  /**
   * Process payment with specific method preferences
   */
  async processPayment(orderDetails, paymentMethod = 'auto', customerInfo, onSuccess, onFailure) {
    try {
      // Initialize Razorpay if not already done
      const isLoaded = await this.initializeRazorpay();
      if (!isLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // Payment method specific preferences
      const methodPreferences = this.getMethodPreferences(paymentMethod);

      const options = {
        key: orderDetails.razorpay_key_id,
        amount: orderDetails.razorpay_order.amount,
        currency: orderDetails.razorpay_order.currency,
        name: 'Dbanyan Group',
        description: 'Premium Organic Moringa Products',
        image: '/logo.png', // Add your logo
        order_id: orderDetails.razorpay_order.id,
        
        // Method preferences
        ...methodPreferences,
        
        // Customer details
        prefill: {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          contact: customerInfo.phone
        },
        
        // Theme
        theme: {
          color: '#16a34a' // Green theme
        },
        
        // Success handler
        handler: async (response) => {
          try {
            const confirmResult = await this.confirmPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            if (confirmResult.success) {
              onSuccess(confirmResult);
            } else {
              onFailure(new Error(confirmResult.message));
            }
          } catch (error) {
            onFailure(error);
          }
        },
        
        // Modal options
        modal: {
          ondismiss: () => {
            onFailure(new Error('Payment cancelled by user'));
          }
        },
        
        // Retry options
        retry: {
          enabled: true,
          max_count: 3
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      onFailure(error);
    }
  }

  /**
   * Get method-specific preferences for Razorpay
   */
  getMethodPreferences(method) {
    const preferences = {
      // UPI-focused
      upi: {
        method: {
          upi: true,
          card: false,
          netbanking: false,
          wallet: false
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: 'Pay using UPI',
                instruments: [
                  { method: 'upi' }
                ]
              }
            },
            sequence: ['block.upi'],
            preferences: {
              show_default_blocks: false
            }
          }
        }
      },
      
      // Card-focused
      card: {
        method: {
          card: true,
          upi: false,
          netbanking: false,
          wallet: false
        },
        config: {
          display: {
            blocks: {
              card: {
                name: 'Credit/Debit Card',
                instruments: [
                  { method: 'card' }
                ]
              }
            },
            sequence: ['block.card'],
            preferences: {
              show_default_blocks: false
            }
          }
        }
      },
      
      // Wallet-focused
      wallet: {
        method: {
          wallet: true,
          upi: false,
          card: false,
          netbanking: false
        },
        config: {
          display: {
            blocks: {
              wallet: {
                name: 'Wallets',
                instruments: [
                  { method: 'wallet', wallets: ['paytm', 'phonepe', 'amazonpay', 'mobikwik'] }
                ]
              }
            },
            sequence: ['block.wallet'],
            preferences: {
              show_default_blocks: false
            }
          }
        }
      },
      
      // Netbanking-focused
      netbanking: {
        method: {
          netbanking: true,
          upi: false,
          card: false,
          wallet: false
        },
        config: {
          display: {
            blocks: {
              netbanking: {
                name: 'Net Banking',
                instruments: [
                  { method: 'netbanking' }
                ]
              }
            },
            sequence: ['block.netbanking'],
            preferences: {
              show_default_blocks: false
            }
          }
        }
      },
      
      // Auto - all methods enabled (default)
      auto: {
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true
        }
      }
    };

    return preferences[method] || preferences.auto;
  }

  /**
   * Confirm payment with backend
   */
  async confirmPayment(paymentData) {
    try {
      const response = await api.post('/orders/confirm-payment', paymentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to confirm payment');
    }
  }

  /**
   * Handle Cash on Delivery orders
   */
  async processCODOrder(orderData) {
    try {
      // For COD, we create order directly without Razorpay
      const codOrderData = {
        ...orderData,
        payment_method: 'cod',
        payment_status: 'pending'
      };
      
      // This would call a specific COD endpoint
      const response = await api.post('/orders/create-cod', codOrderData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create COD order');
    }
  }

  /**
   * Get available payment methods
   */
  getAvailablePaymentMethods() {
    return [
      {
        id: 'upi',
        name: 'UPI',
        description: 'Google Pay, PhonePe, Paytm & more',
        icon: '📱',
        recommended: true
      },
      {
        id: 'card',
        name: 'Cards',
        description: 'Credit/Debit Cards',
        icon: '💳'
      },
      {
        id: 'wallet',
        name: 'Wallets',
        description: 'Paytm, PhonePe, Amazon Pay',
        icon: '👛'
      },
      {
        id: 'netbanking',
        name: 'Net Banking',
        description: 'All major banks',
        icon: '🏦'
      },
      {
        id: 'cod',
        name: 'Cash on Delivery',
        description: 'Pay when you receive',
        icon: '💰'
      }
    ];
  }
}

// Export singleton instance
export const paymentService = new PaymentService();
export default paymentService;
