// Dbanyan Group - Main App Component
// Following project_context.md architecture and routing setup

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Pages
import RefinedLandingPage from './pages/RefinedLandingPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import MoringaGuidePage from './pages/MoringaGuidePage';
import TestPage from './pages/TestPage';

// Components
import NotificationSystem from './components/layout/NotificationSystem';

// Placeholder components for future development
const AboutPage = () => <div className="min-h-screen flex items-center justify-center">About Page - Coming Soon</div>;
const ContactPage = () => <div className="min-h-screen flex items-center justify-center">Contact Page - Coming Soon</div>;

function App() {
  return (
    <>
      {/* Global SEO defaults */}
      <Helmet defaultTitle="Dbanyan Group | Pure Moringa Products | Natural Health & Wellness">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2C5F2D" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Helmet>

      {/* Main Application Routes */}
      <Routes>
        {/* Landing Page - Section 2.1 Implementation */}
        <Route path="/" element={<RefinedLandingPage />} />
        
        {/* Product System - Section 2.2 Implementation */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        
        {/* Comprehensive Moringa Guide */}
        <Route path="/moringa-guide" element={<MoringaGuidePage />} />
        
        {/* Test page for debugging */}
        <Route path="/test" element={<TestPage />} />
        
        {/* Future routes - to be implemented in subsequent phases */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: '"Lora", serif' }}>
                404 - Page Not Found
              </h1>
              <p className="text-gray-600" style={{ fontFamily: '"Inter", sans-serif' }}>
                The page you're looking for doesn't exist.
              </p>
            </div>
          </div>
        } />
      </Routes>
      
      {/* Global notification system */}
      <NotificationSystem />
    </>
  );
}

export default App;
