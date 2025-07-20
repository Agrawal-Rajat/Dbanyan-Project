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
  IconSettings
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useAuthStore } from '../store';
import { useProducts } from '../api';
import ModernNavBar from '../components/layout/ModernNavBar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // API hooks
  const { data: products, isLoading, refetch } = useProducts();

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

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

  // Mock stats data
  const stats = [
    { 
      title: 'Total Products', 
      value: products?.data?.length || 4, 
      icon: IconPackage, 
      color: 'blue' 
    },
    { 
      title: 'Total Orders', 
      value: '142', 
      icon: IconShoppingCart, 
      color: 'green' 
    },
    { 
      title: 'Total Customers', 
      value: '89', 
      icon: IconUsers, 
      color: 'violet' 
    },
    { 
      title: 'Revenue', 
      value: '₹45,280', 
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

      <ModernNavBar />

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
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="products">Products</Tabs.Tab>
              <Tabs.Tab value="orders">Orders</Tabs.Tab>
              <Tabs.Tab value="customers">Customers</Tabs.Tab>
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

            {/* Products Tab */}
            <Tabs.Panel value="products" className="mt-6">
              <Card shadow="sm" padding="lg" radius="md">
                <Group justify="space-between" className="mb-6">
                  <Title order={3} className="text-gray-800">
                    Product Management
                  </Title>
                  <Button 
                    leftSection={<IconPlus size={16} />}
                    onClick={() => {
                      setEditingProduct(null);
                      form.reset();
                      setModalOpen(true);
                    }}
                  >
                    Add Product
                  </Button>
                </Group>

                <Box className="overflow-x-auto">
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Product</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>Stock</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Actions</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {displayProducts.map((product) => (
                        <Table.Tr key={product.uid}>
                          <Table.Td>
                            <Box>
                              <Text className="font-medium">{product.name}</Text>
                              <Text size="sm" className="text-gray-600">
                                {product.short_description}
                              </Text>
                            </Box>
                          </Table.Td>
                          <Table.Td>
                            <Badge variant="light" color="blue">
                              {product.category}
                            </Badge>
                          </Table.Td>
                          <Table.Td>₹{product.price}</Table.Td>
                          <Table.Td>
                            <Badge 
                              variant="light" 
                              color={product.quantity > 10 ? 'green' : product.quantity > 0 ? 'yellow' : 'red'}
                            >
                              {product.quantity}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Badge 
                              variant="light" 
                              color={product.is_active ? 'green' : 'red'}
                            >
                              {product.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <ActionIcon 
                                variant="light" 
                                color="blue"
                                onClick={() => handleEdit(product)}
                              >
                                <IconEdit size={16} />
                              </ActionIcon>
                              <ActionIcon 
                                variant="light" 
                                color="red"
                                onClick={() => handleDelete(product.uid)}
                              >
                                <IconTrash size={16} />
                              </ActionIcon>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Box>
              </Card>
            </Tabs.Panel>

            {/* Orders Tab */}
            <Tabs.Panel value="orders" className="mt-6">
              <Card shadow="sm" padding="lg" radius="md">
                <Title order={3} className="text-gray-800 mb-6">
                  Order Management
                </Title>
                <Alert color="blue" variant="light">
                  Order management system will be implemented in the next phase.
                </Alert>
              </Card>
            </Tabs.Panel>

            {/* Customers Tab */}
            <Tabs.Panel value="customers" className="mt-6">
              <Card shadow="sm" padding="lg" radius="md">
                <Title order={3} className="text-gray-800 mb-6">
                  Customer Management
                </Title>
                <Alert color="blue" variant="light">
                  Customer management system will be implemented in the next phase.
                </Alert>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Box>

      {/* Product Modal */}
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
