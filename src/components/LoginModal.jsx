import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const LoginModal = ({ open, onClose }) => {
  const { login } = useAuth();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    const res = await login(mobile, password);
    if (res.success) {
      onClose();
    } else {
      setError(res.message || 'Login failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400"
        >
          <X />
        </button>

        <h2 className="text-2xl font-black mb-6 text-center">
          Login to ApnaDukan
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="tel"
            placeholder="Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border p-4 rounded-xl outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-4 rounded-xl outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
