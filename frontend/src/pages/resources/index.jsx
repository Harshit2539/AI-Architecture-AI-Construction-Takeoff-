import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ResourceCard from './components/ResourceCard';
import SearchFilters from './components/SearchFilters';
import FeaturedResources from './components/FeaturedResources';
import InteractiveTools from './components/InteractiveTools';
import ResourceCategories from './components/ResourceCategories';
import CommunitySection from './components/CommunitySection';

const Resources = () => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    type: 'all',
    level: 'all',
    role: 'all',
    sortBy: 'newest',
    premiumOnly: false,
    recentlyUpdated: false,
    interactiveOnly: false,
    downloadable: false,
    residential: false,
    commercial: false,
    infrastructure: false,
    renovation: false,
    aiMl: false,
    bim: false,
    digitalTransformation: false,
    workflow: false
  });

  const [bookmarkedResources, setBookmarkedResources] = useState(new Set());
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const allResources = [
    {
      id: 1,
      type: 'tutorial',
      title: "Getting Started with AI-Powered Takeoffs",
      description: `Step-by-step tutorial for new users to master AI-powered takeoff functionality.\n\nLearn how to upload drawings, configure detection settings, and validate measurements for accurate quantity takeoffs.`,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      author: {
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      readTime: "8 min read",
      publishDate: "Dec 18, 2024",
      views: "1.2K",
      tags: ["beginner", "ai-takeoffs", "tutorial"],
      isPremium: false,
      isBookmarked: false,
      link: "/resources/ai-takeoffs-tutorial"
    },
    {
      id: 2,
      type: 'guide',
      title: "Advanced Estimation Techniques for Complex Projects",
      description: `Comprehensive guide covering advanced estimation methodologies for large-scale construction projects.\n\nExplore risk assessment, contingency planning, and cost optimization strategies used by industry leaders.`,
      image: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?w=400&h=250&fit=crop",
      author: {
        name: "Maria Santos",
        avatar: "https://randomuser.me/api/portraits/women/31.jpg"
      },
      readTime: "20 min read",
      publishDate: "Dec 16, 2024",
      views: "2.8K",
      tags: ["advanced", "estimation", "complex-projects"],
      isPremium: true,
      isBookmarked: false,
      link: "/resources/advanced-estimation-guide"
    },
    {
      id: 3,
      type: 'webinar',
      title: "Live Q&A: Implementing AI in Your Workflow",
      description: `Interactive webinar session with construction technology experts answering your implementation questions.\n\nGet real-time answers about AI integration, team training, and workflow optimization strategies.`,
      image: "https://images.pixabay.com/photo/2016/02/19/11/19/office-1209640_1280.jpg?w=400&h=250&fit=crop",
      author: {
        name: "Dr. James Wilson",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg"
      },
      readTime: "60 min session",
      publishDate: "Dec 22, 2024",
      views: "945",
      tags: ["webinar", "implementation", "qa"],
      isPremium: false,
      isBookmarked: false,
      link: "/resources/ai-implementation-webinar"
    },
    {
      id: 4,
      type: 'case-study',
      title: "Skanska\'s 40% Efficiency Gain with BCBP AI",
      description: `Detailed case study examining Skanska's implementation of AI-powered takeoff technology.\n\nAnalyze the challenges, solutions, and measurable outcomes from their digital transformation journey.`,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
      author: {
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/42.jpg"
      },
      readTime: "15 min read",
      publishDate: "Dec 14, 2024",
      views: "3.5K",
      tags: ["case-study", "skanska", "efficiency"],
      isPremium: false,
      isBookmarked: false,
      link: "/resources/skanska-case-study"
    },
    {
      id: 5,
      type: 'tool',
      title: "Project Complexity Assessment Tool",
      description: `Interactive tool to evaluate your project complexity and get personalized technology recommendations.\n\nAnswer a series of questions about your project requirements and receive tailored implementation guidance.`,
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=400&h=250&fit=crop",
      author: {
        name: "Robert Kim",
        avatar: "https://randomuser.me/api/portraits/men/38.jpg"
      },
      readTime: "5 min assessment",
      publishDate: "Dec 12, 2024",
      views: "1.7K",
      tags: ["tool", "assessment", "planning"],
      isPremium: true,
      isBookmarked: false,
      link: "/resources/complexity-assessment"
    },
    {
      id: 6,
      type: 'whitepaper',
      title: "The Future of Construction Technology: 2025 Trends Report",
      description: `Comprehensive analysis of emerging construction technology trends and their impact on the industry.\n\nExplore AI adoption rates, digital transformation strategies, and predictions for the next decade.`,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      author: {
        name: "Dr. Lisa Chen",
        avatar: "https://randomuser.me/api/portraits/women/48.jpg"
      },
      readTime: "25 min read",
      publishDate: "Dec 10, 2024",
      views: "4.2K",
      tags: ["whitepaper", "trends", "future"],
      isPremium: true,
      isBookmarked: false,
      link: "/resources/2025-trends-report"
    }
  ];

  const handleBookmark = (resourceId) => {
    setBookmarkedResources(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(resourceId)) {
        newSet?.delete(resourceId);
      } else {
        newSet?.add(resourceId);
      }
      return newSet;
    });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      type: 'all',
      level: 'all',
      role: 'all',
      sortBy: 'newest',
      premiumOnly: false,
      recentlyUpdated: false,
      interactiveOnly: false,
      downloadable: false,
      residential: false,
      commercial: false,
      infrastructure: false,
      renovation: false,
      aiMl: false,
      bim: false,
      digitalTransformation: false,
      workflow: false
    });
  };

  const handleCategorySelect = (categoryId) => {
    // Update filters based on selected category
    const categoryFilters = {
      'getting-started': { level: 'beginner', type: 'tutorial' },
      'ai-takeoffs': { aiMl: true, type: 'guide' },
      'estimating': { type: 'guide', role: 'cost-estimator' },
      'collaboration': { workflow: true, type: 'tutorial' },
      'integrations': { bim: true, type: 'guide' },
      'industry-insights': { type: 'whitepaper' },
      'best-practices': { type: 'guide', level: 'advanced' },
      'troubleshooting': { type: 'tutorial', level: 'intermediate' }
    };

    if (categoryFilters?.[categoryId]) {
      setFilters(prev => ({ ...prev, ...categoryFilters?.[categoryId] }));
    }
  };

  // Filter and sort resources
  const filteredResources = allResources?.filter(resource => {
      if (filters?.searchQuery && !resource?.title?.toLowerCase()?.includes(filters?.searchQuery?.toLowerCase()) && 
          !resource?.description?.toLowerCase()?.includes(filters?.searchQuery?.toLowerCase())) {
        return false;
      }
      if (filters?.type !== 'all' && resource?.type !== filters?.type) return false;
      if (filters?.premiumOnly && !resource?.isPremium) return false;
      return true;
    })?.map(resource => ({
      ...resource,
      isBookmarked: bookmarkedResources?.has(resource?.id)
    }))?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'newest':
          return new Date(b.publishDate) - new Date(a.publishDate);
        case 'oldest':
          return new Date(a.publishDate) - new Date(b.publishDate);
        case 'most-viewed':
          return parseInt(b?.views?.replace('K', '000')?.replace('.', '')) - parseInt(a?.views?.replace('K', '000')?.replace('.', ''));
        case 'alphabetical':
          return a?.title?.localeCompare(b?.title);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-muted">
      <Helmet>
        <title>Resources - Construction Technology Knowledge Center | BCBP</title>
        <meta name="description" content="Access comprehensive construction technology resources, tutorials, guides, and expert insights. Master AI-powered takeoffs, estimating best practices, and workflow optimization with BCBP's knowledge center." />
        <meta name="keywords" content="construction technology resources, AI takeoff tutorials, estimating guides, construction software training, BIM integration, workflow optimization" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-primary via-brand-secondary to-accent text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6">
                <Icon name="BookOpen" size={16} className="mr-2" />
                Knowledge Center
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Master Construction
                <span className="block text-conversion">Technology</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Comprehensive resources, expert insights, and interactive tools to accelerate your construction technology journey
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
                  iconName="Zap"
                  iconPosition="left"
                >
                  Start Learning
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-brand-primary"
                  iconName="Users"
                  iconPosition="left"
                >
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Featured Resources */}
          <FeaturedResources />

          {/* Interactive Tools */}
          <InteractiveTools />

          {/* Resource Categories */}
          <ResourceCategories onCategorySelect={handleCategorySelect} />

          {/* Search and Filters */}
          <SearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* Resource Grid */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-brand-primary mb-2">All Resources</h2>
                <p className="text-text-secondary">
                  {filteredResources?.length} resources found
                  {filters?.searchQuery && ` for "${filters?.searchQuery}"`}
                </p>
              </div>
            </div>

            {filteredResources?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources?.map((resource) => (
                  <ResourceCard
                    key={resource?.id}
                    resource={resource}
                    onBookmark={handleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brand-primary mb-2">No resources found</h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your search criteria or browse our featured resources above
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  iconName="X"
                  iconPosition="left"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </section>

          {/* Community Section */}
          <CommunitySection />

          {/* Newsletter Signup */}
          <section className="bg-white rounded-lg shadow-professional p-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Icon name="Mail" size={32} className="text-accent" />
              </div>
              
              <h2 className="text-2xl font-bold text-brand-primary mb-2">Stay Updated</h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Get the latest construction technology insights, tutorials, and industry trends delivered to your inbox weekly
              </p>

              <div className="max-w-md mx-auto flex gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <Button
                  variant="default"
                  className="bg-accent hover:bg-accent/90 px-6"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Subscribe
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                No spam, unsubscribe at any time. Read our privacy policy.
              </p>
            </div>
          </section>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-brand-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M3 21V7L12 3L21 7V21H15V14H9V21H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-2xl font-bold">BCBP</span>
            </div>
            
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Empowering construction professionals with AI-powered takeoff and estimating solutions that deliver precision, efficiency, and competitive advantage.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <a href="/product-demo" className="text-white/80 hover:text-white transition-colors duration-fast">Product Demo</a>
              <a href="/solutions-hub" className="text-white/80 hover:text-white transition-colors duration-fast">Solutions</a>
              <a href="/pricing" className="text-white/80 hover:text-white transition-colors duration-fast">Pricing</a>
              <a href="/resources" className="text-white/80 hover:text-white transition-colors duration-fast">Resources</a>
              <a href="/support" className="text-white/80 hover:text-white transition-colors duration-fast">Support</a>
            </div>

            <div className="border-t border-white/20 pt-8">
              <p className="text-white/60 text-sm">
                © {new Date()?.getFullYear()} BCBP Construction AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resources;