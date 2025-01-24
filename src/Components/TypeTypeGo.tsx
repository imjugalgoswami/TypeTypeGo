import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import landingImage from '../assets/lendingPageImage.jpg'; 


const TypeTypeGoLanding = () => {
  const [showCursor, setShowCursor] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate('/test');
  };



  return (
    <div className="flex min-h-screen bg-dark-primary">
      {/* Left side - Image placeholder */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="flex items-center justify-center text-gray-500">
          <img width={400} src={landingImage} alt="" />
        </div>
      </div>

      {/* Right side - Content */}
      <div className="w-1/2 flex flex-col justify-center items-start px-12">
        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight flex items-center">
          TypeType
          <span className="text-orange-700">Go...</span>
          <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 text-orange-700 `}>|</span>
        </h1>
        
        <p className="text-lg text-gray-300 mb-8 font-medium">
          Enhance coding skills with interactive challenges!
        </p>

        <div className="w-full max-w-md space-y-4">
          <button
            onClick={handleGetStarted}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 text-lg font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Get started
          </button>
          
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 text-lg font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Login / Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypeTypeGoLanding;