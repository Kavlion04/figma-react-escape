
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300 ease-in-out",
      scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-serif font-bold text-escape-dark">
            Escape.
          </a>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          {[
            { name: 'Home', href: '#' },
            { name: 'Categories', href: '#' },
            { name: 'About', href: '#' },
            { name: 'Contact', href: '#' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "font-medium text-sm hover:text-escape-orange transition-colors duration-200",
                scrolled ? "text-escape-dark" : "text-white"
              )}
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <a 
            href="#" 
            className={cn(
              "font-medium text-sm hover:text-escape-orange transition-colors duration-200",
              scrolled ? "text-escape-dark" : "text-white"
            )}
          >
            Sign In
          </a>
          <button 
            className={cn(
              "hidden md:block px-4 py-2 rounded text-sm font-medium transition-colors duration-200",
              scrolled ? 
                "bg-escape-orange text-white hover:bg-opacity-90" : 
                "bg-white text-escape-dark hover:bg-opacity-90"
            )}
          >
            Sign Up
          </button>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cn("w-6 h-6", scrolled ? "text-escape-dark" : "text-white")}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
