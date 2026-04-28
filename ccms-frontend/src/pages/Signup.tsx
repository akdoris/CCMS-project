import React, { useState } from 'react';
import API from '../lib/api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input  from '../components/ui/Input';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { email, password });
      alert("Account created! You can now login.");
      navigate('/login');
    } catch (err) {
      alert("Signup failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSignup} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <div className="space-y-4">
          <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full" type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};