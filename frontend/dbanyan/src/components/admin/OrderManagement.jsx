// Dbanyan Group - Admin Order Management Component
// Complete order tracking and management system

import React, { useState } from 'react';
import {
  Box,
  Card,
  Group,
  Stack,
  Title,
  Text,
  Table,
  Badge,
  ActionIcon,
  Modal,
  Select,
  TextInput,
  Pagination,
  Menu,
  Loader,
  Alert
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconEye,
  IconTruck,
  IconCheck,
  IconX,
  IconDots,
  IconSearch,
  IconPackage,
  IconCreditCard,
  IconUser
} from '@tabler/icons-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';

const OrderManagement = () => {
  const queryClient = useQueryClient();
  const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch orders with filtering
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['admin-orders', currentPage, statusFilter, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit: pageSize,
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchQuery && { search: searchQuery })
      });
      const response = await api.get(`/orders/admin/all?${params}`);
      return response.data;
    },
    keepPreviousData: true
  });

  // Update order status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status, tracking_number }) => {
      const response = await api.put(`/orders/admin/${orderId}/status`, {
        status,
        tracking_number
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-orders']);
      notifications.show({
        title: 'Success',
        message: 'Order status updated successfully',
        color: 'green',
        icon: <IconCheck size={16} />
      });
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.detail || 'Failed to update order status',
        color: 'red',
        icon: <IconX size={16} />
      });
    }
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    openDetails();
  };

  const handleStatusUpdate = (orderId, newStatus, trackingNumber = null) => {
    updateStatusMutation.mutate({
      orderId,
      status: newStatus,
      tracking_number: trackingNumber
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'yellow',
      confirmed: 'blue',
      processing: 'orange',
      shipped: 'cyan',
      delivered: 'green',
      cancelled: 'red',
      refunded: 'gray'
    };
    return colors[status] || 'gray';
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: 'yellow',
      completed: 'green',
      failed: 'red',
      refunded: 'gray'
    };
    return colors[status] || 'gray';
  };

  const orders = ordersData?.data || [];
  const totalPages = Math.ceil((ordersData?.total || 0) / pageSize);

  return (
    <Box>
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} className="text-2xl font-bold text-gray-800">
            Order Management
          </Title>
          <Text className="text-gray-600">
            Track and manage customer orders
          </Text>
        </div>
      </Group>

      {/* Filters */}
      <Card className="mb-6" p="md">
        <Group>
          <TextInput
            placeholder="Search orders by email or ID..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            className="flex-1"
          />
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value || 'all')}
            data={[
              { value: 'all', label: 'All Orders' },
              { value: 'pending', label: 'Pending' },
              { value: 'confirmed', label: 'Confirmed' },
              { value: 'processing', label: 'Processing' },
              { value: 'shipped', label: 'Shipped' },
              { value: 'delivered', label: 'Delivered' },
              { value: 'cancelled', label: 'Cancelled' }
            ]}
            clearable
          />
        </Group>
      </Card>

      {/* Orders Table */}
      <Card>
        {isLoading ? (
          <Box className="flex justify-center items-center py-12">
            <Loader size="lg" />
          </Box>
        ) : orders.length === 0 ? (
          <Box className="text-center py-12">
            <Text className="text-gray-500">No orders found</Text>
          </Box>
        ) : (
          <>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Order ID</Table.Th>
                  <Table.Th>Customer</Table.Th>
                  <Table.Th>Items</Table.Th>
                  <Table.Th>Total</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Payment</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {orders.map((order) => (
                  <Table.Tr key={order.uid}>
                    <Table.Td>
                      <Text fw={500} className="font-mono text-sm">
                        #{order.uid.slice(-8).toUpperCase()}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <div>
                        <Text fw={500}>{order.shipping_address.full_name}</Text>
                        <Text size="sm" className="text-gray-500">
                          {order.customer_email}
                        </Text>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Text>{order.items.length} item(s)</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={500}>₹{parseFloat(order.total_amount).toFixed(2)}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={getStatusColor(order.status)} variant="filled">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={getPaymentStatusColor(order.payment_status)} variant="outline">
                        {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">
                        {new Date(order.created_at).toLocaleDateString()}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Menu shadow="md" width={160}>
                        <Menu.Target>
                          <ActionIcon variant="subtle">
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<IconEye size={14} />}
                            onClick={() => handleViewOrder(order)}
                          >
                            View Details
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconCheck size={14} />}
                            onClick={() => handleStatusUpdate(order.uid, 'confirmed')}
                            disabled={order.status !== 'pending'}
                          >
                            Confirm Order
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconTruck size={14} />}
                            onClick={() => {
                              const tracking = prompt('Enter tracking number:');
                              if (tracking) {
                                handleStatusUpdate(order.uid, 'shipped', tracking);
                              }
                            }}
                            disabled={!['confirmed', 'processing'].includes(order.status)}
                          >
                            Mark Shipped
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconX size={14} />}
                            color="red"
                            onClick={() => handleStatusUpdate(order.uid, 'cancelled')}
                            disabled={['shipped', 'delivered', 'cancelled'].includes(order.status)}
                          >
                            Cancel Order
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

      {/* Order Details Modal */}
      <Modal
        opened={detailsOpened}
        onClose={closeDetails}
        title="Order Details"
        size="lg"
      >
        {selectedOrder && (
          <Stack>
            {/* Order Info */}
            <Card className="bg-gray-50">
              <Group justify="space-between" align="start">
                <div>
                  <Text fw={600} className="text-lg">
                    Order #{selectedOrder.uid.slice(-8).toUpperCase()}
                  </Text>
                  <Text size="sm" className="text-gray-600">
                    Created: {new Date(selectedOrder.created_at).toLocaleString()}
                  </Text>
                </div>
                <Group>
                  <Badge color={getStatusColor(selectedOrder.status)} size="lg">
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                  <Badge color={getPaymentStatusColor(selectedOrder.payment_status)} variant="outline">
                    {selectedOrder.payment_status.charAt(0).toUpperCase() + selectedOrder.payment_status.slice(1)}
                  </Badge>
                </Group>
              </Group>
            </Card>

            {/* Customer & Shipping */}
            <Group grow align="start">
              <Card>
                <Stack>
                  <Group>
                    <IconUser size={16} />
                    <Text fw={500}>Customer Information</Text>
                  </Group>
                  <div>
                    <Text fw={500}>{selectedOrder.shipping_address.full_name}</Text>
                    <Text size="sm">{selectedOrder.customer_email}</Text>
                    <Text size="sm">{selectedOrder.shipping_address.phone}</Text>
                  </div>
                </Stack>
              </Card>

              <Card>
                <Stack>
                  <Group>
                    <IconTruck size={16} />
                    <Text fw={500}>Shipping Address</Text>
                  </Group>
                  <div>
                    <Text size="sm">{selectedOrder.shipping_address.address_line_1}</Text>
                    {selectedOrder.shipping_address.address_line_2 && (
                      <Text size="sm">{selectedOrder.shipping_address.address_line_2}</Text>
                    )}
                    <Text size="sm">
                      {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} {selectedOrder.shipping_address.postal_code}
                    </Text>
                    <Text size="sm">{selectedOrder.shipping_address.country}</Text>
                  </div>
                </Stack>
              </Card>
            </Group>

            {/* Order Items */}
            <Card>
              <Stack>
                <Group>
                  <IconPackage size={16} />
                  <Text fw={500}>Order Items</Text>
                </Group>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Product</Table.Th>
                      <Table.Th>Quantity</Table.Th>
                      <Table.Th>Unit Price</Table.Th>
                      <Table.Th>Total</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedOrder.items.map((item, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>{item.product_name}</Table.Td>
                        <Table.Td>{item.quantity}</Table.Td>
                        <Table.Td>₹{parseFloat(item.unit_price).toFixed(2)}</Table.Td>
                        <Table.Td>₹{parseFloat(item.total_price).toFixed(2)}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Stack>
            </Card>

            {/* Order Summary */}
            <Card>
              <Stack>
                <Group>
                  <IconCreditCard size={16} />
                  <Text fw={500}>Order Summary</Text>
                </Group>
                <Group justify="space-between">
                  <Text>Subtotal:</Text>
                  <Text>₹{parseFloat(selectedOrder.subtotal).toFixed(2)}</Text>
                </Group>
                {selectedOrder.discount_amount > 0 && (
                  <Group justify="space-between">
                    <Text>Discount:</Text>
                    <Text className="text-green-600">-₹{parseFloat(selectedOrder.discount_amount).toFixed(2)}</Text>
                  </Group>
                )}
                <Group justify="space-between">
                  <Text>Shipping:</Text>
                  <Text>₹{parseFloat(selectedOrder.shipping_cost).toFixed(2)}</Text>
                </Group>
                <Group justify="space-between">
                  <Text>Tax:</Text>
                  <Text>₹{parseFloat(selectedOrder.tax_amount).toFixed(2)}</Text>
                </Group>
                <Group justify="space-between" className="pt-2 border-t">
                  <Text fw={600} size="lg">Total:</Text>
                  <Text fw={600} size="lg">₹{parseFloat(selectedOrder.total_amount).toFixed(2)}</Text>
                </Group>
              </Stack>
            </Card>

            {/* Tracking Info */}
            {selectedOrder.tracking_number && (
              <Alert icon={<IconTruck size={16} />} title="Tracking Information">
                Tracking Number: <Text component="span" fw={500}>{selectedOrder.tracking_number}</Text>
              </Alert>
            )}

            {/* Notes */}
            {selectedOrder.notes && (
              <Card>
                <Text fw={500} mb="xs">Order Notes:</Text>
                <Text size="sm">{selectedOrder.notes}</Text>
              </Card>
            )}
          </Stack>
        )}
      </Modal>
    </Box>
  );
};

export default OrderManagement;
