import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Array of beautiful mountain landscape images from Unsplash
const backgroundImages = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
  'https://images.unsplash.com/photo-1458668383970-8ddd3927deed',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
  'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
  'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1374295/pexels-photo-1374295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
];

const Background: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();

  // Change the background image when the route changes
  useEffect(() => {
    const newIndex = Math.floor(Math.random() * backgroundImages.length);
    setCurrentImageIndex(newIndex);
  }, [location.pathname]);

  return (
    <div 
      className="fixed inset-0 w-screen h-screen z-[-1] bg-cover bg-center transition-opacity duration-1000"
      style={{ 
        backgroundImage: `url(${backgroundImages[currentImageIndex]}?auto=format&fit=crop&w=1920&q=80)`,
        opacity: 0.5
      }}
    />
  );
};

export default Background;