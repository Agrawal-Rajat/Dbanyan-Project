// Dbanyan Group - Company Quote Section
// Inspiring and life-changing narrative for authentic engagement

import React from 'react';
import { Container, Title, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconQuote } from '@tabler/icons-react';

const CompanyQuoteSection = () => {
  return (
    <section 
      className="py-20"
      style={{
        background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container size="lg" className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm">
              <IconQuote className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Main Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center"
          >
            <Title 
              order={2} 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight text-center"
              style={{ 
                fontFamily: '"Lora", serif',
                fontStyle: 'italic',
                textAlign: 'center',
                width: '100%',
                margin: '0 auto'
              }}
            >
              "We believe that nature holds the key to vibrant health. 
              Our mission is to bring you the purest Moringa products 
              that don't just nourish your body, but transform your life."
            </Title>
          </motion.div>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Text 
              size="xl" 
              className="text-emerald-100 font-medium mb-2"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              — Dbanyan Group Founders
            </Text>
            <Text 
              size="lg" 
              className="text-emerald-200/80"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Committed to Your Wellness Journey
            </Text>
          </motion.div>

          {/* Inspiring Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto text-center flex flex-col items-center justify-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Text 
                size="lg" 
                className="text-white leading-relaxed"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Every leaf we harvest, every product we create, and every relationship we build 
                is guided by one simple truth: <strong>your health transformation matters</strong>. 
                When you choose Dbanyan, you\'re not just buying Moringa – you\'re investing in 
                a healthier, more energetic, and more vibrant version of yourself.
              </Text>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CompanyQuoteSection;
