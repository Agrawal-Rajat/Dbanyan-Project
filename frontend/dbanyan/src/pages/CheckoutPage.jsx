// Dbanyan Group - Modern Checkout Page
// Premium e-commerce checkout experience with multi-step flow

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Container, 
  Grid, 
  Card, 
  Title, 
  Text, 
  Button, 
  TextInput, 
  Select, 
  Group, 
  Stack, 
  Badge, 
  Divider,
  Alert,
  Stepper,
  Radio,
  Checkbox,
  NumberInput,
  ActionIcon
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useCartStore, useUIStore } from '../store';
import { 
  IconShoppingCart, 
  IconTruck, 
  IconCreditCard, 
  IconShield,
  IconMapPin,
  IconUser,
  IconMail,
  IconPhone,
  IconEdit,
  IconCheck,
  IconArrowLeft,
  IconLock,
  IconGift,
  IconDiscount,
  IconPlus,
  IconMinus,
  IconX
} from '@tabler/icons-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore();
  const addNotification = useUIStore(state => state.addNotification);
  
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  // Calculate totals
  const subtotal = total;
  const deliveryCharge = deliveryOption === 'express' ? 99 : (subtotal > 499 ? 0 : 49);
  const discountAmount = (subtotal * discount) / 100;
  const finalTotal = subtotal + deliveryCharge - discountAmount;

  // Steps configuration
  const steps = [
    { label: 'Cart Review', icon: <IconShoppingCart className="w-4 h-4" /> },
    { label: 'Delivery Details', icon: <IconTruck className="w-4 h-4" /> },
    { label: 'Payment', icon: <IconCreditCard className="w-4 h-4" /> },
    { label: 'Confirmation', icon: <IconCheck className="w-4 h-4" /> }
  ];

  // Promo codes
  const promoCodes = {
    'FIRST10': { discount: 10, minOrder: 299, description: 'First Order Discount' },
    'HEALTH20': { discount: 20, minOrder: 599, description: 'Health Enthusiast Offer' },
    'MORINGA15': { discount: 15, minOrder: 399, description: 'Moringa Special' }
  };

  const handlePromoApply = () => {
    const promo = promoCodes[promoCode.toUpperCase()];
    if (promo && subtotal >= promo.minOrder) {
      setDiscount(promo.discount);
      setPromoApplied(true);
      addNotification({
        title: 'Promo Applied!',
        message: `${promo.description} - ${promo.discount}% off applied`,
        type: 'success'
      });
    } else if (promo) {
      addNotification({
        title: 'Minimum Order Required',
        message: `Minimum order of ₹${promo.minOrder} required for this promo`,
        type: 'error'
      });
    } else {
      addNotification({
        title: 'Invalid Promo Code',
        message: 'Please check your promo code and try again',
        type: 'error'
      });
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success
      clearCart();
      addNotification({
        title: 'Order Placed Successfully!',
        message: `Order total: ₹${finalTotal}. You will receive a confirmation email shortly.`,
        type: 'success'
      });
      
      // Navigate to success page or home
      navigate('/');
      
    } catch (error) {
      addNotification({
        title: 'Order Failed',
        message: 'There was an error processing your order. Please try again.',
        type: 'error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout | Dbanyan Group</title>
        </Helmet>
        <Container size="md" className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IconShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <Title order={2} className="text-2xl text-gray-700 mb-4">Your cart is empty</Title>
            <Text className="text-gray-600 mb-6">Add some products to continue with checkout</Text>
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </motion.div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Secure Checkout | Dbanyan Group</title>
        <meta name="description" content="Secure checkout for premium Moringa products" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8">
        <Container size="xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Group justify="space-between" align="center" className="mb-6">
              <Button
                variant="subtle"
                leftSection={<IconArrowLeft className="w-4 h-4" />}
                onClick={() => navigate('/products')}
                className="text-green-600 hover:bg-green-50"
              >
                Back to Shopping
              </Button>
              <div className="text-center">
                <Title order={1} className="text-3xl font-serif text-green-800">
                  Secure Checkout
                </Title>
                <Group justify="center" gap="xs" className="mt-2">
                  <IconShield className="w-4 h-4 text-green-600" />
                  <Text size="sm" className="text-green-600">256-bit SSL Encrypted</Text>
                </Group>
              </div>
              <div className="w-32" /> {/* Spacer for centering */}
            </Group>

            {/* Progress Stepper */}
            <Card className="bg-white shadow-sm">
              <Stepper 
                active={activeStep} 
                onStepClick={setActiveStep}
                allowNextStepsSelect={false}
                className="w-full"
              >
                {steps.map((step, index) => (
                  <Stepper.Step 
                    key={index}
                    label={step.label}
                    icon={step.icon}
                  />
                ))}
              </Stepper>
            </Card>
          </motion.div>

          <Grid gutter="lg">
            {/* Main Content */}
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <AnimatePresence mode="wait">
                {/* Step 1: Cart Review */}
                {activeStep === 0 && (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="bg-white shadow-sm">
                      <Stack gap="lg">
                        <Title order={3} className="text-xl font-semibold text-gray-800">
                          Review Your Order
                        </Title>
                        
                        {items.map((item) => (
                          <div key={item.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <Group justify="space-between" align="flex-start">
                              <div className="flex-1">
                                <Group gap="md">
                                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                                    <Text size="xs" className="text-green-700">IMG</Text>
                                  </div>
                                  <div className="flex-1">
                                    <Title order={5} className="text-gray-800 mb-1">
                                      {item.name}
                                    </Title>
                                    <Text size="sm" className="text-gray-600 mb-2">
                                      ₹{item.price} each
                                    </Text>
                                    <Group gap="xs">
                                      <ActionIcon
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                        className="border-green-300 text-green-600"
                                      >
                                        <IconMinus className="w-3 h-3" />
                                      </ActionIcon>
                                      <Text className="mx-2 min-w-8 text-center font-semibold">
                                        {item.quantity}
                                      </Text>
                                      <ActionIcon
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="border-green-300 text-green-600"
                                      >
                                        <IconPlus className="w-3 h-3" />
                                      </ActionIcon>
                                    </Group>
                                  </div>
                                </Group>
                              </div>
                              <div className="text-right">
                                <Text className="text-lg font-semibold text-gray-800">
                                  ₹{item.price * item.quantity}
                                </Text>
                                <ActionIcon
                                  variant="subtle"
                                  color="red"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  className="mt-2"
                                >
                                  <IconX className="w-4 h-4" />
                                </ActionIcon>
                              </div>
                            </Group>
                          </div>
                        ))}

                        <Button 
                          fullWidth 
                          size="lg"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => setActiveStep(1)}
                        >
                          Continue to Delivery Details
                        </Button>
                      </Stack>
                    </Card>
                  </motion.div>
                )}

                {/* Step 2: Delivery Details */}
                {activeStep === 1 && (
                  <motion.div
                    key="delivery"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Stack gap="lg">
                      {/* Contact Information */}
                      <Card className="bg-white shadow-sm">
                        <Stack gap="md">
                          <Title order={3} className="text-xl font-semibold text-gray-800">
                            Contact Information
                          </Title>
                          
                          <Grid>
                            <Grid.Col span={6}>
                              <TextInput
                                label="First Name"
                                placeholder="Enter first name"
                                value={customerInfo.firstName}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, firstName: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                            <Grid.Col span={6}>
                              <TextInput
                                label="Last Name"
                                placeholder="Enter last name"
                                value={customerInfo.lastName}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, lastName: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                            <Grid.Col span={6}>
                              <TextInput
                                label="Email"
                                placeholder="your@email.com"
                                type="email"
                                value={customerInfo.email}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, email: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                            <Grid.Col span={6}>
                              <TextInput
                                label="Phone"
                                placeholder="+91 XXXXX XXXXX"
                                value={customerInfo.phone}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, phone: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                          </Grid>
                        </Stack>
                      </Card>

                      {/* Delivery Address */}
                      <Card className="bg-white shadow-sm">
                        <Stack gap="md">
                          <Title order={3} className="text-xl font-semibold text-gray-800">
                            Delivery Address
                          </Title>
                          
                          <TextInput
                            label="Address"
                            placeholder="House no, Building, Street"
                            value={customerInfo.address}
                            onChange={(e) => setCustomerInfo(prev => ({...prev, address: e.target.value}))}
                            required
                          />
                          
                          <Grid>
                            <Grid.Col span={4}>
                              <TextInput
                                label="City"
                                placeholder="City"
                                value={customerInfo.city}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, city: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <Select
                                label="State"
                                placeholder="Select state"
                                value={customerInfo.state}
                                onChange={(value) => setCustomerInfo(prev => ({...prev, state: value}))}
                                data={[
                                  'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat',
                                  'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Punjab', 'Haryana'
                                ]}
                                required
                              />
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <TextInput
                                label="PIN Code"
                                placeholder="000000"
                                value={customerInfo.pincode}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, pincode: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                          </Grid>
                          
                          <TextInput
                            label="Landmark (Optional)"
                            placeholder="Near landmark for easy delivery"
                            value={customerInfo.landmark}
                            onChange={(e) => setCustomerInfo(prev => ({...prev, landmark: e.target.value}))}
                          />
                        </Stack>
                      </Card>

                      {/* Delivery Options */}
                      <Card className="bg-white shadow-sm">
                        <Stack gap="md">
                          <Title order={3} className="text-xl font-semibold text-gray-800">
                            Delivery Options
                          </Title>
                          
                          <Stack gap="sm">
                            <Card 
                              className={`cursor-pointer border-2 transition-all ${
                                deliveryOption === 'standard' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setDeliveryOption('standard')}
                            >
                              <Group justify="space-between">
                                <div>
                                  <Group gap="sm">
                                    <Radio 
                                      checked={deliveryOption === 'standard'} 
                                      onChange={() => setDeliveryOption('standard')}
                                    />
                                    <div>
                                      <Text className="font-semibold">Standard Delivery</Text>
                                      <Text size="sm" className="text-gray-600">5-7 business days</Text>
                                    </div>
                                  </Group>
                                </div>
                                <Text className="font-semibold text-green-600">
                                  {subtotal > 499 ? 'FREE' : '₹49'}
                                </Text>
                              </Group>
                            </Card>
                            
                            <Card 
                              className={`cursor-pointer border-2 transition-all ${
                                deliveryOption === 'express' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setDeliveryOption('express')}
                            >
                              <Group justify="space-between">
                                <div>
                                  <Group gap="sm">
                                    <Radio 
                                      checked={deliveryOption === 'express'} 
                                      onChange={() => setDeliveryOption('express')}
                                    />
                                    <div>
                                      <Text className="font-semibold">Express Delivery</Text>
                                      <Text size="sm" className="text-gray-600">2-3 business days</Text>
                                    </div>
                                  </Group>
                                </div>
                                <Text className="font-semibold text-orange-600">₹99</Text>
                              </Group>
                            </Card>
                          </Stack>
                        </Stack>
                      </Card>

                      <Group justify="space-between">
                        <Button 
                          variant="outline"
                          onClick={() => setActiveStep(0)}
                          className="border-green-600 text-green-600"
                        >
                          Back to Cart
                        </Button>
                        <Button 
                          size="lg"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => setActiveStep(2)}
                          disabled={!customerInfo.firstName || !customerInfo.email || !customerInfo.address}
                        >
                          Continue to Payment
                        </Button>
                      </Group>
                    </Stack>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {activeStep === 2 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Stack gap="lg">
                      <Card className="bg-white shadow-sm">
                        <Stack gap="md">
                          <Title order={3} className="text-xl font-semibold text-gray-800">
                            Payment Method
                          </Title>
                          
                          <Stack gap="sm">
                            <Card 
                              className={`cursor-pointer border-2 transition-all ${
                                paymentMethod === 'razorpay' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setPaymentMethod('razorpay')}
                            >
                              <Group gap="sm">
                                <Radio 
                                  checked={paymentMethod === 'razorpay'} 
                                  onChange={() => setPaymentMethod('razorpay')}
                                />
                                <div>
                                  <Text className="font-semibold">Online Payment</Text>
                                  <Text size="sm" className="text-gray-600">
                                    Credit/Debit Card, UPI, Net Banking
                                  </Text>
                                </div>
                              </Group>
                            </Card>
                            
                            <Card 
                              className={`cursor-pointer border-2 transition-all ${
                                paymentMethod === 'cod' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setPaymentMethod('cod')}
                            >
                              <Group gap="sm">
                                <Radio 
                                  checked={paymentMethod === 'cod'} 
                                  onChange={() => setPaymentMethod('cod')}
                                />
                                <div>
                                  <Text className="font-semibold">Cash on Delivery</Text>
                                  <Text size="sm" className="text-gray-600">
                                    Pay when you receive your order
                                  </Text>
                                </div>
                              </Group>
                            </Card>
                          </Stack>
                        </Stack>
                      </Card>

                      <Group justify="space-between">
                        <Button 
                          variant="outline"
                          onClick={() => setActiveStep(1)}
                          className="border-green-600 text-green-600"
                        >
                          Back to Delivery
                        </Button>
                        <Button 
                          size="lg"
                          className="bg-green-600 hover:bg-green-700"
                          loading={isProcessing}
                          onClick={handlePlaceOrder}
                        >
                          {isProcessing ? 'Processing...' : `Place Order - ₹${finalTotal}`}
                        </Button>
                      </Group>
                    </Stack>
                  </motion.div>
                )}
              </AnimatePresence>
            </Grid.Col>

            {/* Order Summary Sidebar */}
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <div className="sticky top-8">
                <Card className="bg-white shadow-sm">
                  <Stack gap="md">
                    <Title order={3} className="text-xl font-semibold text-gray-800">
                      Order Summary
                    </Title>
                    
                    <Divider />
                    
                    {/* Promo Code */}
                    {!promoApplied && (
                      <div>
                        <Group gap="xs">
                          <TextInput
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            variant="outline"
                            onClick={handlePromoApply}
                            className="border-green-600 text-green-600"
                          >
                            Apply
                          </Button>
                        </Group>
                      </div>
                    )}
                    
                    {promoApplied && (
                      <Alert color="green" icon={<IconGift className="w-4 h-4" />}>
                        <Text size="sm">Promo code applied - {discount}% off!</Text>
                      </Alert>
                    )}
                    
                    <Divider />
                    
                    {/* Price Breakdown */}
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</Text>
                        <Text>₹{subtotal}</Text>
                      </Group>
                      
                      <Group justify="space-between">
                        <Text>Delivery charges</Text>
                        <Text className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                          {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                        </Text>
                      </Group>
                      
                      {promoApplied && (
                        <Group justify="space-between">
                          <Text className="text-green-600">Discount ({discount}%)</Text>
                          <Text className="text-green-600">-₹{discountAmount}</Text>
                        </Group>
                      )}
                      
                      <Divider />
                      
                      <Group justify="space-between" className="text-lg font-semibold">
                        <Text>Total</Text>
                        <Text>₹{finalTotal}</Text>
                      </Group>
                    </Stack>
                    
                    {/* Security Badge */}
                    <Card className="bg-green-50 border border-green-200">
                      <Group gap="sm">
                        <IconLock className="w-5 h-5 text-green-600" />
                        <div>
                          <Text size="sm" className="font-semibold text-green-800">
                            Secure Payment
                          </Text>
                          <Text size="xs" className="text-green-600">
                            Your payment information is protected
                          </Text>
                        </div>
                      </Group>
                    </Card>
                  </Stack>
                </Card>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default CheckoutPage;
