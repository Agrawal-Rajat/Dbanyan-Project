// Dbanyan Group - User Profile Page
// Complete user dashboard with orders, profile, and cart management

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Title, 
  Text, 
  Group, 
  Stack, 
  Button, 
  Card, 
  Avatar, 
  Badge, 
  Divider,
  Tabs,
  TextInput,
  Table,
  ActionIcon,
  Alert,
  Grid,
  Box,
  Progress
} from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useUserStore, useCartStore } from '../store';
import { 
  IconUser, 
  IconShoppingBag, 
  IconSettings, 
  IconEdit, 
  IconMail, 
  IconPhone,
  IconCalendar,
  IconTruck,
  IconCheck,
  IconX,
  IconTrash,
  IconHeart,
  IconLogout,
  IconShield
} from '@tabler/icons-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUserStore();
  const { items: cartItems, removeItem, updateQuantity } = useCartStore();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Mock orders data (replace with actual API call)
  useEffect(() => {
    const mockOrders = [
      {
        id: 'ORD-001',
        date: '2025-01-15',
        status: 'delivered',
        total: 598,
        items: [
          { name: 'Moringa Powder', quantity: 2, price: 299 }
        ]
      },
      {
        id: 'ORD-002',
        date: '2025-01-10',
        status: 'shipped',
        total: 349,
        items: [
          { name: 'Moringa Paste', quantity: 1, price: 349 }
        ]
      },
      {
        id: 'ORD-003',
        date: '2025-01-05',
        status: 'processing',
        total: 199,
        items: [
          { name: 'Moringa Drumstick', quantity: 1, price: 199 }
        ]
      },
      {
        id: 'ORD-004',
        date: '2025-01-02',
        status: 'delivered',
        total: 259,
        items: [
          { name: 'Moringa Dry Flower', quantity: 1, price: 259 }
        ]
      }
    ];
    setOrders(mockOrders);
  }, []);

  if (!isAuthenticated || !user) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'shipped': return 'blue';
      case 'processing': return 'yellow';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Profile | Dbanyan Group</title>
        <meta name="description" content="Manage your Dbanyan Group account, view orders, and update profile information." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <Paper className="p-6 mb-6" shadow="sm">
              <Group justify="space-between" align="center">
                <Group align="center">
                  <Avatar 
                    size="lg" 
                    className="bg-emerald-500"
                    style={{ fontSize: '24px' }}
                  >
                    {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </Avatar>
                  <div>
                    <Title order={2} className="text-gray-800">
                      {user.full_name || 'User'}
                    </Title>
                    <Text c="dimmed" size="sm">
                      {user.email}
                    </Text>
                    <Badge 
                      color={user.role === 'admin' ? 'red' : 'blue'} 
                      variant="light" 
                      size="sm"
                      leftSection={user.role === 'admin' ? <IconShield size={12} /> : <IconUser size={12} />}
                    >
                      {user.role === 'admin' ? 'Administrator' : 'Customer'}
                    </Badge>
                  </div>
                </Group>
                <Group>
                  {user.role === 'admin' && (
                    <Button 
                      leftSection={<IconSettings size={16} />}
                      onClick={() => navigate('/admin')}
                      variant="light"
                    >
                      Admin Panel
                    </Button>
                  )}
                  <Button 
                    leftSection={<IconLogout size={16} />}
                    onClick={handleLogout}
                    variant="outline"
                    color="red"
                  >
                    Logout
                  </Button>
                </Group>
              </Group>
            </Paper>

            {/* Tabs */}
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab 
                  value="profile" 
                  leftSection={<IconUser size={16} />}
                >
                  Profile
                </Tabs.Tab>
                <Tabs.Tab 
                  value="orders" 
                  leftSection={<IconShoppingBag size={16} />}
                >
                  Orders ({orders.length})
                </Tabs.Tab>
                <Tabs.Tab 
                  value="cart" 
                  leftSection={<IconTruck size={16} />}
                >
                  Cart ({cartItems.length})
                </Tabs.Tab>
              </Tabs.List>

              {/* Profile Tab */}
              <Tabs.Panel value="profile" pt="md">
                <Paper className="p-6" shadow="sm">
                  <Group justify="space-between" mb="md">
                    <Title order={3}>Personal Information</Title>
                    <Button 
                      leftSection={<IconEdit size={16} />}
                      onClick={() => setEditMode(!editMode)}
                      variant={editMode ? 'filled' : 'light'}
                    >
                      {editMode ? 'Save' : 'Edit'}
                    </Button>
                  </Group>

                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Full Name"
                        value={user.full_name || ''}
                        disabled={!editMode}
                        leftSection={<IconUser size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Email"
                        value={user.email}
                        disabled
                        leftSection={<IconMail size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Phone"
                        value={user.phone || ''}
                        disabled={!editMode}
                        leftSection={<IconPhone size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Member Since"
                        value={new Date(user.created_at).toLocaleDateString()}
                        disabled
                        leftSection={<IconCalendar size={16} />}
                      />
                    </Grid.Col>
                  </Grid>

                  {user.last_login && (
                    <Alert color="blue" mt="md" variant="light">
                      Last login: {new Date(user.last_login).toLocaleString()}
                    </Alert>
                  )}
                </Paper>
              </Tabs.Panel>

              {/* Orders Tab */}
              <Tabs.Panel value="orders" pt="md">
                <Paper className="p-6" shadow="sm">
                  <Title order={3} mb="md">Order History</Title>
                  
                  {orders.length === 0 ? (
                    <Alert color="blue" variant="light">
                      No orders found. Start shopping to see your orders here!
                    </Alert>
                  ) : (
                    <Stack gap="md">
                      {orders.map((order) => (
                        <Card key={order.id} className="border border-gray-200">
                          <Group justify="space-between" mb="sm">
                            <Group>
                              <Text fw={600}>#{order.id}</Text>
                              <Badge color={getStatusColor(order.status)} variant="light">
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </Group>
                            <Text size="sm" c="dimmed">
                              {new Date(order.date).toLocaleDateString()}
                            </Text>
                          </Group>
                          
                          <Divider my="sm" />
                          
                          <Stack gap="xs">
                            {order.items.map((item, index) => (
                              <Group key={index} justify="space-between">
                                <Text size="sm">
                                  {item.name} × {item.quantity}
                                </Text>
                                <Text size="sm" fw={500}>
                                  ₹{item.price}
                                </Text>
                              </Group>
                            ))}
                          </Stack>
                          
                          <Divider my="sm" />
                          
                          <Group justify="space-between">
                            <Text fw={600}>Total</Text>
                            <Text fw={600} size="lg" className="text-emerald-600">
                              ₹{order.total}
                            </Text>
                          </Group>
                        </Card>
                      ))}
                    </Stack>
                  )}
                </Paper>
              </Tabs.Panel>

              {/* Cart Tab */}
              <Tabs.Panel value="cart" pt="md">
                <Paper className="p-6" shadow="sm">
                  <Group justify="space-between" mb="md">
                    <Title order={3}>Shopping Cart</Title>
                    {cartItems.length > 0 && (
                      <Button onClick={() => navigate('/checkout')}>
                        Proceed to Checkout
                      </Button>
                    )}
                  </Group>
                  
                  {cartItems.length === 0 ? (
                    <Alert color="blue" variant="light">
                      Your cart is empty. Browse our products to add items!
                    </Alert>
                  ) : (
                    <Stack gap="md">
                      {cartItems.map((item) => (
                        <Card key={item.product_uid} className="border border-gray-200">
                          <Group justify="space-between" align="center">
                            <Group>
                              <Box className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                {item.image_url ? (
                                  <img 
                                    src={item.image_url} 
                                    alt={item.product_name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <IconShoppingBag size={24} className="text-gray-400" />
                                )}
                              </Box>
                              <div>
                                <Text fw={500}>{item.product_name}</Text>
                                <Text size="sm" c="dimmed">₹{item.price} each</Text>
                                <Text size="sm">Quantity: {item.quantity}</Text>
                              </div>
                            </Group>
                            <Group>
                              <Text fw={600} size="lg">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </Text>
                              <ActionIcon 
                                color="red" 
                                variant="light"
                                onClick={() => removeItem(item.product_uid)}
                              >
                                <IconTrash size={16} />
                              </ActionIcon>
                            </Group>
                          </Group>
                        </Card>
                      ))}
                      
                      <Divider />
                      
                      <Group justify="space-between">
                        <Text size="lg" fw={600}>Total</Text>
                        <Text size="xl" fw={700} className="text-emerald-600">
                          ₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                        </Text>
                      </Group>
                    </Stack>
                  )}
                </Paper>
              </Tabs.Panel>
            </Tabs>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default ProfilePage;
