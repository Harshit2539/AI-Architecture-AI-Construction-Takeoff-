import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Product Demo", path: "/product-demo", icon: "Play" },
    { name: "Solutions", path: "/solutions-hub", icon: "Layers" },
    { name: "Pricing", path: "/pricing", icon: "DollarSign" },
    { name: "Resources", path: "/resources", icon: "BookOpen" },
  ];

  const isActivePath = (path) => {
    return (
      location?.pathname === path ||
      (path === "/homepage" && location?.pathname === "/")
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignInClick = () => {
    navigate("/signin");
    closeMobileMenu();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-header transition-all duration-normal ${
        isScrolled
          ? "bg-background/95 backdrop-blur-brand shadow-professional border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/homepage"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-fast"
            onClick={closeMobileMenu}
          >
            <img
              src="/assets/images/logo.png"
              alt="BCBP Logo"
              className="h-10 w-auto object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            />
            {/* <div className="flex flex-col">
              <span className="text-xl font-bold text-brand-primary font-inter">
                BCBP
              </span>
              <span className="text-xs text-muted-foreground font-medium -mt-1">
                Construction AI
              </span>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-fast hover:bg-muted ${
                  isActivePath(item?.path)
                    ? "text-accent bg-accent/10"
                    : "text-text-primary hover:text-accent"
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-text-primary hover:text-white"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>

            <Button
              variant="default"
              size="sm"
              className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
              asChild
            >
              <Link to="/free-trial">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-fast touch-target"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? "X" : "Menu"}
              size={24}
              className="text-text-primary"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-normal overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4 bg-background border-t border-border">
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-fast touch-target ${
                    isActivePath(item?.path)
                      ? "text-accent bg-accent/10"
                      : "text-text-primary hover:bg-muted hover:text-accent"
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-border space-y-3">
              <Button
                variant="ghost"
                fullWidth
                className="justify-start text-text-primary hover:text-accent touch-target"
                onClick={() => {
                  navigate("/signin");
                  closeMobileMenu();
                }}
              >
                <Icon name="LogIn" size={20} className="mr-3" />
                Sign In
              </Button>
              <Button
                variant="default"
                fullWidth
                className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary touch-target"
                asChild
              >
                <Link to="/free-trial" onClick={closeMobileMenu}>
                  <Icon name="Zap" size={20} className="mr-3" />
                  Start Free Trial
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
