// Dbanyan Group - Modern Products Listing Page
// Premium e-commerce product showcase with advanced filtering

import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Container, 
  Title, 
  Text, 
  Grid, 
  Card, 
  Button, 
  Badge, 
  Loader, 
  Alert,
  Select,
  TextInput,
  Group,
  Stack,
  ActionIcon,
  Rating,
  Divider,
  Chip,
  NumberInput
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useCartStore, useUIStore } from '../store';
import { apiClient } from '../api';
import CartIndicator from '../components/layout/CartIndicator';
import { 
  IconSearch, 
  IconFilter, 
  IconHeart, 
  IconShoppingCart,
  IconEye,
  IconStar,
  IconTruck,
  IconShield,
  IconLeaf,
  IconAward,
  IconPlus,
  IconMinus,
  IconX
} from '@tabler/icons-react';

// Mock extended product data - will be replaced with real API
const fetchAllProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: 1,
      name: 'Moringa Powder',
      price: 299,
      originalPrice: 399,
      image: '/images/moringa-powder.jpg',
      description: 'Pure, nutrient-rich moringa powder for daily wellness.',
      category: 'Powder',
      inStock: true,
      quantity: 50,
      rating: 4.8,
      reviews: 124,
      benefits: ['High in Vitamin C', 'Antioxidant Rich', 'Natural Energy Boost'],
      weight: '100g'
    },
    {
      id: 2,
      name: 'Moringa Paste',
      price: 349,
      originalPrice: 449,
      image: '/images/moringa-paste.jpg',
      description: 'Fresh moringa paste for culinary and health uses.',
      category: 'Paste',
      inStock: true,
      quantity: 30,
      rating: 4.7,
      reviews: 98,
      benefits: ['Culinary Use', 'Nutrient Dense', 'Versatile'],
      weight: '200g'
    },
    {
      id: 3,
      name: 'Moringa Drumstick',
      price: 199,
      originalPrice: 249,
      image: '/images/moringa-drumstick.jpg',
      description: 'Nutritious moringa drumsticks (pods) for cooking.',
      category: 'Drumstick',
      inStock: true,
      quantity: 40,
      rating: 4.6,
      reviews: 89,
      benefits: ['Rich in Fiber', 'Traditional', 'Healthy'],
      weight: '500g'
    },
    {
      id: 4,
      name: 'Moringa Dry Flower',
      price: 259,
      originalPrice: 329,
      image: '/images/moringa-dry-flower.jpg',
      description: 'Dried moringa flowers for tea and wellness.',
      category: 'Dry Flower',
      inStock: true,
      quantity: 20,
      rating: 4.5,
      reviews: 67,
      benefits: ['Tea', 'Antioxidants', 'Wellness'],
      weight: '50g'
    }
  ];
};

