// Dbanyan Group - Admin Dashboard
// Modern admin panel for inventory management

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Container, 
  Grid,
  Card, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack,
  Table,
  Badge,
  ActionIcon,
  Modal,
  TextInput,
  NumberInput,
  Textarea,
  Select,
  Box,
  Alert,
  Loader,
  Tabs
} from '@mantine/core';
import { 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconEye,
  IconPackage,
  IconUsers,
  IconShoppingCart,
  IconTrendingUp,
  IconLogout,
  IconSettings,
  IconMail,
  IconChartBar
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useUserStore } from '../store';
import { useProducts } from '../hooks/useProducts';
import { api } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import UserManagement from '../components/admin/UserManagement';
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, logout } = useUserStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // API hooks
  const { data: products, isLoading, refetch } = useProducts();
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const response = await api.get('/orders/admin/all');
      return response.data;
    },
    enabled: !!user && user.role === 'admin',
    retry: 2
  });
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const response = await api.get('/auth/admin/users');
      return response.data;
    },
    enabled: !!user && user.role === 'admin' && !!localStorage.getItem('auth_token'),
    retry: false // Don't retry failed requests
  });
  const { data: orderStats } = useQuery({
    queryKey: ['admin-order-stats'],
    queryFn: async () => {
      const response = await api.get('/orders/admin/stats');
      return response.data;
    },
    enabled: !!user && user.role === 'admin' && !!localStorage.getItem('auth_token'),
    retry: false
  });
  const { data: userStats } = useQuery({
    queryKey: ['admin-user-stats'],
    queryFn: async () => {
      const response = await api.get('/auth/admin/stats');
      return response.data;
    },
    enabled: !!user && user.role === 'admin' && !!localStorage.getItem('auth_token'),
    retry: false
  });

  // Check if user is admin
  useEffect(() => {
    // Only redirect if we're sure auth is loaded and user is not admin
    if (!authLoading) {
      if (!user) {
        navigate('/login');
      } else if (user.role !== 'admin') {
        navigate('/login');
      }
    }
  }, [user, authLoading, navigate]);

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size="xl" />
      </Box>
    );
  }

  // Product form
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      short_description: '',
      price: 0,
      compare_at_price: 0,
      quantity: 0,
      category: 'powder',
      weight: '',
      ingredients: '',
      benefits: '',
      usage_instructions: ''
    },
    validate: {
      name: (value) => value.length < 1 ? 'Name is required' : null,
      description: (value) => value.length < 10 ? 'Description must be at least 10 characters' : null,
      price: (value) => value <= 0 ? 'Price must be greater than 0' : null,
      quantity: (value) => value < 0 ? 'Quantity cannot be negative' : null
    }
  });

  const handleSubmit = async (values) => {
    try {
      const productData = {
        ...values,
        ingredients: values.ingredients.split(',').map(i => i.trim()).filter(Boolean),
        benefits: values.benefits.split(',').map(b => b.trim()).filter(Boolean)
      };

      // This would call the backend API
      console.log('Saving product:', productData);
      
      setModalOpen(false);
      setEditingProduct(null);
      form.reset();
      refetch();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setValues({
      ...product,
      ingredients: product.ingredients?.join(', ') || '',
      benefits: product.benefits?.join(', ') || ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        console.log('Deleting product:', productId);
        refetch();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Calculate statistics from real data
  const stats = [
    { 
      title: 'Total Products', 
      value: products?.data?.length || 0, 
      icon: IconPackage, 
      color: 'blue' 
    },
    { 
      title: 'Total Orders', 
      value: orderStats?.total_orders || 0, 
      icon: IconShoppingCart, 
      color: 'green' 
    },
    { 
      title: 'Total Users', 
      value: userStats?.total_users || 0, 
      icon: IconUsers, 
      color: 'violet' 
    },
    { 
      title: 'Revenue', 
      value: orderStats?.total_revenue ? `₹${orderStats.total_revenue.toFixed(2)}` : '₹0.00', 
      icon: IconTrendingUp, 
      color: 'orange' 
    }
  ];

  // Mock products if no API data
  const mockProducts = [
    {
      uid: '1',
      name: 'Organic Moringa Powder',
      short_description: 'Pure, nutrient-rich powder',
      category: 'powder',
      price: 299,
      quantity: 50,
      is_active: true
    },
    {
      uid: '2',
      name: 'Moringa Capsules',
      short_description: 'Convenient daily supplement',
      category: 'capsules',
      price: 449,
      quantity: 30,
      is_active: true
    }
  ];

  const displayProducts = products?.data || mockProducts;

  if (!user || user.role !== 'admin') {
    return <Loader size="xl" className="h-screen flex items-center justify-center" />;
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Dbanyan Group</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>



      <Box className="min-h-screen bg-gray-50">
        {/* Header */}
        <Box className="bg-white border-b border-gray-200">
          <Container size="xl" className="py-6">
            <Group justify="space-between">
              <Box>
                <Title 
                  order={2} 
                  className="text-gray-800 font-bold"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  Admin Dashboard
                </Title>
                <Text className="text-gray-600">
                  Welcome back, {user?.full_name || 'Admin'}
                </Text>
              </Box>
              <Group gap="md">
                <Button 
                  variant="light" 
                  leftSection={<IconSettings size={16} />}
                >
                  Settings
                </Button>
                <Button 
                  color="red" 
                  variant="light"
                  leftSection={<IconLogout size={16} />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Group>
            </Group>
          </Container>
        </Box>

        <Container size="xl" className="py-8">
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab 
                value="overview" 
                leftSection={<IconTrendingUp size={16} />}
              >
                Overview
              </Tabs.Tab>
              <Tabs.Tab 
                value="analytics" 
                leftSection={<IconChartBar size={16} />}
              >
                Analytics
              </Tabs.Tab>
              <Tabs.Tab 
                value="products" 
                leftSection={<IconPackage size={16} />}
              >
                Products
              </Tabs.Tab>
              <Tabs.Tab 
                value="orders" 
                leftSection={<IconShoppingCart size={16} />}
              >
                Orders
              </Tabs.Tab>
              <Tabs.Tab 
                value="customers" 
                leftSection={<IconUsers size={16} />}
              >
                Customers
              </Tabs.Tab>
            </Tabs.List>

            {/* Overview Tab */}
            <Tabs.Panel value="overview" className="mt-6">
              <Grid gutter="lg">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 3 }}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card shadow="sm" padding="lg" radius="md">
                          <Group justify="space-between">
                            <Stack gap="xs">
                              <Text size="sm" className="text-gray-600">
                                {stat.title}
                              </Text>
                              <Title order={2} className="text-gray-800">
                                {stat.value}
                              </Title>
                            </Stack>
                            <Box className="p-3 rounded-lg bg-blue-50">
                              <Icon size={24} className="text-blue-600" />
                            </Box>
                          </Group>
                        </Card>
                      </motion.div>
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Tabs.Panel>

            {/* Analytics Tab */}
            <Tabs.Panel value="analytics" className="mt-6">
              <AnalyticsDashboard />
            </Tabs.Panel>

            {/* Products Tab */}
            <Tabs.Panel value="products" className="mt-6">
              <ProductManagement />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Box>

      {/* Legacy Product Modal - Keeping for backward compatibility */}
      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
          form.reset();
        }}
        title={editingProduct ? "Edit Product" : "Add New Product"}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Product Name"
              placeholder="Enter product name"
              required
              {...form.getInputProps('name')}
            />

            <Grid>
              <Grid.Col span={6}>
                <Select
                  label="Category"
                  data={[
                    { value: 'powder', label: 'Powder' },
                    { value: 'capsules', label: 'Capsules' },
                    { value: 'tea', label: 'Tea' },
                    { value: 'oil', label: 'Oil' }
                  ]}
                  {...form.getInputProps('category')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Weight/Size"
                  placeholder="e.g., 100g, 60 capsules"
                  {...form.getInputProps('weight')}
                />
              </Grid.Col>
            </Grid>

            <Textarea
              label="Short Description"
              placeholder="Brief product description"
              minRows={2}
              required
              {...form.getInputProps('short_description')}
            />

            <Textarea
              label="Full Description"
              placeholder="Detailed product description"
              minRows={3}
              required
              {...form.getInputProps('description')}
            />

            <Grid>
              <Grid.Col span={4}>
                <NumberInput
                  label="Price (₹)"
                  placeholder="0"
                  min={0}
                  required
                  {...form.getInputProps('price')}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  label="Compare Price (₹)"
                  placeholder="0"
                  min={0}
                  {...form.getInputProps('compare_at_price')}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  label="Stock Quantity"
                  placeholder="0"
                  min={0}
                  required
                  {...form.getInputProps('quantity')}
                />
              </Grid.Col>
            </Grid>

            <TextInput
              label="Ingredients"
              placeholder="Comma-separated list of ingredients"
              {...form.getInputProps('ingredients')}
            />

            <TextInput
              label="Benefits"
              placeholder="Comma-separated list of benefits"
              {...form.getInputProps('benefits')}
            />

            <Textarea
              label="Usage Instructions"
              placeholder="How to use this product"
              minRows={2}
              {...form.getInputProps('usage_instructions')}
            />

            <Group justify="flex-end" gap="md">
              <Button 
                variant="light" 
                onClick={() => {
                  setModalOpen(false);
                  setEditingProduct(null);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default AdminDashboard;
