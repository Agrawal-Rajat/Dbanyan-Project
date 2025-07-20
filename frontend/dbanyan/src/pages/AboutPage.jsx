// Dbanyan Group - Comprehensive About Page
// Full company story, mission, and engaging narrative

import React from 'react';
import { Container, Title, Text, Grid, Card, Group, Stack, Badge, Button, Image, Timeline, ThemeIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  IconLeaf, 
  IconHeart, 
  IconUsers, 
  IconShield, 
  IconPlant,
  IconSun,
  IconWorld,
  IconStar,
  IconBulb,
  IconTree,
  IconTarget,
  IconGift,
  IconGrowth,
  IconAward
} from '@tabler/icons-react';

import ModernNavBar from '../components/layout/ModernNavBar';
import ModernFooter from '../components/layout/ModernFooter';

const AboutPage = () => {
  const navigate = useNavigate();

  // Company values
  const values = [
    {
      icon: IconHeart,
      title: 'Health First',
      description: 'Your wellness is our primary concern. Every product is crafted with your health transformation in mind.',
      color: '#ef4444'
    },
    {
      icon: IconShield,
      title: 'Purity Promise',
      description: '100% natural, preservative-free products. We never compromise on quality or authenticity.',
      color: '#10b981'
    },
    {
      icon: IconUsers,
      title: 'Community Care',
      description: 'Building a community of health-conscious individuals supporting each other\'s wellness journey.',
      color: '#3b82f6'
    },
    {
      icon: IconWorld,
      title: 'Sustainability',
      description: 'Responsible farming practices that protect our planet while delivering pure nutrition.',
      color: '#84cc16'
    }
  ];

  // Company milestones
  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Founded with a vision to make pure Moringa accessible to everyone seeking natural wellness.',
      icon: IconPlant
    },
    {
      year: '2021', 
      title: 'Quality Certification',
      description: 'Achieved organic certification and established strict quality control processes.',
      icon: IconAward
    },
    {
      year: '2022',
      title: 'Community Growth',
      description: 'Reached 10,000+ satisfied customers and built a thriving wellness community.',
      icon: IconGrowth
    },
    {
      year: '2023',
      title: 'Innovation',
      description: 'Launched new product lines and expanded our commitment to sustainable farming.',
      icon: IconBulb
    },
    {
      year: '2024',
      title: 'Future Vision',
      description: 'Continuing to transform lives through pure Moringa and natural wellness solutions.',
      icon: IconTarget
    }
  ];

  // Leadership team
  const leadership = [
    {
      name: 'Rajesh Sharma',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: '15+ years in natural health industry, passionate about bringing authentic Moringa to the world.',
      specialization: 'Natural Health & Business Strategy'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Quality & Research',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b5b73068?w=300&h=300&fit=crop&crop=face',
      bio: 'PhD in Nutritional Science, ensures every product meets the highest quality standards.',
      specialization: 'Nutritional Science & Quality Control'
    },
    {
      name: 'Arjun Kumar',
      role: 'Sustainable Farming Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Expert in organic farming, committed to sustainable and ethical agricultural practices.',
      specialization: 'Sustainable Agriculture & Farming'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Dbanyan Group | Our Story & Mission | Pure Moringa Wellness</title>
        <meta 
          name="description" 
          content="Discover the story behind Dbanyan Group - our mission to transform lives through pure, authentic Moringa products. Learn about our values, team, and commitment to your wellness journey." 
        />
        <meta name="keywords" content="About Dbanyan Group, Moringa Company, Natural Health Mission, Sustainable Farming, Wellness Journey, Pure Moringa Products" />
      </Helmet>

      <ModernNavBar />

      <main>
        {/* Hero Section */}
        <section 
          className="py-20"
          style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #dcfce7 100%)'
          }}
        >
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Badge 
                size="lg" 
                radius="xl" 
                className="mb-6"
                style={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white'
                }}
              >
                <IconLeaf className="w-4 h-4 mr-2" />
                Our Story
              </Badge>
              
              <Title 
                order={1} 
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{ 
                  fontFamily: '"Lora", serif',
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Transforming Lives, 
                <br />One Leaf at a Time
              </Title>
              
              <Text 
                size="xl" 
                className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                We\'re not just a Moringa company – we\'re your partners in a life-changing 
                wellness journey. Discover how our commitment to purity, sustainability, 
                and your health drives everything we do.
              </Text>
            </motion.div>
          </Container>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <Container size="xl">
            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 border-0" radius="xl">
                    <ThemeIcon size={60} radius="xl" className="bg-emerald-600 mb-6">
                      <IconTarget className="w-8 h-8" />
                    </ThemeIcon>
                    
                    <Title order={3} className="text-2xl font-bold mb-4 text-emerald-900" style={{ fontFamily: '"Lora", serif' }}>
                      Our Mission
                    </Title>
                    
                    <Text size="lg" className="text-emerald-800 leading-relaxed">
                      To transform lives by providing the purest, most potent Moringa products 
                      on Earth. We believe that everyone deserves access to nature's most 
                      powerful superfood – completely natural, preservative-free, and 
                      life-changing in its impact.
                    </Text>
                  </Card>
                </motion.div>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-0" radius="xl">
                    <ThemeIcon size={60} radius="xl" className="bg-blue-600 mb-6">
                      <IconSun className="w-8 h-8" />
                    </ThemeIcon>
                    
                    <Title order={3} className="text-2xl font-bold mb-4 text-blue-900" style={{ fontFamily: '"Lora", serif' }}>
                      Our Vision
                    </Title>
                    
                    <Text size="lg" className="text-blue-800 leading-relaxed">
                      To create a world where natural wellness is accessible to all, where 
                      sustainable farming thrives, and where every person can experience 
                      the transformative power of pure Moringa in their daily life.
                    </Text>
                  </Card>
                </motion.div>
              </Grid.Col>
            </Grid>
          </Container>
        </section>

        {/* Company Values */}
        <section 
          className="py-20"
          style={{
            background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)'
          }}
        >
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Title 
                order={2} 
                className="text-4xl font-bold mb-6"
                style={{ 
                  fontFamily: '"Lora", serif',
                  color: '#374151'
                }}
              >
                Our Core Values
              </Title>
              <Text size="xl" className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do – from farm to your family
              </Text>
            </motion.div>

            <Grid gutter="xl">
              {values.map((value, index) => (
                <Grid.Col key={value.title} span={{ base: 12, md: 6, lg: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center p-8 h-full bg-white border-0 hover:shadow-lg transition-shadow" radius="xl">
                      <ThemeIcon 
                        size={70} 
                        radius="xl" 
                        className="mx-auto mb-4"
                        style={{ backgroundColor: value.color }}
                      >
                        <value.icon className="w-8 h-8" />
                      </ThemeIcon>
                      
                      <Title order={4} className="text-xl font-bold mb-3" style={{ color: value.color }}>
                        {value.title}
                      </Title>
                      
                      <Text className="text-gray-600 leading-relaxed">
                        {value.description}
                      </Text>
                    </Card>
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </section>

        {/* Company Timeline */}
        <section className="py-20 bg-white">
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Title 
                order={2} 
                className="text-4xl font-bold mb-6"
                style={{ 
                  fontFamily: '"Lora", serif',
                  color: '#374151'
                }}
              >
                Our Journey
              </Title>
              <Text size="xl" className="text-gray-600 max-w-2xl mx-auto">
                Every step forward has been driven by our commitment to your wellness
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Timeline active={4} bulletSize={60} lineWidth={4} color="emerald">
                {milestones.map((milestone, index) => (
                  <Timeline.Item
                    key={milestone.year}
                    bullet={
                      <ThemeIcon size={60} radius="xl" className="bg-emerald-600">
                        <milestone.icon className="w-6 h-6" />
                      </ThemeIcon>
                    }
                    title={
                      <div className="flex items-center gap-4 mb-2">
                        <Badge size="lg" className="bg-emerald-100 text-emerald-800">
                          {milestone.year}
                        </Badge>
                        <Title order={4} className="text-xl font-bold text-gray-800">
                          {milestone.title}
                        </Title>
                      </div>
                    }
                  >
                    <Text size="lg" className="text-gray-600 mb-6 leading-relaxed">
                      {milestone.description}
                    </Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            </motion.div>
          </Container>
        </section>

        {/* Leadership Team */}
        <section 
          className="py-20"
          style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #dcfce7 100%)'
          }}
        >
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Title 
                order={2} 
                className="text-4xl font-bold mb-6"
                style={{ 
                  fontFamily: '"Lora", serif',
                  color: '#374151'
                }}
              >
                Meet Our Leadership
              </Title>
              <Text size="xl" className="text-gray-600 max-w-2xl mx-auto">
                The passionate minds dedicated to bringing you pure wellness
              </Text>
            </motion.div>

            <Grid gutter="xl">
              {leadership.map((member, index) => (
                <Grid.Col key={member.name} span={{ base: 12, md: 6, lg: 4 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center p-8 bg-white border-0 hover:shadow-lg transition-all" radius="xl">
                      <Image
                        src={member.image}
                        alt={member.name}
                        radius="xl"
                        className="w-24 h-24 mx-auto mb-4 object-cover"
                      />
                      
                      <Title order={4} className="text-xl font-bold mb-2 text-gray-800">
                        {member.name}
                      </Title>
                      
                      <Badge size="md" className="mb-4 bg-emerald-100 text-emerald-800">
                        {member.role}
                      </Badge>
                      
                      <Text className="text-gray-600 mb-4 leading-relaxed">
                        {member.bio}
                      </Text>
                      
                      <Text size="sm" className="text-emerald-600 font-medium">
                        {member.specialization}
                      </Text>
                    </Card>
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-12 text-white">
                <IconHeart className="w-16 h-16 mx-auto mb-6 text-emerald-200" />
                
                <Title 
                  order={2} 
                  className="text-3xl md:text-4xl font-bold mb-6"
                  style={{ fontFamily: '"Lora", serif' }}
                >
                  Ready to Transform Your Health?
                </Title>
                
                <Text size="xl" className="mb-8 text-emerald-100 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of others who have discovered the life-changing power of pure Moringa. 
                  Your wellness journey starts with a single choice.
                </Text>
                
                <Group justify="center" gap="md">
                  <Button
                    size="lg"
                    radius="xl"
                    className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8"
                    onClick={() => navigate('/products')}
                  >
                    Explore Products
                  </Button>
                  <Button
                    size="lg"
                    radius="xl"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-emerald-700 font-semibold px-8"
                    onClick={() => navigate('/contact')}
                  >
                    Contact Us
                  </Button>
                </Group>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <ModernFooter />
    </>
  );
};

export default AboutPage;
