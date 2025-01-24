import React, { useState } from 'react';
import { UserRegistrationData } from '../../types/auth.types';
import { authApi } from '../../api/auth.api';
import { OTPVerification } from './OTPVerification';
import { useNavigate } from 'react-router-dom';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserRegistrationData>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\+?1?\d{9,15}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate phone number
    if (!validatePhoneNumber(formData.phone_number)) {
      setError('Invalid phone number format');
      return;
    }

    setIsLoading(true);

    try {
      await authApi.register(formData);
      setShowOTPVerification(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (showOTPVerification) {
    return <OTPVerification phone_number={formData.phone_number} />;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          Register
        </h1>
        
        {error && (
          <div className="w-full p-4 mb-4 text-red-500 bg-red-100 bg-opacity-10 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="w-full">
            <input
              name="username"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-700 focus:border-transparent text-white placeholder-gray-500"
              placeholder="Username"
              onChange={handleInputChange}
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="first_name"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-700 focus:border-transparent text-white placeholder-gray-500"
              placeholder="First Name"
              onChange={handleInputChange}
            />
            <input
              name="last_name"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-700 focus:border-transparent text-white placeholder-gray-500"
              placeholder="Last Name"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
            <input
              name="email"
              required
              type="email"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-700 focus:border-transparent text-white placeholder-gray-500"
              placeholder="Email Address"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
            <input
              name="phone_number"
              required
              type="tel"
              pattern="^\+?1?\d{9,15}$"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-700 focus:border-transparent text-white placeholder-gray-500"
              placeholder="Phone Number (e.g. +919876543210)"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
            <input
              name="password"
              required
              type="password"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-700 focus:border-transparent text-white placeholder-gray-500"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-700 hover:bg-orange-600 disabled:bg-orange-900 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-6"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <div className="flex justify-center items-center mt-4 text-gray-300">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="ml-2 text-orange-500 hover:text-orange-400"
            >
              Login here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;