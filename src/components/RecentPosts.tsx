
import { useState, useEffect, useRef } from 'react';

interface PostCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  authorImageUrl: string;
  date: string;
  index: number;
}

const PostCard = ({ title, excerpt, imageUrl, author, authorImageUrl, date, index }: PostCardProps) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setInView(true);
          }, index * 100); // Staggered animation
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
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-lg overflow-hidden transition-all duration-500 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-xl mb-2">{title}</h3>
        <p className="text-sm text-escape-gray mb-4 line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between text-xs text-escape-gray">
          <div className="flex items-center">
            <img 
              src={authorImageUrl} 
              alt={author} 
              className="w-6 h-6 rounded-full mr-2 object-cover"
            />
            <span>{author}</span>
          </div>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

const RecentPosts = () => {
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

  const recentPosts = [
    {
      title: "Still Standing Tall",
      excerpt: "Life begins at the end of your comfort zone.",
      imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2965&q=80",
      author: "William Wong",
      authorImageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "9/25/2023"
    },
    {
      title: "Sunny Side Up",
      excerpt: "No place is ever as bad as they tell you it's going to be.",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=7360&q=80",
      author: "Mat Vogels",
      authorImageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      date: "9/25/2023"
    },
    {
      title: "Water Falls",
      excerpt: "We travel not to escape life, but for life not to escape us.",
      imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4000&q=80",
      author: "Mat Vogels",
      authorImageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      date: "9/25/2023"
    },
    {
      title: "Through the Mist",
      excerpt: "Travel makes one modest. You see what a tiny place you occupy in the world.",
      imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3945&q=80",
      author: "William Wong",
      authorImageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "9/25/2023"
    },
    {
      title: "Awaken Early",
      excerpt: "Not all those who wander are lost.",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4896&q=80",
      author: "Mat Vogels",
      authorImageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      date: "9/25/2023"
    },
    {
      title: "Try it Always",
      excerpt: "The world is a book, and those who do not travel read only one page.",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5760&q=80",
      author: "Mat Vogels",
      authorImageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      date: "9/25/2023"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-escape-light">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className={`text-2xl md:text-3xl font-serif text-center mb-12 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Most Recent
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <PostCard
              key={index}
              {...post}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
