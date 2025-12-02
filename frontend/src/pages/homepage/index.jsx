import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ClientLogoCarousel from './components/ClientLogoCarousel';
import AICapabilitiesShowcase from './components/AICapabilitiesShowcase';
import QuantifiedResults from './components/QuantifiedResults';
import InteractiveDemo from './components/InteractiveDemo';
import Footer from './components/Footer';

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>BCBP - AI-Powered Construction Takeoffs & Estimating Platform</title>
        <meta 
          name="description" 
          content="Transform construction workflows with BCBP AI-powered takeoff and estimating platform. Achieve 10x faster takeoffs with 99.2% accuracy. Start your free trial today." 
        />
        <meta name="keywords" content="construction takeoff, AI estimating, quantity surveying, construction software, building estimation, construction technology" />
        <meta property="og:title" content="BCBP - AI-Powered Construction Takeoffs & Estimating" />
        <meta property="og:description" content="Revolutionize your pre-construction workflows with intelligent automation that delivers 10x faster takeoffs and 99.2% accuracy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://BCBP.ai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BCBP - AI-Powered Construction Intelligence" />
        <meta name="twitter:description" content="Transform construction takeoffs with AI. 10x faster, 99.2% accurate." />
        <link rel="canonical" href="https://BCBP.ai" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="relative">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Client Logo Carousel */}
          <ClientLogoCarousel />
          
          {/* AI Capabilities Showcase */}
          <AICapabilitiesShowcase />
          
          {/* Interactive Demo */}
          <InteractiveDemo />
          
          {/* Quantified Results */}
          <QuantifiedResults />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Homepage;