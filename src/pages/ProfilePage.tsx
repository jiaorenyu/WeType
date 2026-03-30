import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser(decodedToken);

        const postsResponse = await axios.get('http://localhost:3001/api/posts');
        setPosts(postsResponse.data.filter((post: any) => post.userId === decodedToken.id));

        const commentsResponse = await axios.get('http://localhost:3001/api/comments/post/1');
        setComments(commentsResponse.data.filter((comment: any) => comment.userId === decodedToken.id));
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="bg-[#f6f6ef] min-h-screen">
        <div className="container mx-auto px-2 py-4">
          <div className="text-[#828282]">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#f6f6ef] min-h-screen">
        <div className="container mx-auto px-2 py-4">
          <h1 className="text-lg font-medium mb-4">Profile</h1>
          <p className="text-[#828282]">Please <Link to="/login" className="text-[#ff6600] hover:underline">login</Link> to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6ef] min-h-screen">
      <div className="container mx-auto px-2 py-4">
        <h1 className="text-lg font-medium mb-4">Profile</h1>
        
        {/* User Information */}
        <div className="mb-6">
          <div className="text-sm text-black">
            <span className="font-medium">user:</span> {user.username}
          </div>
          <div className="text-sm text-[#828282]">
            <span className="font-medium">email:</span> {user.email}
          </div>
          <div className="text-sm text-[#828282] mt-2">
            <Link to="/" className="text-[#ff6600] hover:underline">
              submissions
            </Link>
            <span className="mx-2">|</span>
            <Link to="/" className="text-[#ff6600] hover:underline">
              comments
            </Link>
            <span className="mx-2">|</span>
            <Link to="/" className="text-[#ff6600] hover:underline">
              favorites
            </Link>
          </div>
        </div>

        {/* User's Posts */}
        <div className="mb-6">
          <h2 className="text-sm font-medium mb-2">Submissions</h2>
          {posts.length === 0 ? (
            <p className="text-[#828282] text-sm">No submissions yet.</p>
          ) : (
            <div className="space-y-2">
              {posts.map((post) => (
                <div key={post.id} className="py-1">
                  <div className="text-sm">
                    <a href={post.url || '#'} className="text-black hover:underline">
                      {post.title}
                    </a>
                  </div>
                  <div className="text-xs text-[#828282]">
                    {post.score} points | {formatTimeAgo(post.createdAt)} | 
                    <Link to="/" className="hover:underline ml-1">discuss</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User's Comments */}
        <div>
          <h2 className="text-sm font-medium mb-2">Comments</h2>
          {comments.length === 0 ? (
            <p className="text-[#828282] text-sm">No comments yet.</p>
          ) : (
            <div className="space-y-2">
              {comments.map((comment) => (
                <div key={comment.id} className="py-1">
                  <div className="text-xs text-[#828282]">
                    {comment.score} points | {formatTimeAgo(comment.createdAt)}
                  </div>
                  <div className="text-sm text-black mt-1">
                    {comment.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;