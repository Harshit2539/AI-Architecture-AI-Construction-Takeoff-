import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, onBookmark }) => {
  const getResourceIcon = (type) => {
    const icons = {
      'tutorial': 'BookOpen',
      'guide': 'FileText',
      'webinar': 'Video',
      'case-study': 'TrendingUp',
      'tool': 'Calculator',
      'whitepaper': 'FileDown',
      'blog': 'Edit3',
      'template': 'Layout'
    };
    return icons?.[type] || 'FileText';
  };

  const getTypeColor = (type) => {
    const colors = {
      'tutorial': 'bg-blue-100 text-blue-800',
      'guide': 'bg-green-100 text-green-800',
      'webinar': 'bg-purple-100 text-purple-800',
      'case-study': 'bg-orange-100 text-orange-800',
      'tool': 'bg-cyan-100 text-cyan-800',
      'whitepaper': 'bg-gray-100 text-gray-800',
      'blog': 'bg-pink-100 text-pink-800',
      'template': 'bg-indigo-100 text-indigo-800'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-professional hover:shadow-professional-lg transition-all duration-normal group">
      {resource?.image && (
        <div className="relative overflow-hidden rounded-t-lg h-48">
          <Image
            src={resource?.image}
            alt={resource?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-normal"
          />
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(resource?.type)}`}>
              <Icon name={getResourceIcon(resource?.type)} size={12} className="mr-1" />
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
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-brand-primary mb-2 group-hover:text-accent transition-colors duration-fast">
              {resource?.title}
            </h3>
            <p className="text-text-secondary text-sm line-clamp-2 mb-3">
              {resource?.description}
            </p>
          </div>
          <button
            onClick={() => onBookmark(resource?.id)}
            className="ml-2 p-2 rounded-lg hover:bg-muted transition-colors duration-fast"
            aria-label="Bookmark resource"
          >
            <Icon 
              name={resource?.isBookmarked ? 'Bookmark' : 'BookmarkPlus'} 
              size={16} 
              className={resource?.isBookmarked ? 'text-accent' : 'text-muted-foreground'}
            />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span className="flex items-center">
              <Icon name="Clock" size={12} className="mr-1" />
              {resource?.readTime}
            </span>
            <span className="flex items-center">
              <Icon name="Calendar" size={12} className="mr-1" />
              {resource?.publishDate}
            </span>
            <span className="flex items-center">
              <Icon name="Eye" size={12} className="mr-1" />
              {resource?.views}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {resource?.tags?.slice(0, 2)?.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src={resource?.author?.avatar}
              alt={resource?.author?.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-muted-foreground">{resource?.author?.name}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hover:bg-accent hover:text-white hover:border-accent"
          >
            <Link to={resource?.link}>
              <Icon name="ArrowRight" size={14} className="ml-1" />
              Read More
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;