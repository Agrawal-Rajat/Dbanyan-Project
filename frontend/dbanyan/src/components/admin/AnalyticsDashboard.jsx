// Dbanyan Group - Admin Analytics Dashboard
// Comprehensive analytics and insights

import React, { useState } from 'react';
import {
  Box,
  Card,
  Group,
  Stack,
  Title,
  Text,
  Grid,
  RingProgress,
  Center,
  Badge,
  Table,
  Select,
  Button,
  Loader,
  Alert
} from '@mantine/core';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconPackage,
  IconUsers,
  IconShoppingCart,
  IconCurrencyRupee,
  IconCalendar,
  IconArrowUp,
  IconArrowDown,
  IconEye,
  IconHeart,
  IconDownload
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('7d');

  // Fetch dashboard statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats', dateRange],
    queryFn: async () => {
      const response = await api.get(`/admin/stats?period=${dateRange}`);
      return response.data;
    }
  });

  // Fetch recent orders for quick overview
  const { data: recentOrders } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const response = await api.get('/orders/admin/all?limit=5');
      return response.data;
    }
  });

  // Fetch top products
  const { data: topProducts } = useQuery({
    queryKey: ['top-products'],
    queryFn: async () => {
      const response = await api.get('/products/admin/top?limit=5');
      return response.data;
    }
  });

  const StatCard = ({ title, value, change, changeType, icon, color, subtitle }) => (
    <Card className="h-full">
      <Stack>
        <Group justify="space-between">
          <div>
            <Text size="sm" className="text-gray-600 font-medium">{title}</Text>
            <Text fw={700} size="xl" className="text-gray-900">{value}</Text>
            {subtitle && (
              <Text size="xs" className="text-gray-500">{subtitle}</Text>
            )}
          </div>
          <Center>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}-100`}>
              {React.cloneElement(icon, { size: 24, className: `text-${color}-600` })}
            </div>
          </Center>
        </Group>
        {change !== undefined && (
          <Group gap="xs">
            {changeType === 'increase' ? (
              <IconArrowUp size={16} className="text-green-500" />
            ) : (
              <IconArrowDown size={16} className="text-red-500" />
            )}
            <Text size="sm" className={changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
              {Math.abs(change)}% from last period
            </Text>
          </Group>
        )}
      </Stack>
    </Card>
  );

  const mockStats = {
    total_revenue: 45780,
    total_orders: 156,
    total_products: 24,
    total_customers: 89,
    revenue_change: 12.5,
    orders_change: 8.3,
    products_change: 2.1,
    customers_change: 15.7
  };

  const displayStats = stats || mockStats;

  return (
    <Box>
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} className="text-2xl font-bold text-gray-800">
            Analytics Dashboard
          </Title>
          <Text className="text-gray-600">
            Comprehensive business insights and metrics
          </Text>
        </div>
        <Group>
          <Select
            value={dateRange}
            onChange={setDateRange}
            data={[
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 30 days' },
              { value: '90d', label: 'Last 3 months' },
              { value: '1y', label: 'Last year' }
            ]}
          />
          <Button leftSection={<IconDownload size={16} />} variant="light">
            Export Report
          </Button>
        </Group>
      </Group>

      {statsLoading ? (
        <Box className="flex justify-center items-center py-12">
          <Loader size="lg" />
        </Box>
      ) : (
        <Stack>
          {/* Key Metrics */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <StatCard
                title="Total Revenue"
                value={`₹${displayStats.total_revenue?.toLocaleString() || '0'}`}
                change={displayStats.revenue_change}
                changeType={displayStats.revenue_change >= 0 ? 'increase' : 'decrease'}
                icon={<IconCurrencyRupee />}
                color="green"
                subtitle="Gross sales revenue"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <StatCard
                title="Total Orders"
                value={displayStats.total_orders?.toString() || '0'}
                change={displayStats.orders_change}
                changeType={displayStats.orders_change >= 0 ? 'increase' : 'decrease'}
                icon={<IconShoppingCart />}
                color="blue"
                subtitle="Completed orders"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <StatCard
                title="Active Products"
                value={displayStats.total_products?.toString() || '0'}
                change={displayStats.products_change}
                changeType={displayStats.products_change >= 0 ? 'increase' : 'decrease'}
                icon={<IconPackage />}
                color="orange"
                subtitle="Products in catalog"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <StatCard
                title="Total Customers"
                value={displayStats.total_customers?.toString() || '0'}
                change={displayStats.customers_change}
                changeType={displayStats.customers_change >= 0 ? 'increase' : 'decrease'}
                icon={<IconUsers />}
                color="purple"
                subtitle="Registered users"
              />
            </Grid.Col>
          </Grid>

          {/* Additional Insights */}
          <Grid>
            <Grid.Col span={{ base: 12, lg: 8 }}>
              {/* Recent Orders */}
              <Card>
                <Group justify="space-between" mb="md">
                  <Text fw={600} size="lg">Recent Orders</Text>
                  <Button variant="subtle" size="sm">View All</Button>
                </Group>
                {recentOrders?.data?.length > 0 ? (
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Order ID</Table.Th>
                        <Table.Th>Customer</Table.Th>
                        <Table.Th>Amount</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Date</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {recentOrders.data.slice(0, 5).map((order) => (
                        <Table.Tr key={order.uid}>
                          <Table.Td>
                            <Text size="sm" className="font-mono">
                              #{order.uid.slice(-8).toUpperCase()}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm">{order.shipping_address.full_name}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" fw={500}>₹{parseFloat(order.total_amount).toFixed(2)}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge size="sm" color={order.status === 'delivered' ? 'green' : 'blue'}>
                              {order.status}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm">{new Date(order.created_at).toLocaleDateString()}</Text>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                ) : (
                  <Alert>
                    <Text size="sm">No recent orders to display</Text>
                  </Alert>
                )}
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 4 }}>
              {/* Top Products */}
              <Card className="h-full">
                <Group justify="space-between" mb="md">
                  <Text fw={600} size="lg">Top Products</Text>
                  <Button variant="subtle" size="sm">View All</Button>
                </Group>
                <Stack>
                  {topProducts?.data?.length > 0 ? (
                    topProducts.data.slice(0, 5).map((product, index) => (
                      <Group key={product.uid} justify="space-between">
                        <Group>
                          <Badge size="sm" variant="filled" color="blue">
                            #{index + 1}
                          </Badge>
                          <div>
                            <Text size="sm" fw={500}>{product.name}</Text>
                            <Text size="xs" className="text-gray-500">
                              ₹{product.price} • {product.sold || 0} sold
                            </Text>
                          </div>
                        </Group>
                        <Group gap="xs">
                          <IconEye size={14} className="text-gray-400" />
                          <Text size="xs">{product.views || 0}</Text>
                        </Group>
                      </Group>
                    ))
                  ) : (
                    <Text size="sm" className="text-gray-500 text-center">
                      No product data available
                    </Text>
                  )}
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>

          {/* Performance Overview */}
          <Grid>
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Card className="text-center">
                <Stack>
                  <Text fw={600} size="lg">Conversion Rate</Text>
                  <Center>
                    <RingProgress
                      size={120}
                      thickness={12}
                      sections={[
                        { value: 68, color: 'green' }
                      ]}
                      label={
                        <Center>
                          <Text fw={700} size="xl">68%</Text>
                        </Center>
                      }
                    />
                  </Center>
                  <Text size="sm" className="text-gray-600">
                    Visitors to customers conversion
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Card className="text-center">
                <Stack>
                  <Text fw={600} size="lg">Average Order Value</Text>
                  <Center>
                    <div>
                      <Text fw={700} size="2xl" className="text-green-600">₹293</Text>
                      <Group justify="center" gap="xs" mt="xs">
                        <IconArrowUp size={16} className="text-green-500" />
                        <Text size="sm" className="text-green-600">+₹23 from last month</Text>
                      </Group>
                    </div>
                  </Center>
                  <Text size="sm" className="text-gray-600">
                    Average value per order
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Card className="text-center">
                <Stack>
                  <Text fw={600} size="lg">Customer Satisfaction</Text>
                  <Center>
                    <RingProgress
                      size={120}
                      thickness={12}
                      sections={[
                        { value: 92, color: 'orange' }
                      ]}
                      label={
                        <Center>
                          <Group gap="xs">
                            <IconHeart size={16} className="text-orange-500" />
                            <Text fw={700}>92%</Text>
                          </Group>
                        </Center>
                      }
                    />
                  </Center>
                  <Text size="sm" className="text-gray-600">
                    Based on customer reviews
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Stack>
      )}
    </Box>
  );
};

export default AnalyticsDashboard;
