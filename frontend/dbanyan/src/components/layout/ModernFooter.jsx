// Dbanyan Group - Modern Footer
// Professional footer with enhanced readability and design

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Container, 
  Grid, 
  Title, 
  Text, 
  Group, 
  Stack,
  Button,
  TextInput,
  Anchor,
  Box,
  Divider
} from '@mantine/core';
import { 
  IconMail, 
  IconPhone, 
  IconMapPin, 
  IconBrandFacebook, 
  IconBrandTwitter, 
  IconBrandInstagram, 
  IconBrandLinkedin,
  IconLeaf,
  IconArrowRight,
  IconShield,
  IconTruck,
  IconCertificate
} from '@tabler/icons-react';
import { useSubscribeNewsletter } from '../../api';

const ModernFooter = () => {
  const subscribeNewsletter = useSubscribeNewsletter();
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      subscribeNewsletter.mutate(email);
      setEmail('');
    }
  };

  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Products', href: '/products' },
    { label: 'Moringa Guide', href: '/moringa-guide' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }
  ];

  const supportLinks = [
    { label: 'FAQs', href: '/faq' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Track Order', href: '/track' },
    { label: 'Support', href: '/support' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
    { label: 'Disclaimer', href: '/disclaimer' }
  ];

  return (
    <Box className="bg-gray-900 text-white">
      {/* Main Footer */}
      <Container size="xl" className="py-16">
        <Grid gutter="xl">
          {/* Company Info */}
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Stack gap="lg">
                {/* Logo */}
                <Group gap="sm">
                  <IconLeaf size={32} className="text-emerald-400" />
                  <Title 
                    order={3} 
                    className="text-white font-bold"
                    style={{ fontFamily: 'Lora, serif' }}
                  >
                    Dbanyan Group
                  </Title>
                </Group>

                {/* Description */}
                <Text 
                  size="md" 
                  className="text-gray-300 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Premium organic Moringa products for your wellness journey. 
                  Sustainably sourced, carefully processed, and delivered with love 
                  to support your natural health goals.
                </Text>

                {/* Contact Info */}
                <Stack gap="sm">
                  <Group gap="sm">
                    <IconMapPin size={18} className="text-emerald-400 mt-1 flex-shrink-0" />
                    <Text size="sm" className="text-gray-300">
                      123 Wellness Street, Green Valley,<br />
                      Mumbai, Maharashtra 400001
                    </Text>
                  </Group>
                  
                  <Group gap="sm">
                    <IconPhone size={18} className="text-emerald-400" />
                    <Text size="sm" className="text-gray-300">
                      +91 98765 43210
                    </Text>
                  </Group>
                  
                  <Group gap="sm">
                    <IconMail size={18} className="text-emerald-400" />
                    <Text size="sm" className="text-gray-300">
                      hello@dbanyangroup.com
                    </Text>
                  </Group>
                </Stack>

                {/* Social Media */}
                <Group gap="md">
                  <Anchor 
                    href="#" 
                    className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
                  >
                    <IconBrandFacebook size={20} className="text-white" />
                  </Anchor>
                  <Anchor 
                    href="#" 
                    className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
                  >
                    <IconBrandInstagram size={20} className="text-white" />
                  </Anchor>
                  <Anchor 
                    href="#" 
                    className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
                  >
                    <IconBrandTwitter size={20} className="text-white" />
                  </Anchor>
                  <Anchor 
                    href="#" 
                    className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
                  >
                    <IconBrandLinkedin size={20} className="text-white" />
                  </Anchor>
                </Group>
              </Stack>
            </motion.div>
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Stack gap="lg">
                <Title 
                  order={4} 
                  className="text-white font-semibold"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  Quick Links
                </Title>
                <Stack gap="sm">
                  {quickLinks.map((link, index) => (
                    <Anchor 
                      key={index}
                      href={link.href}
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {link.label}
                    </Anchor>
                  ))}
                </Stack>
              </Stack>
            </motion.div>
          </Grid.Col>

          {/* Support */}
          <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Stack gap="lg">
                <Title 
                  order={4} 
                  className="text-white font-semibold"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  Support
                </Title>
                <Stack gap="sm">
                  {supportLinks.map((link, index) => (
                    <Anchor 
                      key={index}
                      href={link.href}
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {link.label}
                    </Anchor>
                  ))}
                </Stack>
              </Stack>
            </motion.div>
          </Grid.Col>

          {/* Newsletter */}
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Stack gap="lg">
                <Title 
                  order={4} 
                  className="text-white font-semibold"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  Stay Updated
                </Title>
                <Text 
                  size="sm" 
                  className="text-gray-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Subscribe to our newsletter for wellness tips, product updates, 
                  and exclusive offers.
                </Text>
                
                {/* Newsletter Form */}
                <form onSubmit={handleNewsletterSubmit}>
                  <Stack gap="sm">
                    <TextInput
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      leftSection={<IconMail size={16} />}
                      classNames={{
                        input: 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      }}
                    />
                    <Button
                      type="submit"
                      color="green"
                      rightSection={<IconArrowRight size={16} />}
                      loading={subscribeNewsletter.isPending}
                      fullWidth
                    >
                      Subscribe
                    </Button>
                  </Stack>
                </form>

                {/* Trust Badges */}
                <Stack gap="sm" className="mt-4">
                  <Group gap="lg">
                    <Group gap="xs">
                      <IconShield size={16} className="text-emerald-400" />
                      <Text size="xs" className="text-gray-400">
                        Secure
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <IconTruck size={16} className="text-emerald-400" />
                      <Text size="xs" className="text-gray-400">
                        Fast Delivery
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <IconCertificate size={16} className="text-emerald-400" />
                      <Text size="xs" className="text-gray-400">
                        Certified Organic
                      </Text>
                    </Group>
                  </Group>
                </Stack>
              </Stack>
            </motion.div>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Bottom Footer */}
      <Box className="border-t border-gray-800">
        <Container size="xl" className="py-6">
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text 
                size="sm" 
                className="text-gray-400 text-center md:text-left"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                © 2024 Dbanyan Group. All rights reserved.
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Group 
                justify={{ base: "center", md: "flex-end" }} 
                gap="md"
              >
                {legalLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <Anchor 
                      href={link.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-xs"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {link.label}
                    </Anchor>
                    {index < legalLinks.length - 1 && (
                      <Text className="text-gray-600">•</Text>
                    )}
                  </React.Fragment>
                ))}
              </Group>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ModernFooter;
