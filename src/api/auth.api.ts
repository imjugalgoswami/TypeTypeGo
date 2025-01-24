import { API_BASE_URL, apiConfig } from './config';
import { UserRegistrationData, OTPVerificationData, } from '../types/auth.types';

export const authApi = {
  register: async (userData: UserRegistrationData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Registration error:', data);
      throw new Error(data.detail || data.message || 'Registration failed');
    }
    return data;
  },

  verifyOTP: async (otpData: OTPVerificationData) => {
    const response = await fetch(`${API_BASE_URL}/users/verify-otp`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify(otpData),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('OTP verification error:', data);
      throw new Error(data.detail || 'OTP verification failed');
    }
    return data;
  },

  resendOTP: async (phone_number: string) => {
    const response = await fetch(`${API_BASE_URL}/users/resend-otp`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({ phone_number }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Resend OTP error:', data);
      throw new Error(data.detail || 'Failed to resend OTP');
    }
    return data;
  },
  login: async (data: { username: string; password: string }) => {
    const formData = new URLSearchParams({
      grant_type: 'password',
      username: data.username,
      password: data.password,
      scope: '',
      client_id: 'string',
      client_secret: 'string'
    });
    
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: formData
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Login error:', responseData);
      throw new Error(responseData.detail || 'Login failed');
    }
    return responseData;
  }
};

