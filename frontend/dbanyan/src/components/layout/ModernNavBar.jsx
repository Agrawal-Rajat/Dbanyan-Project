// Dbanyan Group - Modern Navigation Bar
// Clean, centered navigation with professional design

import React, { useState, useEffect } from 'react';
import { Container, Group, Button, Menu, Burger, Drawer, Stack, UnstyledButton, Text, Avatar, Badge } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useCartStore, useUserStore } from '../../store';
import { 
  IconLeaf, 
  IconShoppingCart, 
  IconUser, 
  IconLogin,
  IconUserPlus,
  IconLogout,
  IconDashboard,
  IconChevronDown
} from '@tabler/icons-react';

const ModernNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);

  // Store states
  const cartItems = useCartStore(state => state.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { user, isAuthenticated, logout } = useUserStore();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Moringa Guide', path: '/moringa-guide' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  // Check if path is active
  const isActivePath = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <Container size="xl" className="py-4">
          <Group justify="space-between" align="center">
            {/* Brand Logo */}
            <motion.div
              className="cursor-pointer"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Group gap="sm" align="center">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                  style={{ 
                    background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
                  }}
                >
                  <IconLeaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <Text 
                    size="lg" 
                    fw={700}
                    style={{ 
                      fontFamily: '"Lora", serif',
                      background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1
                    }}
                  >
                    Dbanyan
                  </Text>
                  <Text 
                    size="xs" 
                    c="dimmed"
                    style={{ fontFamily: '"Inter", sans-serif', marginTop: -2 }}
                  >
                    Pure Moringa
                  </Text>
                </div>
              </Group>
            </motion.div>

            {/* Desktop Navigation */}
            <Group gap="lg" visibleFrom="md" className="flex-1 justify-center">
              {navItems.map((item) => (
                <motion.div key={item.path} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <UnstyledButton
                    onClick={() => navigate(item.path)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                    }`}
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {item.label}
                  </UnstyledButton>
                </motion.div>
              ))}
            </Group>

            {/* Right Section */}
            <Group gap="md" visibleFrom="md">
              {/* Cart Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <UnstyledButton
                  onClick={() => navigate('/checkout')}
                  className="relative p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <IconShoppingCart className="w-5 h-5 text-gray-700" />
                  {cartItemCount > 0 && (
                    <Badge
                      size="xs"
                      className="absolute -top-1 -right-1 bg-emerald-500 text-white min-w-5 h-5"
                      style={{ fontSize: '10px' }}
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </UnstyledButton>
              </motion.div>

              {/* Authentication */}
              {isAuthenticated ? (
                <Menu width={200} position="bottom-end" withinPortal>
                  <Menu.Target>
                    <UnstyledButton className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <Avatar size="sm" className="bg-emerald-500">
                        {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </Avatar>
                      <Text size="sm" fw={500} style={{ fontFamily: '"Inter", sans-serif' }}>
                        {user?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}
                      </Text>
                      <IconChevronDown className="w-4 h-4 text-gray-500" />
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {user?.role === 'admin' && (
                      <Menu.Item 
                        leftSection={<IconDashboard className="w-4 h-4" />}
                        onClick={() => navigate('/admin')}
                      >
                        Admin Dashboard
                      </Menu.Item>
                    )}
                    <Menu.Item 
                      leftSection={<IconUser className="w-4 h-4" />}
                      onClick={() => navigate('/profile')}
                    >
                      Profile
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item 
                      leftSection={<IconLogout className="w-4 h-4" />}
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      color="red"
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Group gap="sm">
                  <Button
                    variant="subtle"
                    leftSection={<IconLogin className="w-4 h-4" />}
                    onClick={() => navigate('/login')}
                    className="text-gray-700 hover:bg-gray-50"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Login
                  </Button>
                  <Button
                    leftSection={<IconUserPlus className="w-4 h-4" />}
                    onClick={() => navigate('/signup')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Sign Up
                  </Button>
                </Group>
              )}
            </Group>

            {/* Mobile Burger */}
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="md"
              size="sm"
              color="gray.7"
            />
          </Group>
        </Container>
      </motion.header>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="sm"
        title={
          <Group gap="sm">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)' }}
            >
              <IconLeaf className="w-4 h-4 text-white" />
            </div>
            <Text fw={700} style={{ fontFamily: '"Lora", serif' }}>
              Dbanyan
            </Text>
          </Group>
        }
        overlayProps={{ backgroundOpacity: 0.3, blur: 4 }}
      >
        <Stack gap="md">
          {/* Navigation Items */}
          {navItems.map((item) => (
            <UnstyledButton
              key={item.path}
              onClick={() => {
                navigate(item.path);
                close();
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActivePath(item.path)
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              {item.label}
            </UnstyledButton>
          ))}

          {/* Cart */}
          <UnstyledButton
            onClick={() => {
              navigate('/checkout');
              close();
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <Group gap="sm">
              <IconShoppingCart className="w-5 h-5 text-gray-700" />
              <Text style={{ fontFamily: '"Inter", sans-serif' }}>Cart</Text>
            </Group>
            {cartItemCount > 0 && (
              <Badge size="sm" className="bg-emerald-500">
                {cartItemCount}
              </Badge>
            )}
          </UnstyledButton>

          {/* Authentication */}
          {isAuthenticated ? (
            <>
              <UnstyledButton
                onClick={() => {
                  navigate('/profile');
                  close();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Avatar size="sm" className="bg-emerald-500">
                  {user?.firstName?.charAt(0) || 'U'}
                </Avatar>
                <Text style={{ fontFamily: '"Inter", sans-serif' }}>
                  {user?.firstName || 'User'}
                </Text>
              </UnstyledButton>
              {user?.role === 'admin' && (
                <UnstyledButton
                  onClick={() => {
                    navigate('/admin');
                    close();
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Admin Dashboard
                </UnstyledButton>
              )}
              <Button
                variant="subtle"
                color="red"
                onClick={() => {
                  logout();
                  close();
                }}
                fullWidth
                leftSection={<IconLogout className="w-4 h-4" />}
              >
                Logout
              </Button>
            </>
          ) : (
            <Stack gap="sm">
              <Button
                variant="outline"
                onClick={() => {
                  navigate('/login');
                  close();
                }}
                fullWidth
                leftSection={<IconLogin className="w-4 h-4" />}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate('/signup');
                  close();
                }}
                fullWidth
                className="bg-emerald-600 hover:bg-emerald-700"
                leftSection={<IconUserPlus className="w-4 h-4" />}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Stack>
      </Drawer>
    </>
  );
};

export default ModernNavBar;
