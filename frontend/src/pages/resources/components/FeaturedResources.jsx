import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedResources = () => {
  const featuredResources = [
    {
      id: 1,
      type: 'guide',
      title: "Complete Guide to AI-Powered Construction Takeoffs",
      description: `Master the fundamentals of AI-powered takeoff technology and transform your estimation workflows.\n\nLearn how to leverage machine learning algorithms for accurate quantity measurements, reduce manual errors by up to 90%, and accelerate project timelines.`,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop",
      author: {
        name: "Sarah Chen",
        role: "Senior Construction Technology Consultant",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      readTime: "15 min read",
      publishDate: "Dec 15, 2024",
      views: "2.4K",
      tags: ["AI", "Takeoffs", "Workflow"],
      isPremium: false,
      link: "/resources/ai-takeoff-guide"
    },
    {
      id: 2,
      type: 'webinar',
      title: "Live Demo: ROI Calculator for Construction Technology",
      description: `Interactive webinar showcasing real-world ROI calculations and implementation strategies.\n\nDiscover how leading construction firms achieve 300% ROI within 6 months of implementing AI-powered estimation tools.`,
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=800&h=400&fit=crop",
      author: {
        name: "Michael Rodriguez",
        role: "Construction Industry Analyst",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      readTime: "45 min session",
      publishDate: "Dec 20, 2024",
      views: "1.8K",
      tags: ["ROI", "Implementation", "Demo"],
      isPremium: true,
      link: "/resources/roi-calculator-webinar"
    },
    {
      id: 3,
      type: 'case-study',
      title: "How Turner Construction Reduced Estimation Time by 75%",
      description: `Detailed case study examining Turner Construction's digital transformation journey.\n\nExplore the challenges, implementation process, and measurable outcomes of adopting AI-powered construction technology.`,
      image: "https://images.pixabay.com/photo/2017/08/10/08/47/construction-2619547_1280.jpg?w=800&h=400&fit=crop",
      author: {
        name: "David Thompson",
        role: "Project Implementation Specialist",
        avatar: "https://randomuser.me/api/portraits/men/28.jpg"
      },
      readTime: "12 min read",
      publishDate: "Dec 10, 2024",
      views: "3.1K",
      tags: ["Case Study", "Turner", "Efficiency"],
      isPremium: false,
      link: "/resources/turner-case-study"
    }
  ];

  const getResourceIcon = (type) => {
    const icons = {
      'tutorial': 'BookOpen',
      'guide': 'FileText',
      'webinar': 'Video',
      'case-study': 'TrendingUp',
      'tool': 'Calculator'
    };
    return icons?.[type] || 'FileText';
  };

  const getTypeColor = (type) => {
    const colors = {
      'tutorial': 'bg-blue-100 text-blue-800',
      'guide': 'bg-green-100 text-green-800',
      'webinar': 'bg-purple-100 text-purple-800',
      'case-study': 'bg-orange-100 text-orange-800',
      'tool': 'bg-cyan-100 text-cyan-800'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2">Featured Resources</h2>
          <p className="text-text-secondary">Hand-picked content to accelerate your construction technology journey</p>
        </div>
        <Button
          variant="outline"
          asChild
          iconName="ArrowRight"
          iconPosition="right"
        >
          <Link to="/resources/featured">View All Featured</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {featuredResources?.map((resource, index) => (
          <div
            key={resource?.id}
            className={`bg-white rounded-lg shadow-professional hover:shadow-professional-lg transition-all duration-normal group ${
              index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
            }`}
          >
            <div className="relative overflow-hidden rounded-t-lg h-48 lg:h-64">
              <Image
                src={resource?.image}
                alt={resource?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-normal"
              />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(resource?.type)}`}>
                  <Icon name={getResourceIcon(resource?.type)} size={14} className="mr-1" />
                  {resource?.type?.charAt(0)?.toUpperCase() + resource?.type?.slice(1)}
                </span>
              </div>
              {resource?.isPremium && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Icon name="Crown" size={12} className="mr-1" />
                    Premium
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className={`font-bold text-white mb-2 group-hover:text-accent transition-colors duration-fast ${
                  index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'
                }`}>
                  {resource?.title}
                </h3>
              </div>
            </div>
            
            <div className="p-6">
              <p className={`text-text-secondary mb-4 ${index === 0 ? 'text-base' : 'text-sm'}`}>
                {resource?.description?.split('\n')?.[0]}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Clock" size={12} className="mr-1" />
                    {resource?.readTime}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Eye" size={12} className="mr-1" />
                    {resource?.views}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {resource?.tags?.slice(0, 2)?.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src={resource?.author?.avatar}
                    alt={resource?.author?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-brand-primary">{resource?.author?.name}</p>
                    <p className="text-xs text-muted-foreground">{resource?.author?.role}</p>
                  </div>
                </div>
                
                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="bg-accent hover:bg-accent/90"
                >
                  <Link to={resource?.link}>
                    <Icon name="ArrowRight" size={14} className="ml-1" />
                    {resource?.type === 'webinar' ? 'Register' : 'Read More'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedResources;