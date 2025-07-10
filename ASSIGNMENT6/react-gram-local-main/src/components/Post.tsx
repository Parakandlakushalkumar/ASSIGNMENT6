
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

interface PostProps {
  post: {
    id: string;
    username: string;
    avatar: string;
    image: string;
    caption: string;
    likes: number;
    comments: any[];
    timestamp: string;
    isLiked: boolean;
    isSaved: boolean;
  };
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

const Post = ({ post, onLike, onSave, onComment }: PostProps) => {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden shadow-sm">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img 
            src={post.avatar} 
            alt={post.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-sm">{post.username}</h3>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative">
        <img 
          src={post.image} 
          alt="Post"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onLike(post.id)}
              className={`transition-colors ${post.isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'}`}
            >
              <Heart className={`w-6 h-6 ${post.isLiked ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="text-gray-700 hover:text-gray-900"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="text-gray-700 hover:text-gray-900">
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button 
            onClick={() => onSave(post.id)}
            className={`transition-colors ${post.isSaved ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}
          >
            <Bookmark className={`w-6 h-6 ${post.isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="font-semibold text-sm">{post.likes} likes</span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm mr-2">{post.username}</span>
          <span className="text-sm">{post.caption}</span>
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <button 
            onClick={() => setShowComments(!showComments)}
            className="text-gray-500 text-sm mb-2"
          >
            View all {post.comments.length} comments
          </button>
        )}

        {showComments && (
          <div className="space-y-2 mb-3">
            {post.comments.map((comment, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="font-semibold text-sm">{comment.username}</span>
                <span className="text-sm">{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment */}
        <form onSubmit={handleComment} className="flex items-center space-x-2 border-t pt-3">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 text-sm outline-none"
          />
          {comment.trim() && (
            <button 
              type="submit"
              className="text-blue-500 font-semibold text-sm hover:text-blue-700"
            >
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Post;
