import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Form, Container } from '../ui/components';
import { FaEnvelope, FaLock } from 'react-icons/fa';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add your login logic here
      console.log('Login attempt with:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex min-h-screen items-center bg-[var(--background)]">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-[var(--text)]">
                Welcome Back
              </h1>
              <p className="text-[var(--text)] opacity-60">
                Sign in to continue to your account
              </p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                fullWidth
                required
              />
              
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                fullWidth
                required
              />

              <div className="mt-2 flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-[var(--text)]">Remember me</span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                fullWidth
                className="mt-6"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <p className="mt-4 text-center text-sm text-[var(--text)]">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-[var(--primary)] hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
