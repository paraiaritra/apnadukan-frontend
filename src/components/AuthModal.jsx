import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    let result;
    if (isRegister) {
      result = await register(
        formData.name,
        formData.mobile,
        formData.password
      );
    } else {
      result = await login(formData.mobile, formData.password);
    }

    if (!result.success) {
      setError(result.message || 'Server error');
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400"
        >
          <X />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 bg-orange-600 text-white flex items-center justify-center rounded-xl mb-3">
            <User />
          </div>
          <h2 className="text-2xl font-black">
            {isRegister ? 'Register to ApnaDukan' : 'Login to ApnaDukan'}
          </h2>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded-xl"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          )}

          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full border p-3 rounded-xl"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          {error && (
            <p className="text-red-600 text-sm font-bold text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-black"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            className="text-orange-600 font-bold"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