const ProductsPage = () => {
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addItem);
  const addNotification = useUIStore(state => state.addNotification);
  
  // Enhanced state for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());

  // Fetch products using TanStack Query (Protocol 1.3)
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  // Enhanced filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBenefits = selectedBenefits.length === 0 || 
                             selectedBenefits.some(benefit => product.benefits?.includes(benefit));
      
      return matchesSearch && matchesCategory && matchesPrice && matchesBenefits;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
          const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
          return discountB - discountA;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy, priceRange, selectedBenefits]);

  // Get unique categories and benefits
  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return [
      { value: 'all', label: 'All Products' },
      ...uniqueCategories.map(cat => ({ value: cat, label: cat }))
    ];
  }, [products]);

  const allBenefits = useMemo(() => {
    if (!products) return [];
    const benefits = new Set();
    products.forEach(product => {
      product.benefits?.forEach(benefit => benefits.add(benefit));
    });
    return Array.from(benefits);
  }, [products]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    if (product.inStock) {
      try {
        addToCart(product, 1);
        addNotification({
          title: 'Added to Cart',
          message: `${product.name} has been added to your cart!`,
          type: 'success'
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
        addNotification({
          title: 'Error',
          message: 'Failed to add item to cart. Please try again.',
          type: 'error'
        });
      }
    }
  };

  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const handleBenefitToggle = (benefit) => {
    setSelectedBenefits(prev => 
      prev.includes(benefit) 
        ? prev.filter(b => b !== benefit)
        : [...prev, benefit]
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Stack align="center" spacing="md">
          <Loader size="lg" color="#2C5F2D" />
          <Text style={{ fontFamily: '"Inter", sans-serif' }}>
            Loading our premium Moringa products...
          </Text>
        </Stack>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Container size="sm">
          <Alert color="red" title="Unable to load products">
            {error?.message || 'Something went wrong. Please try again later.'}
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Premium Moringa Products | Dbanyan Group | Natural Health Supplements</title>
        <meta 
          name="description" 
          content="Discover our complete range of premium, preservative-free Moringa products. From leaf powder to oils, find the perfect natural health supplement for your wellness journey." 
        />
        <meta name="keywords" content="Moringa Products, Natural Supplements, Preservative-Free, Organic Health Products, Moringa Oil, Moringa Powder" />
      </Helmet>

      <main 
        className="relative min-h-screen flex flex-col items-center overflow-hidden py-8"
        style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #dcfce7 100%)'
        }}
      >
        {/* Organic background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-emerald-300 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-green-300 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-emerald-400 blur-2xl" />
        </div>
        <Container size="xl" className="relative z-10">
          {/* Page Header */}
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Title 
              order={1} 
              className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ 
                fontFamily: '"Lora", serif',
                color: '#2C5F2D'
              }}
            >
              Our Premium Moringa Collection
            </Title>
            <Text 
              size="xl" 
              className="max-w-3xl mx-auto leading-relaxed mb-4"
              style={{ 
                fontFamily: '"Inter", sans-serif',
                color: '#333333'
              }}
            >
              Discover the complete range of our carefully crafted, preservative-free Moringa products. 
              Each item is created with the highest quality standards to support your natural wellness journey.
            </Text>
            
          </div>

          {/* Filters and Search */}
          <Card className="mb-8 p-6" style={{ backgroundColor: 'white' }}>
            <Group spacing="md" grow>
              <TextInput
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  input: {
                    borderColor: '#E0E0E0',
                    '&:focus': { borderColor: '#2C5F2D' }
                  }
                }}
              />
              
              <Select
                placeholder="Category"
                data={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                style={{
                  input: {
                    borderColor: '#E0E0E0',
                    '&:focus': { borderColor: '#2C5F2D' }
                  }
                }}
              />
              
              <Select
                placeholder="Sort by"
                data={[
                  { value: 'name', label: 'Name (A-Z)' },
                  { value: 'price-low', label: 'Price (Low to High)' },
                  { value: 'price-high', label: 'Price (High to Low)' },
                  { value: 'rating', label: 'Customer Rating' }
                ]}
                value={sortBy}
                onChange={setSortBy}
                style={{
                  input: {
                    borderColor: '#E0E0E0',
                    '&:focus': { borderColor: '#2C5F2D' }
                  }
                }}
              />
            </Group>
          </Card>

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid gutter="xl">
              {filteredProducts.map((product) => (
                <Grid.Col key={product.id} span={{ base: 12, sm: 6, lg: 3 }}>
                  <motion.div variants={cardVariants}>
                    <Card
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                      style={{ backgroundColor: 'white' }}
                      onClick={() => handleProductClick(product.id)}
                    >
                      {/* Product Image */}
                      <Card.Section>
                        <div 
                          className="h-64 bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center relative"
                        >
                          {/* Discount Badge */}
                          {product.originalPrice > product.price && (
                            <Badge
                              className="absolute top-3 left-3 z-10"
                              color="red"
                              variant="filled"
                            >
                              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </Badge>
                          )}
                          
                          {/* Stock Status Badge */}
                          <Badge
                            className="absolute top-3 right-3 z-10"
                            color={product.inStock ? 'green' : 'red'}
                            variant="light"
                          >
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>

                          <Text size="sm" color="dimmed" style={{ fontFamily: '"Inter", sans-serif' }}>
                            Product Image
                          </Text>
                        </div>
                      </Card.Section>

                      <Stack spacing="sm" className="mt-4">
                        {/* Category & Weight */}
                        <Group justify="space-between" align="flex-start">
                          <Badge size="sm" color="blue" variant="light">
                            {product.category}
                          </Badge>
                          <Text size="sm" color="dimmed" style={{ fontFamily: '"Inter", sans-serif' }}>
                            {product.weight}
                          </Text>
                        </Group>

                        {/* Product Name */}
                        <Title 
                          order={3} 
                          size="h4"
                          className="line-clamp-2"
                          style={{ 
                            fontFamily: '"Lora", serif',
                            color: '#333333'
                          }}
                        >
                          {product.name}
                        </Title>

                        {/* Rating & Reviews */}
                        <Group spacing="xs">
                          <Text 
                            size="sm" 
                            weight={600}
                            style={{ color: '#FFBF00' }}
                          >
                            ★ {product.rating}
                          </Text>
                          <Text 
                            size="sm" 
                            color="dimmed"
                            style={{ fontFamily: '"Inter", sans-serif' }}
                          >
                            ({product.reviews} reviews)
                          </Text>
                        </Group>

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

                        {/* Benefits */}
                        <div className="flex flex-wrap gap-1">
                          {product.benefits.slice(0, 2).map((benefit, index) => (
                            <Badge
                              key={index}
                              size="xs"
                              variant="outline"
                              style={{ borderColor: '#2C5F2D', color: '#2C5F2D' }}
                            >
                              {benefit}
                            </Badge>
                          ))}
                        </div>

                        {/* No Preservatives Badge */}
                        <Badge 
                          color="yellow" 
                          variant="filled"
                          style={{ backgroundColor: '#FFBF00', color: '#333333' }}
                        >
                          No Preservatives
                        </Badge>

                        {/* Price */}
                        <Group spacing="xs" align="center">
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
                          {product.originalPrice > product.price && (
                            <Text 
                              size="md" 
                              style={{ 
                                textDecoration: 'line-through',
                                color: '#999999',
                                fontFamily: '"Inter", sans-serif'
                              }}
                            >
                              ₹{product.originalPrice}
                            </Text>
                          )}
                        </Group>

                        {/* Action Buttons */}
                        <Stack spacing="xs" className="mt-4">
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
                              handleProductClick(product.id);
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
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </Stack>
                      </Stack>
                    </Card>
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>
          </motion.div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Text 
                size="lg" 
                style={{ 
                  fontFamily: '"Inter", sans-serif',
                  color: '#333333'
                }}
              >
                No products found matching your criteria.
              </Text>
            </div>
          )}
        </Container>
        
        {/* Cart Indicator for testing */}
        <CartIndicator />
      </main>
    </>
  );
};

export default ProductsPage;
