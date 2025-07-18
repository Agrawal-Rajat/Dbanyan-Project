// Dbanyan Group - Wellness-Focused Product Grid
// Following project_context.md Section 2.1 FR1.5 & organic design reference
// Creating an engaging, educational product showcase experience

import React, { useState } from 'react';
import { Container, Title, Text, Card, Badge, Button, Group, Stack } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconStar, IconLeaf, IconShield, IconHeart } from '@tabler/icons-react';

const WellnessProductGrid = () => {
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Mock product data - Indian market with INR pricing
  const products = [
    {
      id: 1,
      name: "Moringa Capsules Premium",
      subtitle: "Daily Wellness Boost",
      price: 449.00,
      originalPrice: 599.00,
      description: "Pure moringa leaf powder in convenient capsules for daily nutrition and energy. Made with finest quality Indian moringa leaves.",
      benefits: ["Rich in Vitamins", "Natural Energy", "Immune Support"],
      image: "/api/placeholder/300/400",
      badge: "Best Seller",
      rating: 4.8,
      icon: <IconLeaf className="w-6 h-6 text-organic-forest-600" />
    },
    {
      id: 2,
      name: "Moringa Leaf Powder",
      subtitle: "Pure Organic Powder",
      price: 299.00,
      originalPrice: 399.00,
      description: "100% organic moringa leaf powder sourced from Kerala farms, perfect for smoothies and traditional Indian cooking.",
      benefits: ["Antioxidant Rich", "Digestive Health", "Nutrient Dense"],
      image: "/api/placeholder/300/400",
      badge: "Organic",
      rating: 4.9,
      icon: <IconShield className="w-6 h-6 text-organic-forest-600" />
    },
    {
      id: 3,
      name: "Moringa Herbal Tea",
      subtitle: "Ayurvedic Wellness Blend",
      price: 199.00,
      originalPrice: 249.00,
      description: "Soothing moringa tea blend with traditional Indian herbs for relaxation and natural wellness.",
      benefits: ["Calming Effect", "Metabolic Support", "Natural Detox"],
      image: "/api/placeholder/300/400",
      badge: "New",
      rating: 4.7,
      icon: <IconHeart className="w-6 h-6 text-organic-forest-600" />
    },
    {
      id: 4,
      name: "Moringa Beauty Oil",
      subtitle: "Cold-Pressed Elixir",
      price: 599.00,
      originalPrice: 749.00,
      description: "Cold-pressed moringa oil from organic Indian farms for skin and hair nourishment.",
      benefits: ["Skin Hydration", "Hair Strength", "Anti-Aging"],
      image: "/api/placeholder/300/400",
      badge: "Premium",
      rating: 4.8,
      icon: <IconStar className="w-6 h-6 text-organic-forest-600" />
    }
  ];

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
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-organic-sage-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-organic-sage-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-organic-earth-200 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-organic-amber-200 rounded-full blur-2xl" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Title 
            order={2} 
            className="text-5xl lg:text-6xl font-serif text-organic-forest-800 mb-6"
          >
            Crafted for Your Wellness
          </Title>
          <Text 
            size="xl" 
            className="text-organic-forest-600 leading-relaxed max-w-3xl mx-auto"
          >
            Discover our premium collection of pure, preservative-free Moringa products. 
            Each carefully crafted to deliver the complete nutrition your body deserves.
          </Text>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="group"
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
            >
              <Card
                className="h-full bg-white/80 backdrop-blur-sm border border-organic-sage-200 shadow-organic hover:shadow-organic-lg transition-all duration-500 group-hover:scale-[1.02] overflow-hidden"
                radius="xl"
                p={0}
              >
                {/* Product Image Container */}
                <div className="relative overflow-hidden bg-organic-sage-100 h-64">
                  {/* Badge */}
                  <Badge
                    className="absolute top-4 left-4 z-10 bg-organic-amber-500 text-white font-semibold"
                    radius="md"
                  >
                    {product.badge}
                  </Badge>

                  {/* Product Image */}
                  <div className="w-full h-full bg-gradient-to-br from-organic-sage-200 to-organic-sage-300 flex items-center justify-center">
                    <div className="text-6xl text-organic-forest-400">
                      {product.icon}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <AnimatePresence>
                    {hoveredProduct === product.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-organic-forest-900/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Button
                            size="lg"
                            className="bg-white text-organic-forest-800 hover:bg-organic-sage-50 font-semibold shadow-lg"
                            radius="lg"
                            onClick={() => navigate(`/products/${product.id}`)}
                          >
                            View Details
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Information */}
                <div className="p-6">
                  <Stack gap="md">
                    {/* Product Name & Subtitle */}
                    <div>
                      <Title order={3} className="text-xl font-serif text-organic-forest-800 mb-1">
                        {product.name}
                      </Title>
                      <Text size="sm" className="text-organic-forest-500 font-medium">
                        {product.subtitle}
                      </Text>
                    </div>

                    {/* Rating */}
                    <Group gap="xs">
                      {[...Array(5)].map((_, i) => (
                        <IconStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-organic-amber-500 fill-current'
                              : 'text-organic-sage-300'
                          }`}
                        />
                      ))}
                      <Text size="sm" className="text-organic-forest-600 ml-1">
                        {product.rating}
                      </Text>
                    </Group>

                    {/* Description */}
                    <Text size="sm" className="text-organic-forest-600 leading-relaxed">
                      {product.description}
                    </Text>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-1">
                      {product.benefits.map((benefit, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs border-organic-sage-300 text-organic-forest-600"
                          radius="sm"
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="pt-4 border-t border-organic-sage-200">
                      <Group justify="space-between" align="center">
                        <div>
                          <Group gap="sm" align="baseline">
                            <Text className="text-2xl font-bold text-organic-forest-800">
                              ₹{product.price.toFixed(0)}
                            </Text>
                            {product.originalPrice && (
                              <Text 
                                size="sm" 
                                className="text-organic-forest-400 line-through"
                              >
                                ₹{product.originalPrice.toFixed(0)}
                              </Text>
                            )}
                          </Group>
                          <Text size="xs" className="text-organic-forest-500">
                            Free shipping across India
                          </Text>
                        </div>
                        
                        <Button
                          className="bg-organic-amber-500 hover:bg-organic-amber-600 text-white font-semibold"
                          radius="lg"
                          size="sm"
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          Add to Cart
                        </Button>
                      </Group>
                    </div>
                  </Stack>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Educational Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card 
            className="bg-gradient-to-r from-organic-sage-100 to-organic-earth-100 border border-organic-sage-200 max-w-2xl mx-auto"
            radius="xl"
            p="xl"
          >
            <Stack gap="lg" align="center">
              <div className="w-16 h-16 bg-organic-forest-100 rounded-full flex items-center justify-center">
                <IconLeaf className="w-8 h-8 text-organic-forest-600" />
              </div>
              
              <div className="text-center">
                <Title order={3} className="text-2xl font-serif text-organic-forest-800 mb-3">
                  New to Moringa?
                </Title>
                <Text className="text-organic-forest-600 leading-relaxed mb-4">
                  Experience the wisdom of Ayurveda with our complete Moringa guide. 
                  Learn traditional Indian uses and modern benefits.
                </Text>
              </div>

              <Button
                size="lg"
                className="bg-organic-forest-600 hover:bg-organic-forest-700 text-white font-semibold"
                radius="lg"
                onClick={() => navigate('/moringa-guide')}
              >
                Learn About Moringa
              </Button>
            </Stack>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
};

export default WellnessProductGrid;
