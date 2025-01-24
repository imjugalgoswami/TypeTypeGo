import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginData } from '../../types/auth.types';
import { authApi } from '../../api/auth.api';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      // Handle successful login
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/test'); // Redirect to dashboard or home page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
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

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          Login
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
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="flex justify-between items-center mt-4 text-gray-300">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-orange-500 hover:text-orange-400"
            >
              Forgot Password?
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-orange-500 hover:text-orange-400"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;