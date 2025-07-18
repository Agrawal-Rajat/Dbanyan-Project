// Dbanyan Group - Cart Indicator Component
// Simple cart indicator to test cart functionality

import React from 'react';
import { Badge, Group, Text, Card } from '@mantine/core';
import { useCartStore } from '../../store';

const CartIndicator = () => {
  const items = useCartStore(state => state.items);
  const total = useCartStore(state => state.total);
  
  if (items.length === 0) {
    return null;
  }

  return (
    <Card 
      className="fixed bottom-4 right-4 z-50 max-w-xs"
      style={{ backgroundColor: '#2C5F2D', color: 'white' }}
      shadow="lg"
      padding="md"
    >
      <Group justify="space-between" align="center">
        <div>
          <Text size="sm" weight={600}>Cart</Text>
          <Text size="xs">
            {items.reduce((sum, item) => sum + item.quantity, 0)} items
          </Text>
        </div>
        <div className="text-right">
          <Text size="lg" weight={700} style={{ color: '#FFBF00' }}>
            ₹{total}
          </Text>
        </div>
      </Group>
      
      <div className="mt-2 max-h-32 overflow-y-auto">
        {items.map(item => (
          <div key={item.id} className="flex justify-between text-xs py-1">
            <span>{item.name} x{item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CartIndicator;
