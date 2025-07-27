// Dbanyan Group - Admin User Management Component
// User management and analytics

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
  Button,
  ActionIcon,
  Modal,
  TextInput,
  Select,
  Pagination,
  Menu,
  Loader,
  Alert,
  Tabs,
  Grid,
  RingProgress,
  Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconUser,
  IconUsers,
  IconEye,
  IconEdit,
  IconTrash,
  IconMail,
  IconPhone,
  IconCalendar,
  IconSearch,
  IconShieldCheck,
  IconBan,
  IconDots,
  IconPlus,
  IconTrendingUp,
  IconUserCheck
} from '@tabler/icons-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';

const UserManagement = () => {
  const queryClient = useQueryClient();
  const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [activeTab, setActiveTab] = useState('users');

  // Fetch users with filtering
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['admin-users', currentPage, roleFilter, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit: pageSize,
        ...(roleFilter !== 'all' && { role: roleFilter }),
        ...(searchQuery && { search: searchQuery })
      });
      const response = await api.get(`/auth/admin/users?${params}`);
      return response.data;
    },
    keepPreviousData: true
  });

  // Fetch user statistics
  const { data: userStats } = useQuery({
    queryKey: ['admin-user-stats'],
    queryFn: async () => {
      const response = await api.get('/auth/admin/stats');
      return response.data;
    }
  });

  // Update user role mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, updates }) => {
      const response = await api.put(`/auth/admin/users/${userId}`, updates);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-users']);
      queryClient.invalidateQueries(['admin-user-stats']);
      notifications.show({
        title: 'Success',
        message: 'User updated successfully',
        color: 'green'
      });
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.detail || 'Failed to update user',
        color: 'red'
      });
    }
  });

  const handleViewUser = (user) => {
    setSelectedUser(user);
    openDetails();
  };

  const handleRoleUpdate = (userId, newRole) => {
    updateUserMutation.mutate({
      userId,
      updates: { role: newRole }
    });
  };

  const handleToggleActive = (userId, isActive) => {
    updateUserMutation.mutate({
      userId,
      updates: { is_active: !isActive }
    });
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'red',
      customer: 'blue',
      guest: 'gray'
    };
    return colors[role] || 'gray';
  };

  const users = usersData?.data || [];
  const totalPages = Math.ceil((usersData?.total || 0) / pageSize);

  const StatCard = ({ title, value, icon, color, description }) => (
    <Card className="text-center">
      <Stack>
        <Center>
          <RingProgress
            size={80}
            thickness={6}
            sections={[{ value: 100, color }]}
            label={
              <Center>
                {React.cloneElement(icon, { size: 24, color })}
              </Center>
            }
          />
        </Center>
        <div>
          <Text fw={700} size="xl">{value}</Text>
          <Text fw={500} size="sm">{title}</Text>
          {description && (
            <Text size="xs" className="text-gray-500">{description}</Text>
          )}
        </div>
      </Stack>
    </Card>
  );

  return (
    <Box>
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} className="text-2xl font-bold text-gray-800">
            User Management
          </Title>
          <Text className="text-gray-600">
            Manage users and analyze user activity
          </Text>
        </div>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="analytics" leftSection={<IconTrendingUp size={16} />}>
            Analytics
          </Tabs.Tab>
          <Tabs.Tab value="users" leftSection={<IconUsers size={16} />}>
            Users
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="analytics" pt="md">
          {/* User Statistics */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatCard
                title="Total Users"
                value={userStats?.total_users || 0}
                icon={<IconUsers />}
                color="blue"
                description="All registered users"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatCard
                title="Active Users"
                value={userStats?.active_users || 0}
                icon={<IconUserCheck />}
                color="green"
                description="Currently active"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatCard
                title="New This Month"
                value={userStats?.new_users_this_month || 0}
                icon={<IconPlus />}
                color="orange"
                description="Recent registrations"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatCard
                title="Admins"
                value={userStats?.admin_users || 0}
                icon={<IconShieldCheck />}
                color="red"
                description="Administrator accounts"
              />
            </Grid.Col>
          </Grid>

          {/* Recent Activity */}
          <Card mt="xl">
            <Title order={3} mb="md">Recent User Activity</Title>
            <Text className="text-gray-500">
              Detailed analytics and user behavior insights will be displayed here.
            </Text>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="users" pt="md">
          {/* Filters */}
          <Card className="mb-6" p="md">
            <Group>
              <TextInput
                placeholder="Search users by name or email..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                className="flex-1"
              />
              <Select
                placeholder="Filter by role"
                value={roleFilter}
                onChange={(value) => setRoleFilter(value || 'all')}
                data={[
                  { value: 'all', label: 'All Roles' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'customer', label: 'Customer' },
                  { value: 'guest', label: 'Guest' }
                ]}
                clearable
              />
            </Group>
          </Card>

          {/* Users Table */}
          <Card>
            {isLoading ? (
              <Box className="flex justify-center items-center py-12">
                <Loader size="lg" />
              </Box>
            ) : users.length === 0 ? (
              <Box className="text-center py-12">
                <Text className="text-gray-500">No users found</Text>
              </Box>
            ) : (
              <>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>User</Table.Th>
                      <Table.Th>Role</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Joined</Table.Th>
                      <Table.Th>Last Login</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {users.map((user) => (
                      <Table.Tr key={user.uid}>
                        <Table.Td>
                          <Group>
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <IconUser size={16} className="text-gray-400" />
                            </div>
                            <div>
                              <Text fw={500} className="text-gray-800">
                                {user.full_name}
                              </Text>
                              <Text size="sm" className="text-gray-500">
                                {user.email}
                              </Text>
                            </div>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Badge color={getRoleColor(user.role)} variant="filled">
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Badge color={user.is_active ? 'green' : 'red'} variant="outline">
                            {user.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">
                            {new Date(user.created_at).toLocaleDateString()}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">
                            {user.last_login 
                              ? new Date(user.last_login).toLocaleDateString()
                              : 'Never'
                            }
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
                                onClick={() => handleViewUser(user)}
                              >
                                View Details
                              </Menu.Item>
                              <Menu.Item
                                leftSection={<IconShieldCheck size={14} />}
                                onClick={() => handleRoleUpdate(user.uid, user.role === 'admin' ? 'customer' : 'admin')}
                                disabled={user.email === 'devanshu@gmail.com'} // Protect main admin
                              >
                                {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                              </Menu.Item>
                              <Menu.Item
                                leftSection={user.is_active ? <IconBan size={14} /> : <IconUserCheck size={14} />}
                                onClick={() => handleToggleActive(user.uid, user.is_active)}
                                color={user.is_active ? 'red' : 'green'}
                                disabled={user.email === 'devanshu@gmail.com'} // Protect main admin
                              >
                                {user.is_active ? 'Deactivate' : 'Activate'}
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
        </Tabs.Panel>
      </Tabs>

      {/* User Details Modal */}
      <Modal
        opened={detailsOpened}
        onClose={closeDetails}
        title="User Details"
        size="md"
      >
        {selectedUser && (
          <Stack>
            {/* User Info */}
            <Card className="bg-gray-50">
              <Group>
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <IconUser size={24} className="text-gray-500" />
                </div>
                <div className="flex-1">
                  <Text fw={600} size="lg">{selectedUser.full_name}</Text>
                  <Text size="sm" className="text-gray-600">{selectedUser.email}</Text>
                  <Group mt="xs">
                    <Badge color={getRoleColor(selectedUser.role)}>
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    </Badge>
                    <Badge color={selectedUser.is_active ? 'green' : 'red'} variant="outline">
                      {selectedUser.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </Group>
                </div>
              </Group>
            </Card>

            {/* Contact Info */}
            <Card>
              <Stack>
                <Group>
                  <IconMail size={16} />
                  <Text fw={500}>Contact Information</Text>
                </Group>
                <Group>
                  <Text size="sm" className="text-gray-600">Email:</Text>
                  <Text size="sm">{selectedUser.email}</Text>
                </Group>
                {selectedUser.phone && (
                  <Group>
                    <Text size="sm" className="text-gray-600">Phone:</Text>
                    <Text size="sm">{selectedUser.phone}</Text>
                  </Group>
                )}
              </Stack>
            </Card>

            {/* Account Info */}
            <Card>
              <Stack>
                <Group>
                  <IconCalendar size={16} />
                  <Text fw={500}>Account Information</Text>
                </Group>
                <Group>
                  <Text size="sm" className="text-gray-600">Joined:</Text>
                  <Text size="sm">{new Date(selectedUser.created_at).toLocaleString()}</Text>
                </Group>
                <Group>
                  <Text size="sm" className="text-gray-600">Last Login:</Text>
                  <Text size="sm">
                    {selectedUser.last_login 
                      ? new Date(selectedUser.last_login).toLocaleString()
                      : 'Never logged in'
                    }
                  </Text>
                </Group>
                <Group>
                  <Text size="sm" className="text-gray-600">User ID:</Text>
                  <Text size="sm" className="font-mono">{selectedUser.uid}</Text>
                </Group>
              </Stack>
            </Card>
          </Stack>
        )}
      </Modal>
    </Box>
  );
};

export default UserManagement;
