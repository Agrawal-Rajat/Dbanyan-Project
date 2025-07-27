// Dbanyan Group - Admin Product Management Component
// Complete CRUD operations for product inventory

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Group,
  Stack,
  Title,
  Text,
  Table,
  Badge,
  ActionIcon,
  Modal,
  TextInput,
  NumberInput,
  Textarea,
  Select,
  Switch,
  Loader,
  Pagination,
  Menu
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconSearch,
  IconFilter,
  IconDots,
  IconPhoto,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';

const ProductManagement = () => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch products with pagination and search
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['admin-products', currentPage, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit: pageSize,
        ...(searchQuery && { search: searchQuery })
      });
      const response = await api.get(`/products/?${params}`);
      return response.data;
    },
    keepPreviousData: true
  });

  // Product form
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      short_description: '',
      category: 'powder',
      price: 0,
      compare_at_price: 0,
      quantity: 0,
      weight: '',
      ingredients: '',
      benefits: '',
      usage_instructions: '',
      is_active: true,
      is_featured: false,
      seo_title: '',
      seo_description: ''
    },
    validate: {
      name: (value) => value.length < 1 ? 'Name is required' : null,
      description: (value) => value.length < 10 ? 'Description must be at least 10 characters' : null,
      price: (value) => value <= 0 ? 'Price must be greater than 0' : null,
      quantity: (value) => value < 0 ? 'Quantity cannot be negative' : null
    }
  });

  // Create/Update product mutation
  const saveProductMutation = useMutation({
    mutationFn: async (productData) => {
      const formattedData = {
        ...productData,
        ingredients: productData.ingredients.split(',').map(i => i.trim()).filter(Boolean),
        benefits: productData.benefits.split(',').map(b => b.trim()).filter(Boolean)
      };

      if (editingProduct) {
        const response = await api.put(`/products/${editingProduct.uid}`, formattedData);
        return response.data;
      } else {
        const response = await api.post('/products/', formattedData);
        return response.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products']);
      notifications.show({
        title: 'Success',
        message: `Product ${editingProduct ? 'updated' : 'created'} successfully`,
        color: 'green',
        icon: <IconCheck size={16} />
      });
      handleCloseModal();
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.detail || 'Failed to save product',
        color: 'red',
        icon: <IconX size={16} />
      });
    }
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (productId) => {
      await api.delete(`/products/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products']);
      notifications.show({
        title: 'Success',
        message: 'Product deleted successfully',
        color: 'green',
        icon: <IconCheck size={16} />
      });
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.detail || 'Failed to delete product',
        color: 'red',
        icon: <IconX size={16} />
      });
    }
  });

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      form.setValues({
        ...product,
        ingredients: product.ingredients?.join(', ') || '',
        benefits: product.benefits?.join(', ') || ''
      });
    } else {
      form.reset();
    }
    open();
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    form.reset();
    close();
  };

  const handleSubmit = (values) => {
    saveProductMutation.mutate(values);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(productId);
    }
  };

  const products = productsData?.data || [];
  const totalPages = Math.ceil((productsData?.total || 0) / pageSize);

  return (
    <Box>
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} className="text-2xl font-bold text-gray-800">
            Product Management
          </Title>
          <Text className="text-gray-600">
            Manage your product inventory and details
          </Text>
        </div>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => handleOpenModal()}
          className="bg-green-600 hover:bg-green-700"
        >
          Add Product
        </Button>
      </Group>

      {/* Search and Filters */}
      <Card className="mb-6" p="md">
        <Group>
          <TextInput
            placeholder="Search products..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            className="flex-1"
          />
          <Button variant="light" leftSection={<IconFilter size={16} />}>
            Filter
          </Button>
        </Group>
      </Card>

      {/* Products Table */}
      <Card>
        {isLoading ? (
          <Box className="flex justify-center items-center py-12">
            <Loader size="lg" />
          </Box>
        ) : products.length === 0 ? (
          <Box className="text-center py-12">
            <Text className="text-gray-500">No products found</Text>
          </Box>
        ) : (
          <>
            <Table striped highlightOnHover>
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
                {products.map((product) => (
                  <Table.Tr key={product.uid}>
                    <Table.Td>
                      <Group>
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <IconPhoto size={16} className="text-gray-400" />
                        </div>
                        <div>
                          <Text fw={500} className="text-gray-800">
                            {product.name}
                          </Text>
                          <Text size="sm" className="text-gray-500">
                            {product.short_description}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="light" className="capitalize">
                        {product.category}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group>
                        <Text fw={500}>₹{product.price}</Text>
                        {product.compare_at_price && (
                          <Text size="sm" td="line-through" className="text-gray-400">
                            ₹{product.compare_at_price}
                          </Text>
                        )}
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Badge 
                        color={product.quantity > 10 ? 'green' : product.quantity > 0 ? 'yellow' : 'red'}
                        variant="filled"
                      >
                        {product.quantity} units
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge 
                        color={product.is_active ? 'green' : 'gray'}
                        variant="filled"
                      >
                        {product.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Menu shadow="md" width={120}>
                        <Menu.Target>
                          <ActionIcon variant="subtle">
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<IconEye size={14} />}
                            onClick={() => window.open(`/products/${product.uid}`, '_blank')}
                          >
                            View
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconEdit size={14} />}
                            onClick={() => handleOpenModal(product)}
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconTrash size={14} />}
                            color="red"
                            onClick={() => handleDelete(product.uid)}
                          >
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <Group justify="center" mt="md">
                <Pagination
                  value={currentPage}
                  onChange={setCurrentPage}
                  total={totalPages}
                />
              </Group>
            )}
          </>
        )}
      </Card>

      {/* Product Form Modal */}
      <Modal
        opened={opened}
        onClose={handleCloseModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Group grow>
              <TextInput
                label="Product Name"
                placeholder="Enter product name"
                required
                {...form.getInputProps('name')}
              />
              <Select
                label="Category"
                placeholder="Select category"
                required
                data={[
                  { value: 'powder', label: 'Powder' },
                  { value: 'capsules', label: 'Capsules' },
                  { value: 'paste', label: 'Paste' },
                  { value: 'tea', label: 'Tea' },
                  { value: 'oil', label: 'Oil' },
                  { value: 'fresh', label: 'Fresh' }
                ]}
                {...form.getInputProps('category')}
              />
            </Group>

            <Textarea
              label="Description"
              placeholder="Enter detailed product description"
              required
              minRows={3}
              {...form.getInputProps('description')}
            />

            <TextInput
              label="Short Description"
              placeholder="Brief product description"
              required
              {...form.getInputProps('short_description')}
            />

            <Group grow>
              <NumberInput
                label="Price (₹)"
                placeholder="0.00"
                min={0}
                step={0.01}
                required
                {...form.getInputProps('price')}
              />
              <NumberInput
                label="Compare at Price (₹)"
                placeholder="0.00"
                min={0}
                step={0.01}
                {...form.getInputProps('compare_at_price')}
              />
            </Group>

            <Group grow>
              <NumberInput
                label="Stock Quantity"
                placeholder="0"
                min={0}
                required
                {...form.getInputProps('quantity')}
              />
              <TextInput
                label="Weight/Size"
                placeholder="e.g., 100g, 60 capsules"
                {...form.getInputProps('weight')}
              />
            </Group>

            <TextInput
              label="Ingredients (comma separated)"
              placeholder="Ingredient 1, Ingredient 2, ..."
              {...form.getInputProps('ingredients')}
            />

            <TextInput
              label="Benefits (comma separated)"
              placeholder="Benefit 1, Benefit 2, ..."
              {...form.getInputProps('benefits')}
            />

            <Textarea
              label="Usage Instructions"
              placeholder="How to use this product"
              minRows={2}
              {...form.getInputProps('usage_instructions')}
            />

            <Group grow>
              <Switch
                label="Active Product"
                description="Product will be visible to customers"
                {...form.getInputProps('is_active', { type: 'checkbox' })}
              />
              <Switch
                label="Featured Product"
                description="Product will appear in featured section"
                {...form.getInputProps('is_featured', { type: 'checkbox' })}
              />
            </Group>

            <Group grow>
              <TextInput
                label="SEO Title"
                placeholder="SEO optimized title"
                {...form.getInputProps('seo_title')}
              />
            </Group>

            <Textarea
              label="SEO Description"
              placeholder="Meta description for search engines"
              {...form.getInputProps('seo_description')}
            />

            <Group justify="flex-end" mt="md">
              <Button variant="subtle" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                loading={saveProductMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
};

export default ProductManagement;
