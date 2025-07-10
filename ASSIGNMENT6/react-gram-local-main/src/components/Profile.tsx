
import React from 'react';
import { Settings, Grid, Bookmark, Tag } from 'lucide-react';

interface ProfileProps {
  user: any;
  posts: any[];
  savedPosts: any[];
}

const Profile = ({ user, posts, savedPosts }: ProfileProps) => {
  const [activeTab, setActiveTab] = React.useState('posts');

  const userPosts = posts.filter(post => post.username === user.username);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-start space-x-8 mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
          <img 
            src={user.avatar} 
            alt={user.username}
            className="w-full h-full rounded-full object-cover bg-white p-1"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-2xl font-light">{user.username}</h1>
            <button className="px-4 py-1 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200">
              Edit profile
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <Settings className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex space-x-8 mb-4">
            <span><strong>{userPosts.length}</strong> posts</span>
            <span><strong>{user.followers}</strong> followers</span>
            <span><strong>{user.following}</strong> following</span>
          </div>
          
          <div>
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Stories Highlights */}
      <div className="flex space-x-6 mb-8 overflow-x-auto">
        {user.highlights.map((highlight: any, index: number) => (
          <div key={index} className="flex flex-col items-center space-y-1 min-w-0">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <img 
                src={highlight.cover} 
                alt={highlight.title}
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
            <span className="text-xs text-gray-600 truncate max-w-[70px]">{highlight.title}</span>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="border-t border-gray-200">
        <nav className="flex justify-center space-x-16 -mb-px">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center space-x-1 py-3 text-sm font-medium border-t-2 ${
              activeTab === 'posts' 
                ? 'border-gray-900 text-gray-900' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>POSTS</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center space-x-1 py-3 text-sm font-medium border-t-2 ${
              activeTab === 'saved' 
                ? 'border-gray-900 text-gray-900' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>SAVED</span>
          </button>
          <button
            onClick={() => setActiveTab('tagged')}
            className={`flex items-center space-x-1 py-3 text-sm font-medium border-t-2 ${
              activeTab === 'tagged' 
                ? 'border-gray-900 text-gray-900' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>TAGGED</span>
          </button>
        </nav>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 mt-1">
        {activeTab === 'posts' && userPosts.map((post) => (
          <div key={post.id} className="aspect-square bg-gray-100 hover:opacity-75 cursor-pointer">
            <img 
              src={post.image} 
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {activeTab === 'saved' && savedPosts.map((post) => (
          <div key={post.id} className="aspect-square bg-gray-100 hover:opacity-75 cursor-pointer">
            <img 
              src={post.image} 
              alt="Saved post"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {activeTab === 'tagged' && (
          <div className="col-span-3 text-center py-12 text-gray-500">
            No tagged posts yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
