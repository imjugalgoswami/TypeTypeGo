import React, { useState } from 'react';
import { OTPVerificationData } from '../../types/auth.types';
import { authApi } from '../../api/auth.api';

interface OTPVerificationProps {
  phone_number: string;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({ phone_number }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const otpData: OTPVerificationData = {
      phone_number,
      otp
    };

    try {
      await authApi.verifyOTP(otpData);
      // Handle successful verification (e.g., redirect to login)
      window.location.href = '/login';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setIsResending(true);

    try {
      await authApi.resendOTP(phone_number);
      setOtp('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Verify OTP
        </h2>

        {error && (
          <div className="w-full p-4 mb-4 text-red-500 bg-red-100 bg-opacity-10 rounded-lg">
            {error}
          </div>
        )}

        <p className="text-gray-300 mb-6">
          Please enter the OTP sent to {phone_number}
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-700 focus:border-transparent text-white placeholder-gray-500"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-700 hover:bg-orange-600 disabled:bg-orange-900 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <button
          onClick={handleResendOTP}
          disabled={isResending}
          className="mt-4 text-orange-500 hover:text-orange-400 disabled:text-orange-900 disabled:cursor-not-allowed"
        >
          {isResending ? 'Resending...' : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};