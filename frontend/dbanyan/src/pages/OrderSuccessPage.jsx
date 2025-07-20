// Dbanyan Group - Order Success Page
// Professional order confirmation with tracking details

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Button,
  Card,
  Group,
  Stack,
  Badge,
  Divider,
  Box
} from '@mantine/core';
import {
  IconCheck,
  IconPackage,
  IconTruck,
  IconMail,
  IconHome,
  IconShoppingBag
} from '@tabler/icons-react';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order') || 'ORD-' + Date.now();

  return (
    <>
      <Helmet>
        <title>Order Confirmed | Dbanyan Group</title>
        <meta name="description" content="Your order has been confirmed successfully" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <Box className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <IconCheck className="w-12 h-12 text-green-600" />
              </Box>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-8"
            >
              <Title order={1} className="text-3xl font-serif text-green-800 mb-4">
                Order Confirmed!
              </Title>
              <Text size="lg" className="text-gray-600 mb-2">
                Thank you for choosing Dbanyan Group
              </Text>
              <Text className="text-gray-500">
                Your order has been placed successfully and is being processed
              </Text>
            </motion.div>

            {/* Order Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8"
            >
              <Card className="bg-white shadow-lg border border-green-100">
                <Stack gap="lg">
                  <Group justify="space-between">
                    <Text className="font-semibold text-gray-800">Order Number:</Text>
                    <Badge size="lg" className="bg-green-100 text-green-800">
                      {orderNumber}
                    </Badge>
                  </Group>
                  
                  <Divider />
                  
                  {/* Next Steps */}
                  <div className="text-left">
                    <Title order={4} className="text-lg font-semibold text-gray-800 mb-4">
                      What happens next?
                    </Title>
                    
                    <Stack gap="md">
                      <Group gap="md">
                        <Box className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconMail className="w-5 h-5 text-blue-600" />
                        </Box>
                        <div>
                          <Text className="font-medium text-gray-800">Confirmation Email</Text>
                          <Text size="sm" className="text-gray-600">You'll receive an order confirmation email shortly</Text>
                        </div>
                      </Group>
                      
                      <Group gap="md">
                        <Box className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconPackage className="w-5 h-5 text-orange-600" />
                        </Box>
                        <div>
                          <Text className="font-medium text-gray-800">Order Processing</Text>
                          <Text size="sm" className="text-gray-600">We'll carefully prepare your premium Moringa products</Text>
                        </div>
                      </Group>
                      
                      <Group gap="md">
                        <Box className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconTruck className="w-5 h-5 text-green-600" />
                        </Box>
                        <div>
                          <Text className="font-medium text-gray-800">Shipping</Text>
                          <Text size="sm" className="text-gray-600">Your order will be shipped within 1-2 business days</Text>
                        </div>
                      </Group>
                    </Stack>
                  </div>
                </Stack>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="space-y-4"
            >
              <Group justify="center" gap="md">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                  leftSection={<IconShoppingBag className="w-5 h-5" />}
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                  leftSection={<IconHome className="w-5 h-5" />}
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
              </Group>
              
              <Text size="sm" className="text-gray-500 mt-4">
                Questions about your order? Contact us at{' '}
                <Text component="span" className="text-green-600 font-medium">
                  support@dbanyangroup.com
                </Text>{' '}
                or call{' '}
                <Text component="span" className="text-green-600 font-medium">
                  +91 XXX XXX XXXX
                </Text>
              </Text>
            </motion.div>
          </motion.div>
        </Container>
      </main>
    </>
  );
};

export default OrderSuccessPage;
