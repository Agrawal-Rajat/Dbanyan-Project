// Dbanyan Group - Debug Test Page
// Simple page to test navigation and cart functionality

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Button, Stack, Card, Text } from '@mantine/core';
import { useCartStore } from '../store';

const TestPage = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore(state => state.items);
  const cartTotal = useCartStore(state => state.total);
  const clearCart = useCartStore(state => state.clearCart);

  return (
    <Container size="md" className="py-8">
      <Stack spacing="lg">
        <Title order={1}>Test Page - Navigation Working! ✅</Title>
        
        <Card padding="lg">
          <Title order={3}>Navigation Test</Title>
          <Stack spacing="md">
            <Button onClick={() => navigate('/')}>Go to Home</Button>
            <Button onClick={() => navigate('/products')}>Go to Products</Button>
            <Button onClick={() => navigate('/products/1')}>Go to Product 1</Button>
            <Button onClick={() => navigate('/products/2')}>Go to Product 2</Button>
          </Stack>
        </Card>

        <Card padding="lg">
          <Title order={3}>Cart Test</Title>
          <Text>Items in cart: {cartItems.length}</Text>
          <Text>Total: ₹{cartTotal}</Text>
          
          {cartItems.length > 0 && (
            <>
              <Text weight={600} className="mt-4">Cart Contents:</Text>
              {cartItems.map(item => (
                <Text key={item.id} size="sm">
                  {item.name} - Qty: {item.quantity} - ₹{item.price * item.quantity}
                </Text>
              ))}
              <Button color="red" onClick={clearCart} className="mt-4">
                Clear Cart
              </Button>
            </>
          )}
          
          {cartItems.length === 0 && (
            <Text color="dimmed">Cart is empty. Add some products from the Products page!</Text>
          )}
        </Card>
      </Stack>
    </Container>
  );
};

export default TestPage;
