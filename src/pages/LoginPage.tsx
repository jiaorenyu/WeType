import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="bg-[#f6f6ef] min-h-screen">
      <div className="container mx-auto px-2 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-lg font-medium mb-4">Login</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-2 mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-black mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-1.5 border border-[#828282] text-sm focus:outline-none focus:border-[#ff6600]"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm text-black mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-1.5 border border-[#828282] text-sm focus:outline-none focus:border-[#ff6600]"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                type="submit" 
                className="bg-[#ff6600] text-white px-4 py-1.5 text-sm hover:bg-[#e55a00]"
              >
                login
              </button>
              <Link 
                to="/register" 
                className="text-[#828282] text-sm hover:underline"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;