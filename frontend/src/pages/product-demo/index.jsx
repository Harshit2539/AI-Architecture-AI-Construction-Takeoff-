import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import DemoHero from './components/DemoHero';
import InteractiveDemo from './components/InteractiveDemo';
import FeatureShowcase from './components/FeatureShowcase';
import ComparisonSlider from './components/ComparisonSlider';
import GuidedTour from './components/GuidedTour';
import IntegrationShowcase from './components/IntegrationShowcase';
import DemoFooter from './components/DemoFooter';

const ProductDemo = () => {
  const [isDemoActive, setIsDemoActive] = useState(false);

  const handleStartDemo = () => {
    setIsDemoActive(true);
    // Scroll to demo section
    setTimeout(() => {
      const demoSection = document.getElementById('interactive-demo');
      if (demoSection) {
        demoSection?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <Helmet>
        <title>Product Demo - BCBP Construction AI | Interactive AI-Powered Takeoff Experience</title>
        <meta name="description" content="Experience BCBP's AI-powered construction takeoff technology through interactive demos. See real-time element detection, precise measurements, and workflow automation in action." />
        <meta name="keywords" content="construction takeoff demo, AI construction software, interactive demo, construction estimating, building measurement technology" />
        <meta property="og:title" content="Product Demo - BCBP Construction AI" />
        <meta property="og:description" content="Experience the future of construction takeoffs with our interactive AI-powered demo" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://BCBP.com/product-demo" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <DemoHero onStartDemo={handleStartDemo} />

          {/* Interactive Demo Section */}
          <div id="interactive-demo">
            <InteractiveDemo isActive={isDemoActive} />
          </div>

          {/* Feature Showcase */}
          <FeatureShowcase />

          {/* Before/After Comparison */}
          <ComparisonSlider />

          {/* Guided Tour */}
          <GuidedTour />

          {/* Integration Showcase */}
          <IntegrationShowcase />
        </main>

        {/* Footer */}
        <DemoFooter />
      </div>
    </>
  );
};

export default ProductDemo;