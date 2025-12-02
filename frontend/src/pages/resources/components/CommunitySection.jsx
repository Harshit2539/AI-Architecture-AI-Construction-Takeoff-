import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const CommunitySection = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  const discussions = [
    {
      id: 1,
      title: "Best practices for concrete takeoffs with AI detection",
      author: {
        name: "Jennifer Walsh",
        role: "Senior Quantity Surveyor",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        company: "BuildTech Solutions"
      },
      category: "AI Takeoffs",
      replies: 23,
      views: 1247,
      lastActivity: "2 hours ago",
      tags: ["concrete", "ai-detection", "best-practices"],
      isHot: true
    },
    {
      id: 2,
      title: "Integration challenges with Procore - seeking advice",
      author: {
        name: "Marcus Chen",
        role: "Project Manager",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        company: "Metro Construction"
      },
      category: "Integrations",
      replies: 15,
      views: 892,
      lastActivity: "4 hours ago",
      tags: ["procore", "integration", "troubleshooting"],
      isHot: false
    },
    {
      id: 3,
      title: "ROI calculation methodology for AI takeoff implementation",
      author: {
        name: "Sarah Rodriguez",
        role: "Cost Estimator",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        company: "Precision Estimating"
      },
      category: "Business Value",
      replies: 31,
      views: 2156,
      lastActivity: "6 hours ago",
      tags: ["roi", "implementation", "business-case"],
      isHot: true
    },
    {
      id: 4,
      title: "Custom template creation for electrical takeoffs",
      author: {
        name: "David Kim",
        role: "Electrical Estimator",
        avatar: "https://randomuser.me/api/portraits/men/35.jpg",
        company: "ElectroMax Inc"
      },
      category: "Templates",
      replies: 8,
      views: 543,
      lastActivity: "1 day ago",
      tags: ["electrical", "templates", "customization"],
      isHot: false
    }
  ];

  const expertTips = [
    {
      id: 1,
      tip: "Always validate AI-detected measurements on your first few projects to build confidence in the system\'s accuracy.",
      author: {
        name: "Michael Torres",
        role: "Construction Technology Consultant",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg"
      },
      likes: 47,
      category: "AI Validation"
    },
    {
      id: 2,
      tip: "Create project-specific templates to speed up recurring takeoff types. This can reduce setup time by 60%.",
      author: {
        name: "Lisa Anderson",
        role: "Senior Quantity Surveyor",
        avatar: "https://randomuser.me/api/portraits/women/39.jpg"
      },
      likes: 62,
      category: "Efficiency"
    },
    {
      id: 3,
      tip: "Use the collaboration features early in the project lifecycle. Getting stakeholder buy-in upfront saves time later.",
      author: {
        name: "Robert Chang",
        role: "Project Director",
        avatar: "https://randomuser.me/api/portraits/men/47.jpg"
      },
      likes: 38,
      category: "Collaboration"
    }
  ];

  const communityStats = [
    { label: "Active Members", value: "2,847", icon: "Users" },
    { label: "Discussions", value: "1,234", icon: "MessageSquare" },
    { label: "Expert Tips", value: "456", icon: "Lightbulb" },
    { label: "Resources Shared", value: "789", icon: "Share2" }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2">Community Hub</h2>
          <p className="text-text-secondary">Connect with construction professionals and share knowledge</p>
        </div>
        <Button
          variant="default"
          asChild
          className="bg-conversion hover:bg-conversion/90 text-conversion-foreground"
          iconName="Users"
          iconPosition="left"
        >
          <Link to="/community">Join Community</Link>
        </Button>
      </div>
      {/* Community Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {communityStats?.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-professional p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name={stat?.icon} size={24} className="text-accent" />
            </div>
            <div className="text-2xl font-bold text-brand-primary mb-1">{stat?.value}</div>
            <div className="text-sm text-text-secondary">{stat?.label}</div>
          </div>
        ))}
      </div>
      {/* Community Content */}
      <div className="bg-white rounded-lg shadow-professional">
        {/* Tab Navigation */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-fast ${
                activeTab === 'discussions' ?'border-accent text-accent' :'border-transparent text-text-secondary hover:text-brand-primary hover:border-muted-foreground'
              }`}
            >
              <Icon name="MessageSquare" size={16} className="mr-2 inline" />
              Recent Discussions
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-fast ${
                activeTab === 'tips' ?'border-accent text-accent' :'border-transparent text-text-secondary hover:text-brand-primary hover:border-muted-foreground'
              }`}
            >
              <Icon name="Lightbulb" size={16} className="mr-2 inline" />
              Expert Tips
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'discussions' && (
            <div className="space-y-6">
              {discussions?.map((discussion) => (
                <div key={discussion?.id} className="border border-border rounded-lg p-6 hover:border-accent/50 transition-colors duration-fast">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-brand-primary hover:text-accent cursor-pointer">
                          {discussion?.title}
                        </h3>
                        {discussion?.isHot && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Icon name="Flame" size={10} className="mr-1" />
                            Hot
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span className="bg-muted px-2 py-1 rounded text-xs">{discussion?.category}</span>
                        <span className="flex items-center">
                          <Icon name="MessageCircle" size={12} className="mr-1" />
                          {discussion?.replies} replies
                        </span>
                        <span className="flex items-center">
                          <Icon name="Eye" size={12} className="mr-1" />
                          {discussion?.views} views
                        </span>
                        <span>{discussion?.lastActivity}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {discussion?.tags?.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={discussion?.author?.avatar}
                        alt={discussion?.author?.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-brand-primary">{discussion?.author?.name}</p>
                        <p className="text-xs text-muted-foreground">{discussion?.author?.role} at {discussion?.author?.company}</p>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Join Discussion
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-6 border-t border-border">
                <Button
                  variant="outline"
                  asChild
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  <Link to="/community/discussions">View All Discussions</Link>
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-6">
              {expertTips?.map((tip) => (
                <div key={tip?.id} className="border border-border rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Lightbulb" size={20} className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-brand-primary mb-4 leading-relaxed">{tip?.tip}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={tip?.author?.avatar}
                            alt={tip?.author?.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-brand-primary">{tip?.author?.name}</p>
                            <p className="text-xs text-muted-foreground">{tip?.author?.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {tip?.category}
                          </span>
                          <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-accent transition-colors duration-fast">
                            <Icon name="Heart" size={14} />
                            <span>{tip?.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-6 border-t border-border">
                <Button
                  variant="outline"
                  asChild
                  iconName="Lightbulb"
                  iconPosition="left"
                >
                  <Link to="/community/tips">View All Tips</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Community CTA */}
      <div className="mt-8 bg-gradient-to-r from-accent to-conversion rounded-lg p-8 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Share Your Expertise</h3>
        <p className="mb-6 opacity-90">
          Help fellow construction professionals by sharing your tips, asking questions, and contributing to discussions
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            asChild
            className="bg-white text-accent hover:bg-white/90"
            iconName="Plus"
            iconPosition="left"
          >
            <Link to="/community/new-discussion">Start Discussion</Link>
          </Button>
          
          <Button
            variant="outline"
            asChild
            className="border-white text-white hover:bg-white hover:text-accent"
            iconName="Share2"
            iconPosition="left"
          >
            <Link to="/community/share-tip">Share a Tip</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;