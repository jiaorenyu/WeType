import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-[#ff6600] text-black">
      <div className="container mx-auto px-2 py-1">
        <div className="flex items-center space-x-2 text-sm">
          {/* Logo */}
          <Link to="/" className="border border-white px-1">
            <span className="font-bold text-lg">H</span>
          </Link>
          
          {/* Brand */}
          <Link to="/" className="font-bold">
            Hacker News
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <span className="text-black">|</span>
            <Link to="/" className="hover:underline">new</Link>
            <span className="text-black">|</span>
            <Link to="/" className="hover:underline">past</Link>
            <span className="text-black">|</span>
            <Link to="/" className="hover:underline">comments</Link>
            <span className="text-black">|</span>
            <Link to="/" className="hover:underline">ask</Link>
            <span className="text-black">|</span>
            <Link to="/" className="hover:underline">show</Link>
            <span className="text-black">|</span>
            <Link to="/" className="hover:underline">jobs</Link>
            <span className="text-black">|</span>
            {token && (
              <>
                <Link to="/submit" className="hover:underline">submit</Link>
                <span className="text-black">|</span>
              </>
            )}
          </div>
          
          {/* Right side - Auth */}
          <div className="ml-auto flex items-center space-x-2">
            {token ? (
              <>
                <Link to="/profile" className="hover:underline">profile</Link>
                <span className="text-black">|</span>
                <button onClick={handleLogout} className="hover:underline">
                  logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">login</Link>
                <span className="text-black">|</span>
                <Link to="/register" className="hover:underline">register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;