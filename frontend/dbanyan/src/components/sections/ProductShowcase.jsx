// Dbanyan Group - Product Showcase Section
// Implementing project_context.md Section 2.1 FR1.5
// Grid/carousel with 4 main products, using TanStack Query

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Title, Card, Text, Button, Badge, Grid, Loader, Alert } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store';

// Mock API call - will be replaced with real API (Protocol 1.3)
const fetchProducts = async () => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock product data following our brand - Indian market pricing
  return [
    {
      id: 1,
      name: 'Moringa Powder',
      price: 299,
      image: '/images/moringa-powder.jpg',
      description: 'Pure, nutrient-rich moringa powder for daily wellness.',
      inStock: true,
      quantity: 50
    },
    {
      id: 2,
      name: 'Moringa Paste',
      price: 349,
      image: '/images/moringa-paste.jpg',
      description: 'Fresh moringa paste for culinary and health uses.',
      inStock: true,
      quantity: 30
    },
    {
      id: 3,
      name: 'Moringa Drumstick',
      price: 199,
      image: '/images/moringa-drumstick.jpg',
      description: 'Nutritious moringa drumsticks (pods) for cooking.',
      inStock: true,
      quantity: 40
    },
    {
      id: 4,
      name: 'Moringa Dry Flower',
      price: 259,
      image: '/images/moringa-dry-flower.jpg',
      description: 'Dried moringa flowers for tea and wellness.',
      inStock: true,
      quantity: 20
    }
  ];
};

const ProductShowcase = () => {
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addItem);

  // TanStack Query for data fetching (Protocol 1.3)
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['featured-products'],
    queryFn: fetchProducts,
  });

  // Animation variants for staggered card animation (FR1.5)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleQuickAdd = (product) => {
    if (product.inStock) {
      addToCart(product, 1);
      // You would show a notification here
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <Container size="xl">
          <div className="text-center">
            <Loader size="lg" color="#2C5F2D" />
            <Text mt="md" style={{ fontFamily: '"Inter", sans-serif' }}>
              Loading our premium products...
            </Text>
          </div>
        </Container>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <Container size="xl">
          <Alert color="red" title="Unable to load products">
            {error?.message || 'Something went wrong. Please try again later.'}
          </Alert>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
      <Container size="xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <Title 
              order={2} 
              className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ 
                fontFamily: '"Lora", serif',
                color: '#2C5F2D'
              }}
            >
              Crafted for Your Wellness
            </Title>
            <Text 
              size="xl" 
              className="max-w-2xl mx-auto leading-relaxed"
              style={{ 
                fontFamily: '"Inter", sans-serif',
                color: '#333333'
              }}
            >
              Discover our carefully curated collection of premium Moringa products, 
              each crafted with purity and passion for your optimal health.
            </Text>
          </div>

          {/* Product Grid */}
          <Grid gutter="xl">
            {products?.map((product, index) => (
              <Grid.Col key={product.id} span={{ base: 12, sm: 6, lg: 3 }}>
                <motion.div variants={cardVariants}>
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    className="h-full transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: '#97BC62FF', // Pale Sage Green
                      cursor: 'pointer'
                    }}
                    onClick={() => handleViewDetails(product.id)}
                  >
                    {/* Product Image */}
                    <Card.Section>
                      <div 
                        className="h-48 bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center"
                        style={{ 
                          backgroundImage: `url(${product.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {/* Placeholder for actual product image */}
                        <Text size="sm" color="dimmed" style={{ fontFamily: '"Inter", sans-serif' }}>
                          Product Image
                        </Text>
                      </div>
                    </Card.Section>

                    <div className="mt-4 space-y-3">
                      {/* Stock Badge */}
                      <div className="flex justify-between items-start">
                        <Badge 
                          color={product.inStock ? 'green' : 'red'} 
                          variant="light"
                          size="sm"
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                        
                        {/* No Preservatives Badge */}
                        <Badge 
                          color="yellow" 
                          variant="filled"
                          size="sm"
                          style={{ backgroundColor: '#FFBF00' }}
                        >
                          No Preservatives
                        </Badge>
                      </div>

                      {/* Product Name */}
                      <Title 
                        order={3} 
                        size="h4"
                        style={{ 
                          fontFamily: '"Lora", serif',
                          color: '#333333'
                        }}
                      >
                        {product.name}
                      </Title>

                      {/* Description */}
                      <Text 
                        size="sm" 
                        className="line-clamp-2"
                        style={{ 
                          fontFamily: '"Inter", sans-serif',
                          color: '#333333'
                        }}
                      >
                        {product.description}
                      </Text>

                      {/* Price */}
                      <Text 
                        size="xl" 
                        weight={700}
                        style={{ 
                          fontFamily: '"Inter", sans-serif',
                          color: '#2C5F2D'
                        }}
                      >
                        ₹{product.price}
                      </Text>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-2">
                        <Button
                          fullWidth
                          variant="outline"
                          radius="md"
                          style={{
                            borderColor: '#2C5F2D',
                            color: '#2C5F2D'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(product.id);
                          }}
                        >
                          View Details
                        </Button>
                        
                        <Button
                          fullWidth
                          radius="md"
                          disabled={!product.inStock}
                          style={{
                            backgroundColor: product.inStock ? '#FFBF00' : '#E0E0E0',
                            color: product.inStock ? '#333333' : '#999999'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAdd(product);
                          }}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>

          {/* View All Products CTA */}
          <motion.div 
            className="text-center mt-16"
            variants={cardVariants}
          >
            <Button
              size="lg"
              radius="md"
              variant="outline"
              className="px-8"
              style={{
                borderColor: '#2C5F2D',
                color: '#2C5F2D'
              }}
              onClick={() => navigate('/products')}
            >
              View All Products
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ProductShowcase;
