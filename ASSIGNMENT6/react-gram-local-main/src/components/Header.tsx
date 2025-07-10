
import React from 'react';
import { Heart, Home, PlusSquare, Search, User, MessageCircle } from 'lucide-react';

interface HeaderProps {
  currentUser: any;
  onCreatePost: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header = ({ currentUser, onCreatePost, activeTab, setActiveTab }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Instagram
          </h1>
        </div>
        
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <nav className="flex items-center space-x-6">
          <button 
            onClick={() => setActiveTab('home')}
            className={`p-2 rounded-lg transition-colors ${activeTab === 'home' ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}
          >
            <Home className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`p-2 rounded-lg transition-colors ${activeTab === 'messages' ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}
          >
            <MessageCircle className="w-6 h-6" />
          </button>
          <button 
            onClick={onCreatePost}
            className="p-2 rounded-lg text-gray-700 hover:text-pink-600 transition-colors"
          >
            <PlusSquare className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveTab('activity')}
            className={`p-2 rounded-lg transition-colors ${activeTab === 'activity' ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}
          >
            <Heart className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`p-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
