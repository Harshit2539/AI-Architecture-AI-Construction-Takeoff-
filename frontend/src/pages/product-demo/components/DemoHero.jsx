import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DemoHero = ({ onStartDemo }) => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium">
                <Icon name="Zap" size={16} className="mr-2" />
                AI-Powered Construction Intelligence
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Experience the Future of
                <span className="block text-blue-400">Construction Takeoffs</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                Watch our AI technology automatically detect, measure, and quantify construction elements from your drawings with unprecedented accuracy and speed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={onStartDemo}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold cta-primary"
                iconName="Play"
                iconPosition="left"
              >
                Start Interactive Demo
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-400 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Live Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-blue-400" />
                <span className="text-slate-300">5-minute demo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-green-400" />
                <span className="text-slate-300">No signup required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Smartphone" size={20} className="text-purple-400" />
                <span className="text-slate-300">Works on any device</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors duration-200 shadow-lg">
                    <Icon name="Play" size={32} className="text-white ml-1" />
                  </div>
                </div>
                
                {/* Simulated AI Detection Overlay */}
                <div className="absolute top-4 left-4 bg-blue-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                  <Icon name="Eye" size={14} className="inline mr-1" />
                  AI Detection Active
                </div>
                
                <div className="absolute bottom-4 right-4 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                  <Icon name="Target" size={14} className="inline mr-1" />
                  98.7% Accuracy
                </div>

                {/* Animated detection points */}
                <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-orange-400 rounded-full detection-point"></div>
                <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-blue-400 rounded-full detection-point" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-green-400 rounded-full detection-point" style={{ animationDelay: '1s' }}></div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Elements Detected</span>
                  <span className="text-white font-semibold">247</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Processing Time</span>
                  <span className="text-green-400 font-semibold">12.3 seconds</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Accuracy Rate</span>
                  <span className="text-blue-400 font-semibold">98.7%</span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoHero;