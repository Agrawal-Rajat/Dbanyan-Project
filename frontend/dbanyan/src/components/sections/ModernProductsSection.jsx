// Dbanyan Group - Modern Products Section
// Clean product showcase with optimized performance

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Title, 
  Text, 
  Card, 
  Group, 
  Badge,
  Button,
  Box,
  Stack,
  Image
} from '@mantine/core';
import { 
  IconShoppingCart, 
  IconEye, 
  IconStar,
  IconLeaf,
  IconTrendingUp
} from '@tabler/icons-react';
import { useProducts } from '../../api';
import { useCartStore } from '../../store';
import { cartUtils } from '../../store';

const ModernProductsSection = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts({ featured: true, limit: 4 });
  const { addItem } = useCartStore();

  const handleAddToCart = (product) => {
    addItem(product, 1);
  };

  const handleViewProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  // Fallback data for when API is loading
  const fallbackProducts = [
    {
      uid: '1',
      name: 'Organic Moringa Powder',
      short_description: 'Pure, nutrient-rich powder for daily wellness',
      price: 299,
      compare_at_price: 399,
      images: [{ url: '/images/moringa-powder.jpg', alt_text: 'Moringa Powder' }],
      category: 'powder',
      is_preservative_free: true
    },
    {
      uid: '2',
      name: 'Moringa Capsules',
      short_description: 'Convenient daily supplement capsules',
      price: 449,
      compare_at_price: 549,
      images: [{ url: '/images/moringa-capsules.jpg', alt_text: 'Moringa Capsules' }],
      category: 'capsules',
      is_preservative_free: true
    },
    {
      uid: '3',
      name: 'Moringa Herbal Tea',
      short_description: 'Refreshing antioxidant-rich herbal tea',
      price: 199,
      compare_at_price: 249,
      images: [{ url: '/images/moringa-tea.jpg', alt_text: 'Moringa Tea' }],
      category: 'tea',
      is_preservative_free: true
    },
    {
      uid: '4',
      name: 'Moringa Seed Oil',
      short_description: 'Premium oil for skin and hair care',
      price: 599,
      compare_at_price: 749,
      images: [{ url: '/images/moringa-oil.jpg', alt_text: 'Moringa Oil' }],
      category: 'oil',
      is_preservative_free: true
    }
  ];

  const displayProducts = products?.data || fallbackProducts;

  return (
    <Box className="py-20 bg-white">
      <Container size="xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge 
            size="lg" 
            variant="light" 
            color="green"
            className="mb-4"
          >
            Premium Products
          </Badge>
          <Title 
            order={2} 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Our
            <Text component="span" className="text-emerald-600"> Signature </Text>
            Collection
          </Title>
          <Text 
            size="lg" 
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Carefully crafted Moringa products to support your wellness journey. 
            Each product is made with premium organic ingredients and rigorous quality standards.
          </Text>
        </motion.div>

        {/* Products Grid */}
        <Grid gutter="xl">
          {displayProducts.slice(0, 4).map((product, index) => (
            <Grid.Col key={product.uid} span={{ base: 12, sm: 6, lg: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 
                }}
                whileHover={{ y: -8 }}
              >
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="lg"
                  className="h-full bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <Card.Section className="relative overflow-hidden">
                    {/* Product Image */}
                    <Box className="relative h-64 bg-gradient-to-br from-emerald-50 to-green-100">
                      <Image
                        src={product.images?.[0]?.url || '/images/moringa-placeholder.jpg'}
                        alt={product.images?.[0]?.alt_text || product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        fallbackSrc="/images/moringa-placeholder.jpg"
                      />
                      
                      {/* Badges */}
                      <Box className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.is_preservative_free && (
                          <Badge 
                            size="sm" 
                            variant="filled" 
                            color="green"
                            leftSection={<IconLeaf size={12} />}
                          >
                            No Preservatives
                          </Badge>
                        )}
                        {product.compare_at_price && product.compare_at_price > product.price && (
                          <Badge 
                            size="sm" 
                            variant="filled" 
                            color="red"
                            leftSection={<IconTrendingUp size={12} />}
                          >
                            {Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}% OFF
                          </Badge>
                        )}
                      </Box>

                      {/* Hover Actions */}
                      <Box className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="xs"
                          variant="white"
                          className="shadow-lg"
                          onClick={() => handleViewProduct(product.uid)}
                          leftSection={<IconEye size={14} />}
                        >
                          View
                        </Button>
                      </Box>
                    </Box>
                  </Card.Section>

                  <Stack gap="sm" className="pt-4">
                    {/* Product Category */}
                    <Text size="xs" className="text-emerald-600 font-medium uppercase tracking-wide">
                      {product.category}
                    </Text>

                    {/* Product Name */}
                    <Title 
                      order={4} 
                      className="text-gray-800 font-semibold line-clamp-2"
                      style={{ fontFamily: 'Lora, serif' }}
                    >
                      {product.name}
                    </Title>

                    {/* Product Description */}
                    <Text 
                      size="sm" 
                      className="text-gray-600 line-clamp-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {product.short_description}
                    </Text>

                    {/* Rating (Mock for now) */}
                    <Group gap="xs">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <IconStar 
                          key={star} 
                          size={14} 
                          className="text-yellow-400 fill-current" 
                        />
                      ))}
                      <Text size="xs" className="text-gray-500">
                        (24 reviews)
                      </Text>
                    </Group>

                    {/* Pricing */}
                    <Group justify="space-between" align="center">
                      <Box>
                        <Group align="center" gap="xs">
                          <Text 
                            size="lg" 
                            className="font-bold text-gray-800"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {cartUtils.formatPrice(product.price)}
                          </Text>
                          {product.compare_at_price && product.compare_at_price > product.price && (
                            <Text 
                              size="sm" 
                              className="text-gray-500 line-through"
                            >
                              {cartUtils.formatPrice(product.compare_at_price)}
                            </Text>
                          )}
                        </Group>
                      </Box>
                    </Group>

                    {/* Add to Cart Button */}
                    <Button
                      variant="light"
                      color="green"
                      fullWidth
                      leftSection={<IconShoppingCart size={16} />}
                      onClick={() => handleAddToCart(product)}
                      className="mt-2"
                    >
                      Add to Cart
                    </Button>
                  </Stack>
                </Card>
              </motion.div>
            </Grid.Col>
          ))}
        </Grid>

        {/* View All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            variant="outline"
            color="green"
            onClick={handleViewAllProducts}
            className="px-8"
          >
            View All Products
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ModernProductsSection;
