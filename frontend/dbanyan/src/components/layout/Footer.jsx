// Dbanyan Group - Footer Component
// Implementing project_context.md Section 2.7: Detailed Footer
// 4-column layout with navigation, legal, contact, and connect sections

import React, { useState } from 'react';
import { Container, Grid, Title, Text, Button, TextInput, Group, ActionIcon } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiClient } from '../../api';

const Footer = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  // Newsletter subscription form (Protocol 1.3: React Hook Form)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Newsletter subscription mutation (Protocol 1.3: TanStack Query)
  const newsletterMutation = useMutation({
    mutationFn: (email) => apiClient.subscribeNewsletter(email),
    onSuccess: () => {
      setSubscriptionStatus('success');
      reset();
      setTimeout(() => setSubscriptionStatus(''), 3000);
    },
    onError: (error) => {
      setSubscriptionStatus('error');
      console.error('Newsletter subscription failed:', error);
      setTimeout(() => setSubscriptionStatus(''), 3000);
    }
  });

  const onNewsletterSubmit = (data) => {
    newsletterMutation.mutate(data.email);
  };

  // Footer sections data (FR7.2)
  const footerSections = {
    navigation: {
      title: 'Quick Links',
      links: [
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/products' },
        { label: 'About Us', to: '/about' },
        { label: 'Contact Us', to: '/contact' },
        { label: 'Blog', to: '/blog' }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms & Conditions', to: '/terms' },
        { label: 'Shipping Policy', to: '/shipping' },
        { label: 'Return Policy', to: '/returns' },
        { label: 'Refund Policy', to: '/refunds' }
      ]
    },
    contact: {
      title: 'Contact Information',
      details: [
        { icon: '📍', label: 'Address', value: '123 Wellness Street, Health City, India - 110001' },
        { icon: '📧', label: 'Email', value: 'info@dbanyangroup.com' },
        { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
        { icon: '🕒', label: 'Hours', value: 'Mon-Fri: 9AM-6PM IST' }
      ]
    }
  };

  const socialLinks = [
    { platform: 'Facebook', icon: '📘', url: '#' },
    { platform: 'Instagram', icon: '📷', url: '#' },
    { platform: 'Twitter', icon: '🐦', url: '#' },
    { platform: 'LinkedIn', icon: '💼', url: '#' },
    { platform: 'YouTube', icon: '📺', url: '#' }
  ];

  return (
    <footer 
      className="pt-16 pb-8"
      style={{ 
        backgroundColor: '#2C5F2D', // Primary Green
        color: 'white'
      }}
    >
      <Container size="xl">
        {/* Main Footer Content - 4 Column Layout (FR7.1) */}
        <Grid gutter="xl" className="mb-12">
          
          {/* Column 1: Navigation Links (FR7.2) */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Title 
              order={4} 
              className="mb-6"
              style={{ 
                fontFamily: '"Lora", serif',
                color: '#FFBF00' // Accent Amber
              }}
            >
              {footerSections.navigation.title}
            </Title>
            <div className="space-y-3">
              {footerSections.navigation.links.map((link, index) => (
                <div key={index}>
                  <Link
                    to={link.to}
                    className="block text-white hover:text-amber-300 transition-colors duration-200"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </Grid.Col>

          {/* Column 2: Legal Links (FR7.2) */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Title 
              order={4} 
              className="mb-6"
              style={{ 
                fontFamily: '"Lora", serif',
                color: '#FFBF00'
              }}
            >
              {footerSections.legal.title}
            </Title>
            <div className="space-y-3">
              {footerSections.legal.links.map((link, index) => (
                <div key={index}>
                  <Link
                    to={link.to}
                    className="block text-white hover:text-amber-300 transition-colors duration-200"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </Grid.Col>

          {/* Column 3: Contact Information (FR7.2) */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Title 
              order={4} 
              className="mb-6"
              style={{ 
                fontFamily: '"Lora", serif',
                color: '#FFBF00'
              }}
            >
              {footerSections.contact.title}
            </Title>
            <div className="space-y-4">
              {footerSections.contact.details.map((detail, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-lg">{detail.icon}</span>
                  <div>
                    <Text 
                      size="sm" 
                      className="font-medium text-amber-300"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {detail.label}:
                    </Text>
                    <Text 
                      size="sm" 
                      className="text-white"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {detail.value}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Grid.Col>

          {/* Column 4: Connect & Newsletter (FR7.2) */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Title 
              order={4} 
              className="mb-6"
              style={{ 
                fontFamily: '"Lora", serif',
                color: '#FFBF00'
              }}
            >
              Stay Connected
            </Title>
            
            {/* Social Media Icons */}
            <div className="mb-6">
              <Text 
                size="sm" 
                className="mb-3 text-amber-300"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Follow us on social media:
              </Text>
              <Group spacing="sm">
                {socialLinks.map((social, index) => (
                  <ActionIcon
                    key={index}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    radius="md"
                    className="hover:bg-amber-600 transition-colors duration-200"
                    style={{ backgroundColor: '#FFBF00', color: '#2C5F2D' }}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </ActionIcon>
                ))}
              </Group>
            </div>

            {/* Newsletter Signup Form */}
            <div>
              <Text 
                size="sm" 
                className="mb-3 text-amber-300"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Subscribe to our newsletter:
              </Text>
              <form onSubmit={handleSubmit(onNewsletterSubmit)} className="space-y-3">
                <TextInput
                  placeholder="Enter your email"
                  size="sm"
                  radius="md"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={errors.email?.message}
                  style={{
                    input: {
                      backgroundColor: 'white',
                      border: 'none',
                      color: '#333333'
                    }
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  size="sm"
                  radius="md"
                  loading={newsletterMutation.isPending}
                  style={{
                    backgroundColor: '#FFBF00',
                    color: '#2C5F2D'
                  }}
                >
                  Subscribe
                </Button>
              </form>
              
              {/* Subscription Status Messages */}
              {subscriptionStatus === 'success' && (
                <Text size="sm" className="mt-2 text-green-300" style={{ fontFamily: '"Inter", sans-serif' }}>
                  ✅ Successfully subscribed to our newsletter!
                </Text>
              )}
              {subscriptionStatus === 'error' && (
                <Text size="sm" className="mt-2 text-red-300" style={{ fontFamily: '"Inter", sans-serif' }}>
                  ❌ Failed to subscribe. Please try again.
                </Text>
              )}
            </div>
          </Grid.Col>
        </Grid>

        {/* Footer Bottom */}
        <div 
          className="pt-8 border-t"
          style={{ borderColor: '#97BC62FF' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <Text 
              size="sm" 
              className="text-gray-300"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              © 2025 Dbanyan Group. All rights reserved. | Crafted with 💚 for your wellness
            </Text>

            {/* Certifications/Badges */}
            <div className="flex items-center space-x-4">
              <div 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: '#FFBF00', 
                  color: '#2C5F2D',
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                100% Natural
              </div>
              <div 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: '#97BC62FF', 
                  color: '#2C5F2D',
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                No Preservatives
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
