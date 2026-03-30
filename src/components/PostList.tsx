import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection';

interface Post {
  id: number;
  title: string;
  content?: string;
  url?: string;
  userId: number;
  score: number;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleVote = async (postId: number, value: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const response = await axios.post(`http://localhost:3001/api/posts/${postId}/vote`, {
        value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? { ...post, score: response.data.score } : post
        )
      );
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const toggleComments = (postId: number) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const getDomain = (url?: string) => {
    if (!url) return null;
    try {
      const domain = new URL(url).hostname;
      return domain.replace(/^www\./, '');
    } catch {
      return null;
    }
  };

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

  return (
    <div className="bg-[#f6f6ef] min-h-screen">
      <div className="container mx-auto px-2 py-2">
        {posts.length === 0 ? (
          <div className="text-[#828282] py-4">No posts yet. Be the first to submit!</div>
        ) : (
          <div className="space-y-0">
            {posts.map((post, index) => (
              <div key={post.id} className="py-1">
                <div className="flex items-start">
                  {/* Rank Number */}
                  <div className="text-[#828282] text-sm w-6 text-right mr-2 mt-0.5">
                    {index + 1}.
                  </div>
                  
                  {/* Vote Arrows */}
                  <div className="flex flex-col items-center mr-2">
                    <button 
                      onClick={() => handleVote(post.id, 1)}
                      className="text-[#828282] hover:text-[#ff6600] text-xs leading-none"
                      title="upvote"
                    >
                      ▲
                    </button>
                    <button 
                      onClick={() => handleVote(post.id, -1)}
                      className="text-[#828282] hover:text-[#ff6600] text-xs leading-none mt-0.5"
                      title="downvote"
                    >
                      ▼
                    </button>
                  </div>
                  
                  {/* Post Content */}
                  <div className="flex-1">
                    {/* Title Line */}
                    <div className="flex items-baseline flex-wrap">
                      <a 
                        href={post.url || '#'} 
                        target={post.url ? "_blank" : undefined}
                        rel={post.url ? "noopener noreferrer" : undefined}
                        className="text-black text-sm hover:underline mr-1"
                        onClick={(e) => !post.url && e.preventDefault()}
                      >
                        {post.title}
                      </a>
                      {post.url && (
                        <span className="text-[#828282] text-xs">
                          ({getDomain(post.url)})
                        </span>
                      )}
                    </div>
                    
                    {/* Meta Line */}
                    <div className="text-[#828282] text-xs mt-0.5">
                      <span>{post.score} points</span>
                      <span className="mx-1">by</span>
                      <a href="#" className="hover:underline">{post.user.username}</a>
                      <span className="mx-1">{formatTimeAgo(post.createdAt)}</span>
                      <span className="mx-1">|</span>
                      <button 
                        onClick={() => toggleComments(post.id)}
                        className="hover:underline"
                      >
                        {/* This would need comment count from API */}
                        discuss
                      </button>
                    </div>
                    
                    {/* Content (if no URL) */}
                    {post.content && !post.url && (
                      <div className="text-sm text-black mt-2 max-w-2xl">
                        {post.content}
                      </div>
                    )}
                    
                    {/* Comments Section */}
                    {expandedPostId === post.id && (
                      <div className="mt-3">
                        <CommentSection postId={post.id} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Footer */}
        <div className="border-t border-[#ff6600] mt-4 pt-2 text-center text-[#828282] text-sm">
          <div className="space-x-2">
            <a href="#" className="hover:underline">Guidelines</a>
            <span>|</span>
            <a href="#" className="hover:underline">FAQ</a>
            <span>|</span>
            <a href="#" className="hover:underline">Lists</a>
            <span>|</span>
            <a href="#" className="hover:underline">API</a>
            <span>|</span>
            <a href="#" className="hover:underline">Security</a>
            <span>|</span>
            <a href="#" className="hover:underline">Legal</a>
            <span>|</span>
            <a href="#" className="hover:underline">Apply to YC</a>
            <span>|</span>
            <a href="#" className="hover:underline">Contact</a>
          </div>
          <div className="mt-2">
            <form className="inline-flex items-center">
              <span className="mr-2">Search:</span>
              <input 
                type="text" 
                className="border border-[#828282] px-1 py-0.5 text-sm w-48"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;