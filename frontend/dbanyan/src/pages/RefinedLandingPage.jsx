// Dbanyan Group - Refined Landing Page
// Following project_context.md Section 2.1 and organic design reference

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Refined Sections
import OrganicHeroSection from '../components/sections/OrganicHeroSection';
import EnhancedMoringaTree from '../components/sections/EnhancedMoringaTree';
import MoringaBenefitsEducation from '../components/sections/MoringaBenefitsEducation';
import WellnessProductGrid from '../components/sections/WellnessProductGrid';
import VisionSection from '../components/sections/VisionSection';
import OrganicFooter from '../components/sections/OrganicFooter';

const RefinedLandingPage = () => {
  const navigate = useNavigate();

  // Page-level animation container
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      {/* Enhanced SEO Meta Tags */}
      <Helmet>
        <title>Dbanyan Group | Pure Moringa Products | Natural Health & Wellness</title>
        <meta 
          name="description" 
          content="Discover the pure power of Moringa with Dbanyan Group's preservative-free, organic health products. From leaf powder to oils, unlock your vitality naturally." 
        />
        <meta name="keywords" content="Moringa Products, Natural Health, Preservative-Free, Organic Supplements, Wellness, Vitality, Pure Moringa" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Dbanyan Group | Pure Moringa Products" />
        <meta property="og:description" content="Unlock your vitality with our premium, preservative-free Moringa products." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dbanyangroup.com" />
        
        {/* Enhanced Typography Loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </Helmet>

      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen"
        style={{ 
          background: 'linear-gradient(180deg, #F8FFF8 0%, #F0F9F0 50%, #E8F5E8 100%)'
        }}
      >
        {/* Section 1: Organic Hero - Full immersive experience */}
        <OrganicHeroSection />

        {/* Section 2: Enhanced Interactive Moringa Tree */}
        <section className="py-20" style={{ backgroundColor: 'rgba(248, 255, 248, 0.8)' }}>
          <EnhancedMoringaTree />
        </section>

        {/* Section 3: Educational Benefits Showcase */}
        <MoringaBenefitsEducation />

        {/* Section 4: Wellness-Focused Product Grid */}
        <WellnessProductGrid />

        {/* Section 5: The Dbanyan Vision */}
        <VisionSection />

        {/* Section 6: Organic Footer */}
        <OrganicFooter />
      </motion.main>
    </>
  );
};

export default RefinedLandingPage;
