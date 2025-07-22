// Dbanyan Group - Modern Signup Page
// Complete registration with guest/admin flow

import React, { useState } from 'react';
import { Container, Paper, Title, Text, TextInput, PasswordInput, Button, Group, Alert, Anchor, Divider, Stack, Select } from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useUserStore } from '../store';
import { IconLeaf, IconMail, IconLock, IconUser, IconPhone, IconEye, IconEyeOff, IconAlertCircle, IconCheck } from '@tabler/icons-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useUserStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    
    if (passwordStrength < 3) {
      return;
    }
    
    const result = await signup({
      full_name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });
    
    if (result.success) {
      navigate('/');
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
    
    if (error) clearError();
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 2) return '#ef4444';
    if (passwordStrength < 4) return '#f59e0b';
    return '#10b981';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 2) return 'Weak';
    if (passwordStrength < 4) return 'Good';
    return 'Strong';
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | Dbanyan Group</title>
        <meta name="description" content="Create your Dbanyan Group account to access exclusive features and track your wellness journey." />
      </Helmet>

      <div 
        className="min-h-screen flex items-center justify-center py-12 px-4"
        style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #dcfce7 100%)'
        }}
      >
        <Container size="sm" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconLeaf className="w-8 h-8 text-white" />
              </motion.div>
              
              <Title 
                order={1} 
                className="text-3xl mb-2"
                style={{ 
                  fontFamily: '"Lora", serif',
                  background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Join Dbanyan
              </Title>
              
              <Text c="dimmed" size="md">
                Start your wellness journey with pure Moringa
              </Text>
            </div>

            {/* Signup Form */}
            <Paper 
              className="p-8 bg-white/80 backdrop-blur-sm border border-emerald-100"
              radius="xl" 
              shadow="lg"
            >
              <form onSubmit={handleSubmit}>
                <Stack gap="lg">
                  {/* Error Alert */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Alert 
                        icon={<IconAlertCircle className="w-4 h-4" />} 
                        color="red" 
                        radius="lg"
                        variant="light"
                      >
                        {error}
                      </Alert>
                    </motion.div>
                  )}

                  {/* Name Fields */}
                  <Group grow>
                    <TextInput
                      label="First Name"
                      placeholder="John"
                      size="md"
                      leftSection={<IconUser className="w-4 h-4 text-gray-500" />}
                      value={formData.firstName}
                      onChange={handleChange('firstName')}
                      required
                      radius="lg"
                      styles={{
                        input: {
                          border: '2px solid #e5e7eb',
                          '&:focus': {
                            borderColor: '#10b981'
                          }
                        }
                      }}
                    />
                    <TextInput
                      label="Last Name"
                      placeholder="Doe"
                      size="md"
                      value={formData.lastName}
                      onChange={handleChange('lastName')}
                      required
                      radius="lg"
                      styles={{
                        input: {
                          border: '2px solid #e5e7eb',
                          '&:focus': {
                            borderColor: '#10b981'
                          }
                        }
                      }}
                    />
                  </Group>

                  {/* Email Input */}
                  <TextInput
                    label="Email Address"
                    placeholder="your@email.com"
                    size="md"
                    leftSection={<IconMail className="w-4 h-4 text-gray-500" />}
                    value={formData.email}
                    onChange={handleChange('email')}
                    required
                    radius="lg"
                    styles={{
                      input: {
                        border: '2px solid #e5e7eb',
                        '&:focus': {
                          borderColor: '#10b981'
                        }
                      }
                    }}
                  />

                  {/* Phone Input */}
                  <TextInput
                    label="Phone Number (Optional)"
                    placeholder="+91 98765 43210"
                    size="md"
                    leftSection={<IconPhone className="w-4 h-4 text-gray-500" />}
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    radius="lg"
                    styles={{
                      input: {
                        border: '2px solid #e5e7eb',
                        '&:focus': {
                          borderColor: '#10b981'
                        }
                      }
                    }}
                  />

                  {/* Password Input */}
                  <div>
                    <PasswordInput
                      label="Password"
                      placeholder="Create a strong password"
                      size="md"
                      leftSection={<IconLock className="w-4 h-4 text-gray-500" />}
                      visibilityToggleIcon={({ reveal }) =>
                        reveal ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />
                      }
                      visible={showPassword}
                      onVisibilityChange={setShowPassword}
                      value={formData.password}
                      onChange={handleChange('password')}
                      required
                      radius="lg"
                      styles={{
                        input: {
                          border: '2px solid #e5e7eb',
                          '&:focus': {
                            borderColor: '#10b981'
                          }
                        }
                      }}
                    />
                    
                    {/* Password Strength */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full transition-all duration-300"
                              style={{ 
                                width: `${(passwordStrength / 5) * 100}%`,
                                backgroundColor: getPasswordStrengthColor()
                              }}
                            />
                          </div>
                          <Text 
                            size="xs" 
                            fw={500}
                            style={{ color: getPasswordStrengthColor() }}
                          >
                            {getPasswordStrengthText()}
                          </Text>
                        </div>
                        <Text size="xs" c="dimmed">
                          Use 8+ characters with uppercase, lowercase, numbers, and symbols
                        </Text>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    size="md"
                    leftSection={<IconLock className="w-4 h-4 text-gray-500" />}
                    visibilityToggleIcon={({ reveal }) =>
                      reveal ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />
                    }
                    visible={showConfirmPassword}
                    onVisibilityChange={setShowConfirmPassword}
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    required
                    radius="lg"
                    error={
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? "Passwords don't match"
                        : null
                    }
                    styles={{
                      input: {
                        border: '2px solid #e5e7eb',
                        '&:focus': {
                          borderColor: '#10b981'
                        }
                      }
                    }}
                  />

                  {/* Sign Up Button */}
                  <Button
                    type="submit"
                    size="md"
                    radius="lg"
                    loading={isLoading}
                    fullWidth
                    disabled={passwordStrength < 3 || formData.password !== formData.confirmPassword}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  {/* Terms */}
                  <Text size="xs" c="dimmed" className="text-center">
                    By creating an account, you agree to our{' '}
                    <Anchor href="/terms" className="text-emerald-600">Terms of Service</Anchor>
                    {' '}and{' '}
                    <Anchor href="/privacy" className="text-emerald-600">Privacy Policy</Anchor>
                  </Text>

                  {/* Divider */}
                  <Divider label="Already have an account?" labelPosition="center" />

                  {/* Login Link */}
                  <Button
                    variant="outline"
                    size="md"
                    radius="lg"
                    fullWidth
                    onClick={() => navigate('/login')}
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    Sign In Instead
                  </Button>

                  {/* Continue Shopping */}
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => navigate('/')}
                    className="text-gray-600 hover:bg-gray-50"
                  >
                    Continue Shopping as Guest
                  </Button>
                </Stack>
              </form>
            </Paper>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default SignupPage;
