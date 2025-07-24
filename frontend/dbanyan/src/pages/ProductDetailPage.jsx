// Dbanyan Group - Product Detail Page
// Implementing project_context.md Section 2.2 FR2.1-FR2.4
// Dynamic route for individual product with gallery, info, and purchase

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Container, 
  Grid, 
  Title, 
  Text, 
  Button, 
  Badge, 
  Card, 
  Group, 
  Stack,
  Divider,
  Alert,
  Loader,
  NumberInput,
  Tabs
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useCartStore, useUIStore } from '../store';
import CartIndicator from '../components/layout/CartIndicator';
import { IconLeaf } from '@tabler/icons-react';

// Mock API call for individual product (will be replaced with real API)
const fetchProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Mock detailed product data - matching our 4 main products
  const products = {
    1: {
      id: 1,
      name: 'Moringa Powder',
      price: 299,
      originalPrice: 399,
      images: [
        '/images/moringaPowderPic.jpg',
        '/images/moringaPowderPic.jpg',
        '/images/moringaPowderPic.jpg',
        '/images/moringaPowderPic.jpg'
      ],
      description: 'Pure, nutrient-rich moringa powder for daily wellness. Our premium Moringa Powder is made from carefully selected, organically grown Moringa leaves. Each batch is tested for purity and potency to ensure you receive the highest quality nutritional supplement.',
      category: 'Powder',
      inStock: true,
      quantity: 50,
      rating: 4.8,
      reviews: 124,
      weight: '100g',
      ingredients: [
        'Pure Moringa Oleifera Leaf Powder',
        'No artificial preservatives',
        'No artificial colors',
        'No added flavors'
      ],
      nutritionalInfo: {
        'Serving Size': '1 teaspoon (3g)',
        'Servings per Container': '33',
        'Calories': '9',
        'Protein': '2g',
        'Vitamin A': '15% DV',
        'Vitamin C': '12% DV',
        'Iron': '8% DV',
        'Calcium': '6% DV'
      },
      benefits: [
        'High in Vitamin C',
        'Antioxidant Rich', 
        'Natural Energy Boost',
        'Rich in vitamins A, C, and E',
        'Supports immune system',
        'Promotes healthy skin'
      ],
      usage: 'Mix 1-2 teaspoons with water, juice, or smoothies daily. Best taken with meals.',
      certifications: ['Organic', 'Non-GMO', 'Gluten-Free', 'Vegan'],
      shelfLife: '18 months from manufacturing date',
      storage: 'Store in a cool, dry place away from direct sunlight'
    },
    2: {
      id: 2,
      name: 'Moringa Paste',
      price: 349,
      originalPrice: 449,
      images: ['/images/moringaPastePic.jpg', '/images/moringaPastePic.jpg'],
      description: 'Fresh moringa paste for culinary and health uses. Premium quality Moringa paste made from fresh leaves, perfect for cooking and direct consumption.',
      category: 'Paste',
      inStock: true,
      quantity: 30,
      rating: 4.7,
      reviews: 98,
      weight: '200g',
      ingredients: ['Fresh Moringa Leaves', 'Natural preservatives'],
      benefits: ['Culinary Use', 'Nutrient Dense', 'Versatile', 'Fresh taste', 'Ready to use'],
      usage: 'Use 1-2 tablespoons in cooking or mix with water/juice. Can be added to curries, soups, or consumed directly.',
      certifications: ['Fresh', 'Natural'],
      nutritionalInfo: {
        'Serving Size': '1 tablespoon (15g)',
        'Protein': '8g per 100g',
        'Fresh nutrients': 'Preserved'
      },
      shelfLife: '6 months refrigerated',
      storage: 'Refrigerate after opening'
    },
    3: {
      id: 3,
      name: 'Moringa Drumstick',
      price: 199,
      originalPrice: 249,
      images: ['/images/moringaFruitPic.jpg', '/images/moringaFruitPic.jpg'],
      description: 'Nutritious moringa drumsticks (pods) for cooking. Fresh moringa drumsticks perfect for traditional cooking and rich in nutrients.',
      category: 'Drumstick',
      inStock: true,
      quantity: 40,
      rating: 4.6,
      reviews: 89,
      weight: '500g',
      ingredients: ['Fresh Moringa Pods (Drumsticks)'],
      benefits: ['Rich in Fiber', 'Traditional', 'Healthy', 'Vitamin C rich', 'Good for digestion'],
      usage: 'Use in curries, sambar, soups. Cut into pieces and cook like any vegetable.',
      certifications: ['Fresh', 'Natural', 'Pesticide-Free'],
      nutritionalInfo: {
        'Serving Size': '100g',
        'Fiber': '3.2g per 100g',
        'Vitamin C': '120mg per 100g',
        'Protein': '2.1g per 100g'
      },
      shelfLife: '1 week fresh',
      storage: 'Refrigerate and use within a week'
    },
    4: {
      id: 4,
      name: 'Moringa Dry Flower',
      price: 259,
      originalPrice: 329,
      images: ['/images/moringaFlowerPic.jpg', '/images/moringaFlowerPic.jpg'],
      description: 'Dried moringa flowers for tea and wellness. Premium dried moringa flowers perfect for brewing nutritious herbal tea.',
      category: 'Dry Flower',
      inStock: true,
      quantity: 20,
      rating: 4.5,
      reviews: 67,
      weight: '50g',
      ingredients: ['100% Dried Moringa Flowers'],
      benefits: ['Tea', 'Antioxidants', 'Wellness', 'Relaxing', 'Digestive support'],
      usage: 'Steep 1 teaspoon in hot water for 5-7 minutes. Can be consumed 2-3 times daily.',
      certifications: ['Natural', 'Caffeine-Free'],
      nutritionalInfo: {
        'Serving Size': '1 teaspoon (2g)',
        'Antioxidants': 'High',
        'Caffeine': '0mg'
      },
      shelfLife: '24 months from manufacturing date',
      storage: 'Store in a cool, dry place in airtight container'
    }
  };
  
  const product = products[parseInt(id)];
  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }
  
  return product;
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addItem);
  const addNotification = useUIStore(state => state.addNotification);
  
  console.log('ProductDetailPage - Product ID from URL:', id);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Fetch product data using TanStack Query (Protocol 1.3)
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const handleAddToCart = () => {
    if (product && product.inStock) {
      try {
        addToCart(product, quantity);
        addNotification({
          title: 'Added to Cart',
          message: `${quantity}x ${product.name} added to your cart!`,
          type: 'success'
        });
        console.log('Product added to cart from detail page:', product.name, 'Quantity:', quantity);
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

  const handleBuyNow = () => {
    if (product && product.inStock) {
      try {
        addToCart(product, quantity);
        addNotification({
          title: 'Proceeding to Checkout',
          message: `${quantity}x ${product.name} added. Redirecting to checkout...`,
          type: 'success'
        });
        // For now, just go to checkout page
        navigate('/checkout');
      } catch (error) {
        console.error('Error processing buy now:', error);
        addNotification({
          title: 'Error',
          message: 'Failed to process purchase. Please try again.',
          type: 'error'
        });
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Stack align="center" spacing="md">
          <Loader size="lg" color="#2C5F2D" />
          <Text style={{ fontFamily: '"Inter", sans-serif' }}>
            Loading product details...
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
          <Alert color="red" title="Product Not Found">
            {error?.message || 'The product you are looking for does not exist.'}
            <Button 
              mt="md" 
              onClick={() => navigate('/products')}
              style={{ backgroundColor: '#2C5F2D' }}
            >
              Back to Products
            </Button>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags - FR2.2 Implementation */}
      <Helmet>
        <title>{product.name} | Dbanyan Group | Premium Moringa Products</title>
        <meta 
          name="description" 
          content={`${product.description.substring(0, 160)}...`}
        />
        <meta name="keywords" content={`${product.name}, Moringa, Natural Health, ${product.category}, Preservative-Free`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price} />
        <meta property="product:price:currency" content="INR" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 py-8">
        <Container size="xl">
          {/* Back Button */}
          <Button
            variant="subtle"
            leftSection={<span>←</span>}
            onClick={() => navigate('/products')}
            className="mb-4"
            style={{ color: '#2C5F2D' }}
          >
            Back to Products
          </Button>
          
          {/* Breadcrumb */}
          <Group spacing="xs" className="mb-6">
            <Text 
              className="cursor-pointer hover:text-green-600"
              onClick={() => navigate('/')}
              style={{ fontFamily: '"Inter", sans-serif', color: '#666666' }}
            >
              Home
            </Text>
            <Text style={{ color: '#666666' }}>/</Text>
            <Text 
              className="cursor-pointer hover:text-green-600"
              onClick={() => navigate('/products')}
              style={{ fontFamily: '"Inter", sans-serif', color: '#666666' }}
            >
              Products
            </Text>
            <Text style={{ color: '#666666' }}>/</Text>
            <Text 
              style={{ fontFamily: '"Inter", sans-serif', color: '#2C5F2D' }}
            >
              {product.name}
            </Text>
          </Group>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <Grid gutter="xl">
              {/* Left Column - Image Gallery (FR2.1) */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <motion.div variants={fadeInUp}>
                  <Stack spacing="md">
                    {/* Main Image */}
                    <Card className="p-0 shadow-lg border border-green-100" style={{ backgroundColor: 'white' }}>
                      <div className="h-96 bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 flex items-center justify-center rounded-lg relative overflow-hidden">
                        {/* Discount Badge */}
                        {product.originalPrice > product.price && (
                          <Badge
                            className="absolute top-4 left-4 z-10 bg-red-500 text-white shadow-lg"
                            size="lg"
                          >
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </Badge>
                        )}
                        
                        {/* Stock Status Badge */}
                        <Badge
                          className={`absolute top-4 right-4 z-10 shadow-lg ${
                            product.inStock 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-400 text-white'
                          }`}
                          size="lg"
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                        
                        {/* Enhanced Product Image */}
                        <div className="relative h-96 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl overflow-hidden flex items-center justify-center">
                          <img
                            src={product.images[selectedImageIndex] || product.images[0]}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain"
                            style={{
                              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))'
                            }}
                            onError={(e) => {
                              console.error('Product image failed to load:', e.target.src);
                              // Fallback to placeholder
                              e.target.style.display = 'none';
                              const placeholder = e.target.parentNode.querySelector('.image-placeholder');
                              if (placeholder) placeholder.style.display = 'flex';
                            }}
                          />
                          
                          {/* Fallback placeholder (hidden by default) */}
                          <div className="image-placeholder absolute inset-0 flex flex-col items-center justify-center" style={{ display: 'none' }}>
                            <div className="w-32 h-32 bg-green-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                              <IconLeaf className="w-16 h-16 text-green-600" />
                            </div>
                            <Text size="lg" className="text-green-700 font-semibold">
                              {product.name}
                            </Text>
                            <Text size="sm" className="text-green-600">
                              100% Natural & Pure
                            </Text>
                          </div>
                          
                          {/* Decorative Elements */}
                          <div className="absolute top-20 left-8 w-16 h-16 bg-green-200 rounded-full opacity-30"></div>
                          <div className="absolute bottom-16 right-12 w-12 h-12 bg-emerald-200 rounded-full opacity-40"></div>
                        </div>
                      </div>
                    </Card>

                    {/* Thumbnail Images */}
                    {product.images && product.images.length > 1 && (
                      <Grid gutter="xs">
                        {product.images.map((image, index) => (
                          <Grid.Col key={index} span={3}>
                            <Card 
                              className={`p-2 cursor-pointer transition-all duration-200 ${
                                selectedImageIndex === index 
                                  ? 'ring-2 ring-green-500' 
                                  : 'hover:ring-1 hover:ring-green-300'
                              }`}
                              onClick={() => setSelectedImageIndex(index)}
                            >
                              <div className="h-20 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center rounded overflow-hidden">
                                <img
                                  src={image}
                                  alt={`${product.name} view ${index + 1}`}
                                  className="max-w-full max-h-full object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    const fallback = document.createElement('div');
                                    fallback.className = 'text-xs text-gray-600 font-medium';
                                    fallback.textContent = `${index + 1}`;
                                    e.target.parentNode.appendChild(fallback);
                                  }}
                                />
                              </div>
                            </Card>
                          </Grid.Col>
                        ))}
                      </Grid>
                    )}
                  </Stack>
                </motion.div>
              </Grid.Col>

              {/* Right Column - Product Information (FR2.2) */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <motion.div variants={fadeInUp}>
                  <Stack spacing="md">
                    {/* Stock Status & Category */}
                    <Group justify="space-between">
                      <Badge 
                        color={product.inStock ? 'green' : 'red'} 
                        variant="light"
                        size="lg"
                      >
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                      <Badge size="md" color="blue" variant="light">
                        {product.category}
                      </Badge>
                    </Group>

                    {/* Product Name */}
                    <Title 
                      order={1} 
                      className="text-3xl lg:text-4xl font-bold"
                      style={{ 
                        fontFamily: '"Lora", serif',
                        color: '#2C5F2D'
                      }}
                    >
                      {product.name}
                    </Title>

                    {/* Rating & Reviews */}
                    <Group spacing="sm">
                      <Group spacing="xs">
                        <Text 
                          size="lg" 
                          weight={600}
                          style={{ color: '#FFBF00' }}
                        >
                          ★ {product.rating}
                        </Text>
                        <Text 
                          size="md" 
                          color="dimmed"
                          style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                          ({product.reviews} reviews)
                        </Text>
                      </Group>
                    </Group>

                    {/* "No Preservatives" Highlight - FR2.3 */}
                    <Alert
                      color="yellow"
                      title="100% Natural & Pure"
                      style={{ 
                        backgroundColor: '#FFBF00', 
                        color: '#333333',
                        border: 'none'
                      }}
                    >
                      <Text weight={600} style={{ fontFamily: '"Inter", sans-serif' }}>
                        ✅ No Preservatives • ✅ No Artificial Colors • ✅ No Added Chemicals
                      </Text>
                    </Alert>

                    {/* Price */}
                    <Group spacing="md" align="center">
                      <Text 
                        size="2xl" 
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
                          size="xl" 
                          style={{ 
                            textDecoration: 'line-through',
                            color: '#999999',
                            fontFamily: '"Inter", sans-serif'
                          }}
                        >
                          ₹{product.originalPrice}
                        </Text>
                      )}
                      <Text 
                        size="sm" 
                        color="dimmed"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                      >
                        ({product.weight})
                      </Text>
                    </Group>

                    {/* Short Description */}
                    <Text 
                      size="lg" 
                      className="leading-relaxed"
                      style={{ 
                        fontFamily: '"Inter", sans-serif',
                        color: '#333333'
                      }}
                    >
                      {product.description}
                    </Text>

                    {/* Key Benefits */}
                    {product.benefits && (
                      <div>
                        <Title 
                          order={4} 
                          className="mb-3"
                          style={{ 
                            fontFamily: '"Lora", serif',
                            color: '#2C5F2D'
                          }}
                        >
                          Key Benefits
                        </Title>
                        <Grid gutter="xs">
                          {product.benefits.slice(0, 6).map((benefit, index) => (
                            <Grid.Col key={index} span={6}>
                              <Text 
                                size="sm"
                                className="flex items-center"
                                style={{ fontFamily: '"Inter", sans-serif' }}
                              >
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                {benefit}
                              </Text>
                            </Grid.Col>
                          ))}
                        </Grid>
                      </div>
                    )}

                    <Divider />

                    {/* Quantity Selection & Add to Cart (FR2.4) */}
                    <Stack spacing="md">
                      <Group spacing="md" align="center">
                        <Text 
                          weight={600}
                          style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                          Quantity:
                        </Text>
                        <NumberInput
                          value={quantity}
                          onChange={setQuantity}
                          min={1}
                          max={product.quantity}
                          disabled={!product.inStock}
                          style={{ width: '120px' }}
                        />
                        <Text 
                          size="sm" 
                          color="dimmed"
                          style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                          {product.quantity} available
                        </Text>
                      </Group>

                      {/* Action Buttons - FR2.4 Implementation */}
                      <Group spacing="md" grow>
                        <Button
                          size="lg"
                          variant="outline"
                          radius="md"
                          disabled={!product.inStock}
                          style={{
                            borderColor: product.inStock ? '#2C5F2D' : '#E0E0E0',
                            color: product.inStock ? '#2C5F2D' : '#999999'
                          }}
                          onClick={handleAddToCart}
                        >
                          Add to Cart
                        </Button>
                        
                        <Button
                          size="lg"
                          radius="md"
                          disabled={!product.inStock}
                          style={{
                            backgroundColor: product.inStock ? '#FFBF00' : '#E0E0E0',
                            color: product.inStock ? '#333333' : '#999999'
                          }}
                          onClick={handleBuyNow}
                        >
                          {product.inStock ? 'Buy Now' : 'Out of Stock'}
                        </Button>
                      </Group>
                    </Stack>

                    {/* Certifications */}
                    {product.certifications && (
                      <Group spacing="xs">
                        {product.certifications.map((cert, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            style={{ borderColor: '#2C5F2D', color: '#2C5F2D' }}
                          >
                            {cert}
                          </Badge>
                        ))}
                      </Group>
                    )}
                  </Stack>
                </motion.div>
              </Grid.Col>
            </Grid>

            {/* Detailed Information Tabs */}
            <motion.div variants={fadeInUp} className="mt-12">
              <Tabs defaultValue="ingredients" className="w-full">
                <Tabs.List>
                  <Tabs.Tab value="ingredients">Ingredients</Tabs.Tab>
                  {product.nutritionalInfo && <Tabs.Tab value="nutrition">Nutrition</Tabs.Tab>}
                  <Tabs.Tab value="usage">Usage & Storage</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="ingredients" pt="md">
                  <Card style={{ backgroundColor: 'white' }}>
                    <Title 
                      order={4} 
                      className="mb-4"
                      style={{ fontFamily: '"Lora", serif', color: '#2C5F2D' }}
                    >
                      Pure Ingredients
                    </Title>
                    <ul className="space-y-2">
                      {product.ingredients.map((ingredient, index) => (
                        <li 
                          key={index}
                          className="flex items-center"
                          style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Tabs.Panel>

                {product.nutritionalInfo && (
                  <Tabs.Panel value="nutrition" pt="md">
                    <Card style={{ backgroundColor: 'white' }}>
                      <Title 
                        order={4} 
                        className="mb-4"
                        style={{ fontFamily: '"Lora", serif', color: '#2C5F2D' }}
                      >
                        Nutritional Information
                      </Title>
                      <Grid gutter="sm">
                        {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                          <Grid.Col key={key} span={6}>
                            <Group justify="space-between">
                              <Text 
                                size="sm"
                                style={{ fontFamily: '"Inter", sans-serif' }}
                              >
                                {key}:
                              </Text>
                              <Text 
                                size="sm" 
                                weight={600}
                                style={{ fontFamily: '"Inter", sans-serif' }}
                              >
                                {value}
                              </Text>
                            </Group>
                          </Grid.Col>
                        ))}
                      </Grid>
                    </Card>
                  </Tabs.Panel>
                )}

                <Tabs.Panel value="usage" pt="md">
                  <Card style={{ backgroundColor: 'white' }}>
                    <Stack spacing="md">
                      <div>
                        <Title 
                          order={5} 
                          className="mb-2"
                          style={{ fontFamily: '"Lora", serif', color: '#2C5F2D' }}
                        >
                          How to Use
                        </Title>
                        <Text 
                          style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                          {product.usage}
                        </Text>
                      </div>
                      
                      {product.storage && (
                        <div>
                          <Title 
                            order={5} 
                            className="mb-2"
                            style={{ fontFamily: '"Lora", serif', color: '#2C5F2D' }}
                          >
                            Storage Instructions
                          </Title>
                          <Text 
                            style={{ fontFamily: '"Inter", sans-serif' }}
                          >
                            {product.storage}
                          </Text>
                        </div>
                      )}
                      
                      {product.shelfLife && (
                        <div>
                          <Title 
                            order={5} 
                            className="mb-2"
                            style={{ fontFamily: '"Lora", serif', color: '#2C5F2D' }}
                          >
                            Shelf Life
                          </Title>
                          <Text 
                            style={{ fontFamily: '"Inter", sans-serif' }}
                          >
                            {product.shelfLife}
                          </Text>
                        </div>
                      )}
                    </Stack>
                  </Card>
                </Tabs.Panel>
              </Tabs>
            </motion.div>
          </motion.div>
        </Container>
        
        {/* Cart Indicator */}
        <CartIndicator />
      </main>
    </>
  );
};

export default ProductDetailPage;
