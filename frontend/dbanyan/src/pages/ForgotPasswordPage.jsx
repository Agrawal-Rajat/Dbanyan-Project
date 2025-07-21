// Dbanyan Group - Forgot Password Page
// Modern design with secure password reset flow

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Container, 
  Card, 
  Title, 
  Text, 
  TextInput, 
  Button, 
  Group, 
  Stack,
  Alert,
  Anchor,
  Box
} from '@mantine/core';
import { 
  IconMail, 
  IconArrowLeft, 
  IconCheck,
  IconAlertCircle
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useAuthStore } from '../store';
import ModernNavBar from '../components/layout/ModernNavBar';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, error } = useAuthStore();
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: (value) => 
        /^\S+@\S+\.\S+$/.test(value) ? null : 'Please enter a valid email address'
    }
  });

  const handleSubmit = async (values) => {
    try {
      const result = await forgotPassword(values.email);
      if (result.success) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | Dbanyan Group</title>
        <meta name="description" content="Reset your Dbanyan Group account password securely" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <ModernNavBar />

      <Box className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-white py-20">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card 
              shadow="lg" 
              padding="xl" 
              radius="lg"
              className="bg-white border border-gray-100"
            >
              <Stack gap="lg">
                {/* Back Link */}
                <Group gap="xs">
                  <Anchor 
                    component={Link} 
                    to="/login"
                    className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                  >
                    <Group gap="xs">
                      <IconArrowLeft size={16} />
                      <Text size="sm">Back to Login</Text>
                    </Group>
                  </Anchor>
                </Group>

                {/* Header */}
                <Box className="text-center">
                  <Title 
                    order={2} 
                    className="text-gray-800 font-bold mb-2"
                    style={{ fontFamily: 'Lora, serif' }}
                  >
                    Reset Your Password
                  </Title>
                  <Text 
                    size="md" 
                    className="text-gray-600"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {emailSent 
                      ? "Check your email for reset instructions"
                      : "Enter your email address and we'll send you a reset link"
                    }
                  </Text>
                </Box>

                {emailSent ? (
                  // Success State
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert 
                      icon={<IconCheck size={16} />} 
                      color="green" 
                      variant="light"
                      className="text-center"
                    >
                      <Stack gap="sm" align="center">
                        <Text 
                          size="md" 
                          className="font-medium"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Reset email sent successfully!
                        </Text>
                        <Text 
                          size="sm" 
                          className="text-gray-600"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Please check your email ({form.values.email}) for password reset instructions.
                          The link will expire in 1 hour.
                        </Text>
                      </Stack>
                    </Alert>

                    <Group justify="center" className="mt-6">
                      <Button 
                        variant="outline" 
                        color="green"
                        onClick={() => setEmailSent(false)}
                      >
                        Send Another Email
                      </Button>
                      <Button 
                        color="green"
                        onClick={() => navigate('/login')}
                      >
                        Back to Login
                      </Button>
                    </Group>
                  </motion.div>
                ) : (
                  // Form State
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                      <Stack gap="lg">
                        {/* Error Alert */}
                        {error && (
                          <Alert 
                            icon={<IconAlertCircle size={16} />} 
                            color="red" 
                            variant="light"
                          >
                            {error}
                          </Alert>
                        )}

                        {/* Email Input */}
                        <TextInput
                          label="Email Address"
                          placeholder="Enter your email address"
                          leftSection={<IconMail size={16} />}
                          size="md"
                          required
                          {...form.getInputProps('email')}
                          classNames={{
                            label: 'text-gray-700 font-medium mb-2',
                            input: 'border-gray-300 focus:border-emerald-500 transition-colors duration-200'
                          }}
                        />

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          size="md"
                          color="green"
                          loading={isLoading}
                          fullWidth
                          className="bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200"
                        >
                          Send Reset Link
                        </Button>

                        {/* Additional Info */}
                        <Box className="text-center">
                          <Text 
                            size="sm" 
                            className="text-gray-500"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Remember your password?{' '}
                            <Anchor 
                              component={Link} 
                              to="/login"
                              className="text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                              Sign in here
                            </Anchor>
                          </Text>
                        </Box>
                      </Stack>
                    </form>
                  </motion.div>
                )}

                {/* Security Note */}
                <Box className="border-t border-gray-100 pt-4">
                  <Text 
                    size="xs" 
                    className="text-gray-500 text-center"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    For security reasons, we'll only send password reset emails to registered accounts.
                    If you don't receive an email, please check your spam folder or contact support.
                  </Text>
                </Box>
              </Stack>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default ForgotPasswordPage;
