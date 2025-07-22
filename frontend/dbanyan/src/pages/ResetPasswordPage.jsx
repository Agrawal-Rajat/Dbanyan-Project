// Dbanyan Group - Reset Password Page
// Handles password reset with token from email

import React, { useState, useEffect } from 'react';
import { Container, Paper, Title, Text, PasswordInput, Button, Alert, Stack } from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useUserStore } from '../store';
import { IconLeaf, IconLock, IconEye, IconEyeOff, IconAlertCircle, IconCheck } from '@tabler/icons-react';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, isLoading, error, clearError } = useUserStore();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      navigate('/forgot-password');
      return;
    }
    setToken(tokenFromUrl);
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    if (!formData.password || !formData.confirmPassword) {
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    
    if (formData.password.length < 8) {
      return;
    }
    
    const result = await resetPassword(token, formData.password);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (error) clearError();
  };

  if (success) {
    return (
      <>
        <Helmet>
          <title>Password Reset Successful | Dbanyan Group</title>
        </Helmet>

        <div 
          className="min-h-screen flex items-center justify-center py-12 px-4"
          style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #dcfce7 100%)'
          }}
        >
          <Container size="xs" className="w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Paper className="p-8 text-center" shadow="lg" radius="xl">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <IconCheck className="w-8 h-8 text-green-600" />
                </motion.div>
                
                <Title order={2} className="mb-4" style={{ fontFamily: '"Lora", serif' }}>
                  Password Reset Successful!
                </Title>
                
                <Text c="dimmed" size="md" className="mb-6">
                  Your password has been updated successfully. You will be redirected to the login page in a few seconds.
                </Text>
                
                <Button 
                  fullWidth 
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                </Button>
              </Paper>
            </motion.div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | Dbanyan Group</title>
        <meta name="description" content="Create a new password for your Dbanyan Group account." />
      </Helmet>

      <div 
        className="min-h-screen flex items-center justify-center py-12 px-4"
        style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #dcfce7 100%)'
        }}
      >
        <Container size="xs" className="w-full">
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
                Reset Password
              </Title>
              
              <Text c="dimmed" size="md">
                Enter your new password below
              </Text>
            </div>

            {/* Reset Form */}
            <Paper className="p-8" shadow="lg" radius="xl">
              <form onSubmit={handleSubmit}>
                <Stack gap="md">
                  {error && (
                    <Alert 
                      color="red" 
                      variant="light"
                      icon={<IconAlertCircle size={16} />}
                    >
                      {error}
                    </Alert>
                  )}

                  <PasswordInput
                    label="New Password"
                    placeholder="Enter your new password"
                    value={formData.password}
                    onChange={handleChange('password')}
                    visible={showPassword}
                    onVisibilityChange={setShowPassword}
                    leftSection={<IconLock size={16} />}
                    visibilityToggleIcon={({ reveal }) =>
                      reveal ? <IconEyeOff size={18} /> : <IconEye size={18} />
                    }
                    required
                    minLength={8}
                    description="Password must be at least 8 characters long"
                  />

                  <PasswordInput
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    visible={showConfirmPassword}
                    onVisibilityChange={setShowConfirmPassword}
                    leftSection={<IconLock size={16} />}
                    visibilityToggleIcon={({ reveal }) =>
                      reveal ? <IconEyeOff size={18} /> : <IconEye size={18} />
                    }
                    required
                    error={
                      formData.confirmPassword && 
                      formData.password !== formData.confirmPassword 
                        ? 'Passwords do not match' 
                        : null
                    }
                  />

                  <Button
                    type="submit"
                    fullWidth
                    size="md"
                    className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
                    loading={isLoading}
                    disabled={
                      !formData.password || 
                      !formData.confirmPassword || 
                      formData.password !== formData.confirmPassword ||
                      formData.password.length < 8
                    }
                  >
                    {isLoading ? 'Updating Password...' : 'Update Password'}
                  </Button>
                </Stack>
              </form>
            </Paper>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Text size="sm" c="dimmed">
                Remember your password?{' '}
                <motion.span 
                  className="text-emerald-600 cursor-pointer hover:text-emerald-700 font-medium"
                  onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign in here
                </motion.span>
              </Text>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default ResetPasswordPage;
