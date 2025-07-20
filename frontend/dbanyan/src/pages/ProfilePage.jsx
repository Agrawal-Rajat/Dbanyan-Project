// Dbanyan Group - User Profile Page
// Shows user info and allows profile updates

import React from 'react';
import { Container, Title, Card, Text, Group, Avatar, Button } from '@mantine/core';
import { useAuthStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IconUser, IconLogout } from '@tabler/icons-react';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Profile | Dbanyan Group</title>
      </Helmet>
      <Container size="sm" className="py-16">
        <Card radius="xl" shadow="lg" p="xl" className="text-center">
          <Avatar size={80} className="mx-auto bg-emerald-500 mb-4">
            {user.full_name ? user.full_name.charAt(0) : 'U'}
          </Avatar>
          <Title order={2} className="mb-2" style={{ fontFamily: 'Lora, serif' }}>
            {user.full_name || 'User'}
          </Title>
          <Text size="lg" className="mb-2 text-gray-600">
            {user.email}
          </Text>
          {user.phone && (
            <Text size="md" className="mb-2 text-gray-500">
              {user.phone}
            </Text>
          )}
          <Group justify="center" mt="lg">
            <Button leftSection={<IconLogout />} color="red" radius="xl" onClick={logout}>
              Logout
            </Button>
          </Group>
        </Card>
      </Container>
    </>
  );
};

export default ProfilePage;
