import React, { useState } from 'react';
import API from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input  from '../components/ui/Input';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token); // Save login token
      navigate('/dashboard');
    } catch (err) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to CCMS</h2>
        <div className="space-y-4">
          <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full" type="submit">Sign In</Button>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link to="/forgot-password text-blue-600">Forgot Password?</Link>
          <p className="mt-2">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};