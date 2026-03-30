import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubmitPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login first');
        return;
      }

      await axios.post('http://localhost:3001/api/posts', {
        title,
        content,
        url,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Post submitted successfully');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="bg-[#f6f6ef] min-h-screen">
      <div className="container mx-auto px-2 py-4">
        <div className="max-w-2xl">
          <h1 className="text-lg font-medium mb-4">Submit</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-2 mb-4 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-2 mb-4 text-sm">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm text-black mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-1.5 border border-[#828282] text-sm focus:outline-none focus:border-[#ff6600]"
              />
            </div>
            
            <div>
              <label htmlFor="url" className="block text-sm text-black mb-1">
                URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-1.5 border border-[#828282] text-sm focus:outline-none focus:border-[#ff6600]"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm text-black mb-1">
                Text
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full p-1.5 border border-[#828282] text-sm focus:outline-none focus:border-[#ff6600]"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                type="submit" 
                className="bg-[#ff6600] text-white px-4 py-1.5 text-sm hover:bg-[#e55a00]"
              >
                submit
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-sm text-[#828282]">
            <p className="mb-2">
              Leave URL blank to submit a question for discussion. If there is no URL, text will appear at the top of the thread. If there is a URL, text is optional.
            </p>
            <p>
              You can also submit via <a href="#" className="text-[#ff6600] hover:underline">bookmarklet</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;