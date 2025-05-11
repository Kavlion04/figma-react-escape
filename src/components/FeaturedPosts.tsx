
import { useState, useEffect, useRef } from 'react';

interface FeaturedPostProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
  authorImageUrl: string;
  readTime: string;
}

const FeaturedPostCard = ({
  title,
  excerpt,
  imageUrl,
  category,
  date,
  author,
  authorImageUrl,
  readTime
}: FeaturedPostProps) => {
  const [loaded, setLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative rounded-lg overflow-hidden transition-all duration-700 h-[380px] ${
        loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <img 
        src={imageUrl} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <span className="bg-escape-orange text-white text-xs px-3 py-1 rounded-full uppercase">
          {category}
        </span>
        <h3 className="text-2xl font-serif mt-4 mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{excerpt}</p>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center">
            <img 
              src={authorImageUrl} 
              alt={author} 
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span>{author}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{date}</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedPosts = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const featuredPosts = [
    {
      title: 'The Road Ahead',
      excerpt: 'The road ahead might be long and winding, but the journey is the destination.',
      imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3880&q=80',
      category: 'Adventure',
      date: 'May 15, 2023',
      author: 'John Smith',
      authorImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      readTime: '5 min read'
    },
    {
      title: 'From 2917 Kilometers',
      excerpt: 'Embark on an unforgettable journey through untamed landscapes and hidden wonders.',
      imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=6052&q=80',
      category: 'Travel',
      date: 'April 28, 2023',
      author: 'Sarah Johnson',
      authorImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      readTime: '7 min read'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className={`text-2xl md:text-3xl font-serif text-center mb-12 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Featured Posts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <FeaturedPostCard
              key={index}
              {...post}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
