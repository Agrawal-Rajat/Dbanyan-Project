// Dbanyan Group - Organic Footer Component
// Following project_context.md Section 2.7 & organic design reference
// Creating a sophisticated, multi-column footer with organic aesthetics

import React from 'react';
import { Container, Grid, Title, Text, Button, TextInput, Group, Stack, Divider } from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  IconMail, 
  IconPhone, 
  IconMapPin, 
  IconBrandInstagram, 
  IconBrandFacebook, 
  IconBrandTwitter, 
  IconBrandLinkedin,
  IconLeaf,
  IconSend
} from '@tabler/icons-react';

const OrganicFooter = () => {
  const navigate = useNavigate();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription API call
    console.log('Newsletter subscription submitted');
  };

  return (
    <footer style={{ background: 'linear-gradient(to bottom, #2C5F2D, #1a3d1b)' }} className="text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: '#97BC62' }} />
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: '#FFBF00' }} />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full blur-2xl" style={{ backgroundColor: '#97BC62' }} />
      </div>

      <Container size="xl" className="relative z-10">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <Grid gutter="xl">
            {/* Column 1: Brand & Mission */}
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <motion.div variants={itemVariants}>
                <Stack gap="lg">
                  {/* Brand Logo */}
                  <Group gap="sm" align="center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#97BC62' }}>
                      <IconLeaf className="w-6 h-6 text-white" />
                    </div>
                    <Title 
                      order={3} 
                      className="text-2xl text-white"
                      style={{ fontFamily: '"Lora", serif' }}
                    >
                      Dbanyan Group
                    </Title>
                  </Group>

                  {/* Mission Statement */}
                  <Text 
                    size="sm" 
                    className="leading-relaxed"
                    style={{ color: '#d4e5d4' }}
                  >
                    Bringing you the purest Moringa products from nature's pharmacy. 
                    Committed to your wellness journey with authenticity, purity, and trust.
                  </Text>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-lg px-3 py-1" style={{ backgroundColor: '#4a6549' }}>
                      <Text size="xs" className="text-white font-medium">100% Natural</Text>
                    </div>
                    <div className="rounded-lg px-3 py-1" style={{ backgroundColor: '#b06200' }}>
                      <Text size="xs" className="text-white font-medium">No Preservatives</Text>
                    </div>
                    <div className="rounded-lg px-3 py-1" style={{ backgroundColor: '#d18400' }}>
                      <Text size="xs" className="text-white font-medium">Organic Certified</Text>
                    </div>
                  </div>
                </Stack>
              </motion.div>
            </Grid.Col>

            {/* Column 2: Quick Navigation */}
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <motion.div variants={itemVariants}>
                <Stack gap="lg">
                  <Title 
                    order={4} 
                    className="text-lg text-white"
                    style={{ fontFamily: '"Lora", serif' }}
                  >
                    Quick Links
                  </Title>
                  
                  <Stack gap="sm">
                    {[
                      { label: 'Home', path: '/' },
                      { label: 'Products', path: '/products' },
                      { label: 'About Moringa', path: '/moringa-guide' },
                      { label: 'Our Story', path: '/about' },
                      { label: 'Contact Us', path: '/contact' },
                      { label: 'Track Order', path: '/track-order' }
                    ].map((link, index) => (
                      <Text
                        key={index}
                        className="cursor-pointer transition-colors duration-300"
                        style={{ color: '#d4e5d4' }}
                        onClick={() => navigate(link.path)}
                      >
                        {link.label}
                      </Text>
                    ))}
                  </Stack>
                </Stack>
              </motion.div>
            </Grid.Col>

            {/* Column 3: Customer Care & Legal */}
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <motion.div variants={itemVariants}>
                <Stack gap="lg">
                  <Title 
                    order={4} 
                    className="text-lg text-white"
                    style={{ fontFamily: '"Lora", serif' }}
                  >
                    Customer Care
                  </Title>
                  
                  <Stack gap="sm">
                    {[
                      { label: 'FAQs', path: '/faq' },
                      { label: 'Shipping & Returns', path: '/shipping' },
                      { label: 'Privacy Policy', path: '/privacy' },
                      { label: 'Terms & Conditions', path: '/terms' },
                      { label: 'Refund Policy', path: '/refund' },
                      { label: 'Bulk Orders', path: '/bulk-orders' }
                    ].map((link, index) => (
                      <Text
                        key={index}
                        className="cursor-pointer transition-colors duration-300"
                        style={{ color: '#d4e5d4' }}
                        onClick={() => navigate(link.path)}
                      >
                        {link.label}
                      </Text>
                    ))}
                  </Stack>
                </Stack>
              </motion.div>
            </Grid.Col>

            {/* Column 4: Contact & Newsletter */}
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <motion.div variants={itemVariants}>
                <Stack gap="lg">
                  <Title 
                    order={4} 
                    className="text-lg text-white"
                    style={{ fontFamily: '"Lora", serif' }}
                  >
                    Get In Touch
                  </Title>

                  {/* Contact Information - Indian Context */}
                  <Stack gap="sm">
                    <Group gap="sm" align="flex-start">
                      <IconMapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#FFBF00' }} />
                      <Text size="sm" style={{ color: '#d4e5d4' }}>
                        Dbanyan Group Headquarters<br />
                        123, Green Valley Complex<br />
                        MG Road, Bangalore - 560001<br />
                        Karnataka, India
                      </Text>
                    </Group>

                    <Group gap="sm" align="center">
                      <IconPhone className="w-5 h-5" style={{ color: '#FFBF00' }} />
                      <Text size="sm" style={{ color: '#d4e5d4' }}>
                        +91 98765 43210
                      </Text>
                    </Group>

                    <Group gap="sm" align="center">
                      <IconMail className="w-5 h-5" style={{ color: '#FFBF00' }} />
                      <Text size="sm" style={{ color: '#d4e5d4' }}>
                        hello@dbanyangroup.com
                      </Text>
                    </Group>
                  </Stack>

                  {/* Newsletter Signup */}
                  <div>
                    <Title 
                      order={5} 
                      className="text-md mb-3 text-white"
                      style={{ fontFamily: '"Lora", serif' }}
                    >
                      Health Tips & Updates
                    </Title>
                    
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                      <TextInput
                        placeholder="Enter your email"
                        className="w-full"
                        styles={{
                          input: {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            '&::placeholder': {
                              color: 'rgba(255, 255, 255, 0.6)'
                            },
                            '&:focus': {
                              borderColor: '#FFBF00'
                            }
                          }
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        rightSection={<IconSend className="w-4 h-4" />}
                        className="font-semibold"
                        style={{ backgroundColor: '#FFBF00', color: '#2C5F2D' }}
                        radius="md"
                      >
                        Subscribe
                      </Button>
                    </form>
                  </div>

                  {/* Social Media */}
                  <div>
                    <Title 
                      order={5} 
                      className="text-md mb-3 text-white"
                      style={{ fontFamily: '"Lora", serif' }}
                    >
                      Follow Us
                    </Title>
                    <Group gap="md">
                      {[
                        { icon: IconBrandInstagram, href: '#', color: '#e91e63' },
                        { icon: IconBrandFacebook, href: '#', color: '#1976d2' },
                        { icon: IconBrandTwitter, href: '#', color: '#1da1f2' },
                        { icon: IconBrandLinkedin, href: '#', color: '#0077b5' }
                      ].map((social, index) => (
                        <div
                          key={index}
                          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                          style={{ backgroundColor: '#4a6549' }}
                        >
                          <social.icon className="w-5 h-5" style={{ color: social.color }} />
                        </div>
                      ))}
                    </Group>
                  </div>
                </Stack>
              </motion.div>
            </Grid.Col>
          </Grid>

          {/* Bottom Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <Divider className="mb-8" color="rgba(255, 255, 255, 0.1)" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Group gap="md" align="center">
                <Text size="sm" style={{ color: '#d4e5d4' }}>
                  © 2025 Dbanyan Group. All rights reserved.
                </Text>
                <div className="hidden md:block w-1 h-1 rounded-full" style={{ backgroundColor: '#97BC62' }}></div>
                <Text size="sm" style={{ color: '#d4e5d4' }}>
                  Made with 💚 for your wellness
                </Text>
              </Group>

              <Group gap="sm">
                <div className="rounded-lg px-3 py-1" style={{ backgroundColor: '#4a6549' }}>
                  <Text size="xs" className="text-white">🇮🇳 Made in India</Text>
                </div>
                <div className="rounded-lg px-3 py-1" style={{ backgroundColor: '#b06200' }}>
                  <Text size="xs" className="text-white">🌱 Eco-Friendly</Text>
                </div>
              </Group>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default OrganicFooter;
