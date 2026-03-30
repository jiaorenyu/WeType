import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
}

interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  parentId?: number;
  score: number;
  createdAt: string;
  user: User;
  children?: Comment[];
}

interface CommentSectionProps {
  postId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/comments/post/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const response = await axios.post('http://localhost:3001/api/comments', {
        content: newComment,
        postId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComments(prevComments => [response.data.comment, ...prevComments]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const response = await axios.post('http://localhost:3001/api/comments', {
        content: replyContent,
        postId,
        parentId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const addReplyToComment = (comments: Comment[]): Comment[] => {
        return comments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              children: [...(comment.children || []), response.data.comment]
            };
          }
          if (comment.children) {
            return {
              ...comment,
              children: addReplyToComment(comment.children)
            };
          }
          return comment;
        });
      };

      setComments(addReplyToComment);
      setReplyingTo(null);
      setReplyContent('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const handleVote = async (commentId: number, value: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const response = await axios.post(`http://localhost:3001/api/comments/${commentId}/vote`, {
        value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updateCommentScore = (comments: Comment[]): Comment[] => {
        return comments.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, score: response.data.score };
          }
          if (comment.children) {
            return { ...comment, children: updateCommentScore(comment.children) };
          }
          return comment;
        });
      };

      setComments(updateCommentScore);
    } catch (error) {
      console.error('Error voting:', error);
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
    return <div className="text-[#828282] text-sm py-2">Loading comments...</div>;
  }

  const renderComment = (comment: Comment, depth = 0) => {
    const indentClass = depth > 0 ? `ml-${Math.min(depth * 4, 12)}` : '';
    
    return (
      <div key={comment.id} className={`${indentClass} py-2`}>
        <div className="flex items-start">
          {/* Vote Arrows */}
          <div className="flex flex-col items-center mr-2">
            <button 
              onClick={() => handleVote(comment.id, 1)}
              className="text-[#828282] hover:text-[#ff6600] text-xs leading-none"
              title="upvote"
            >
              ▲
            </button>
            <button 
              onClick={() => handleVote(comment.id, -1)}
              className="text-[#828282] hover:text-[#ff6600] text-xs leading-none mt-0.5"
              title="downvote"
            >
              ▼
            </button>
          </div>
          
          <div className="flex-1">
            {/* Comment Header */}
            <div className="text-[#828282] text-xs">
              <a href="#" className="hover:underline text-black font-medium">
                {comment.user.username}
              </a>
              <span className="mx-1">{formatTimeAgo(comment.createdAt)}</span>
              <span className="mx-1">|</span>
              <span>{comment.score} points</span>
            </div>
            
            {/* Comment Content */}
            <div className="text-sm text-black mt-1 leading-relaxed">
              {comment.content}
            </div>
            
            {/* Comment Actions */}
            <div className="text-[#828282] text-xs mt-1">
              <button 
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="hover:underline"
              >
                reply
              </button>
            </div>
            
            {/* Reply Form */}
            {replyingTo === comment.id && (
              <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-2">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  rows={3}
                  className="w-full max-w-2xl p-2 border border-[#828282] text-sm"
                />
                <div className="mt-1 flex items-center space-x-2">
                  <button 
                    type="submit" 
                    className="bg-[#ff6600] text-white px-3 py-1 text-xs hover:bg-[#e55a00]"
                  >
                    reply
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setReplyingTo(null)}
                    className="text-[#828282] hover:underline text-xs"
                  >
                    cancel
                  </button>
                </div>
              </form>
            )}
            
            {/* Nested Replies */}
            {comment.children && comment.children.length > 0 && (
              <div className="mt-2">
                {comment.children.map(child => renderComment(child, depth + 1))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4">
      {/* Add Comment Form */}
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={4}
          className="w-full max-w-2xl p-2 border border-[#828282] text-sm"
        />
        <div className="mt-2">
          <button 
            onClick={handleSubmitComment}
            className="bg-[#ff6600] text-white px-3 py-1 text-sm hover:bg-[#e55a00]"
          >
            add comment
          </button>
        </div>
      </div>
      
      {/* Comments List */}
      <div>
        {comments.length === 0 ? (
          <div className="text-[#828282] text-sm">No comments yet.</div>
        ) : (
          comments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
};

export default CommentSection;