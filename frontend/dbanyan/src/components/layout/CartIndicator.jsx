// Dbanyan Group - Modern Cart Indicator Component
// Enhanced floating cart with better UX

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge, Group, Text, Card, Button, ActionIcon, Stack, Divider } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store';
import { 
  IconShoppingCart, 
  IconChevronUp, 
  IconChevronDown, 
  IconX,
  IconPlus,
  IconMinus
} from '@tabler/icons-react';

const CartIndicator = () => {
  const navigate = useNavigate();
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  if (items.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <Card 
        className="bg-white shadow-xl border border-gray-200 overflow-hidden"
        style={{ minWidth: '320px', maxWidth: '380px' }}
        padding={0}
      >
        {/* Cart Header - Always Visible */}
        <div 
          className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 cursor-pointer hover:from-green-700 hover:to-green-800 transition-all"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <div className="relative">
                <IconShoppingCart className="w-6 h-6" />
                <Badge 
                  className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs"
                  size="xs"
                  circle
                >
                  {totalItems}
                </Badge>
              </div>
              <div>
                <Text size="sm" className="font-semibold">
                  Cart ({totalItems} items)
                </Text>
                <Text size="xs" className="opacity-90">
                  Click to {isExpanded ? 'collapse' : 'expand'}
                </Text>
              </div>
            </Group>
            <div className="text-right">
              <Text size="lg" className="font-bold text-yellow-300">
                ₹{total}
              </Text>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <IconChevronDown className="w-4 h-4" />
              </motion.div>
            </div>
          </Group>
        </div>

        {/* Expandable Cart Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4">
                <Stack gap="sm">
                  {/* Cart Items */}
                  <div className="max-h-64 overflow-y-auto">
                    <Stack gap="xs">
                      {items.map((item) => (
                        <Card key={item.id} className="bg-gray-50 border border-gray-200 p-3">
                          <Group justify="space-between" align="flex-start">
                            <div className="flex-1">
                              <Text size="sm" className="font-semibold text-gray-800 mb-1">
                                {item.name}
                              </Text>
                              <Text size="xs" className="text-gray-600 mb-2">
                                ₹{item.price} each
                              </Text>
                              <Group gap="xs" align="center">
                                <ActionIcon
                                  variant="light"
                                  size="xs"
                                  color="green"
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                >
                                  <IconMinus className="w-3 h-3" />
                                </ActionIcon>
                                <Text size="sm" className="font-semibold min-w-6 text-center">
                                  {item.quantity}
                                </Text>
                                <ActionIcon
                                  variant="light"
                                  size="xs"
                                  color="green"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <IconPlus className="w-3 h-3" />
                                </ActionIcon>
                              </Group>
                            </div>
                            <div className="text-right">
                              <Text size="sm" className="font-semibold text-green-700 mb-1">
                                ₹{item.price * item.quantity}
                              </Text>
                              <ActionIcon
                                variant="light"
                                color="red"
                                size="xs"
                                onClick={() => removeItem(item.id)}
                              >
                                <IconX className="w-3 h-3" />
                              </ActionIcon>
                            </div>
                          </Group>
                        </Card>
                      ))}
                    </Stack>
                  </div>

                  <Divider />

                  {/* Delivery Info */}
                  <Card className="bg-green-50 border border-green-200 p-3">
                    <Text size="xs" className="text-green-700 text-center">
                      {total > 499 ? '🎉 FREE Delivery on this order!' : `Add ₹${499 - total} more for FREE delivery`}
                    </Text>
                  </Card>

                  {/* Action Buttons */}
                  <Stack gap="xs">
                    <Button 
                      fullWidth 
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        navigate('/checkout');
                        setIsExpanded(false);
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outline"
                      size="sm"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => {
                        navigate('/products');
                        setIsExpanded(false);
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </Stack>
                </Stack>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default CartIndicator;
