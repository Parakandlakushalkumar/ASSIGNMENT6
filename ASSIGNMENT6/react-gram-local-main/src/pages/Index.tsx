
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Story from '../components/Story';
import Post from '../components/Post';
import Profile from '../components/Profile';
import CreatePostModal from '../components/CreatePostModal';
import { 
  saveToLocalStorage, 
  loadFromLocalStorage, 
  initializeDefaultData 
} from '../utils/localStorage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  // Initialize data on component mount
  useEffect(() => {
    initializeDefaultData();
    setCurrentUser(loadFromLocalStorage('currentUser'));
    setPosts(loadFromLocalStorage('posts', []));
    setStories(loadFromLocalStorage('stories', []));
    setSavedPosts(loadFromLocalStorage('savedPosts', []));
  }, []);

  const handleLikePost = (postId: string) => {
    const updatedPosts = posts.map((post: any) => {
      if (post.id === postId) {
        const newIsLiked = !post.isLiked;
        return {
          ...post,
          isLiked: newIsLiked,
          likes: newIsLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    saveToLocalStorage('posts', updatedPosts);
  };

  const handleSavePost = (postId: string) => {
    const post = posts.find((p: any) => p.id === postId);
    if (!post) return;

    const updatedPosts = posts.map((p: any) => 
      p.id === postId ? { ...p, isSaved: !p.isSaved } : p
    );
    setPosts(updatedPosts);
    saveToLocalStorage('posts', updatedPosts);

    const currentSaved = loadFromLocalStorage('savedPosts', []);
    const isCurrentlySaved = currentSaved.some((p: any) => p.id === postId);
    
    let newSavedPosts;
    if (isCurrentlySaved) {
      newSavedPosts = currentSaved.filter((p: any) => p.id !== postId);
    } else {
      newSavedPosts = [...currentSaved, { ...post, isSaved: true }];
    }
    
    setSavedPosts(newSavedPosts);
    saveToLocalStorage('savedPosts', newSavedPosts);
  };

  const handleAddComment = (postId: string, commentText: string) => {
    const updatedPosts = posts.map((post: any) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { username: currentUser?.username || 'You', text: commentText }]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    saveToLocalStorage('posts', updatedPosts);
  };

  const handleCreatePost = (postData: { image: string; caption: string }) => {
    const newPost = {
      id: Date.now().toString(),
      username: currentUser?.username || 'You',
      avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
      image: postData.image,
      caption: postData.caption,
      likes: 0,
      comments: [],
      timestamp: 'now',
      isLiked: false,
      isSaved: false
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    saveToLocalStorage('posts', updatedPosts);
  };

  const handleStoryClick = (storyId: string) => {
    const updatedStories = stories.map((story: any) =>
      story.id === storyId ? { ...story, isViewed: true } : story
    );
    setStories(updatedStories);
    saveToLocalStorage('stories', updatedStories);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Instagram...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser}
        onCreatePost={() => setShowCreateModal(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="pt-20">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Stories */}
            <div className="flex space-x-4 p-4 bg-white rounded-lg border border-gray-200 mb-6 overflow-x-auto">
              {stories.map((story: any) => (
                <Story 
                  key={story.id} 
                  story={story} 
                  onClick={() => handleStoryClick(story.id)}
                />
              ))}
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post: any) => (
                <Post
                  key={post.id}
                  post={post}
                  onLike={handleLikePost}
                  onSave={handleSavePost}
                  onComment={handleAddComment}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <Profile 
            user={currentUser}
            posts={posts}
            savedPosts={savedPosts}
          />
        )}

        {activeTab === 'messages' && (
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Messages</h2>
              <p className="text-gray-600">Direct messages feature coming soon!</p>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Activity</h2>
              <p className="text-gray-600">Activity notifications coming soon!</p>
            </div>
          </div>
        )}
      </main>

      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
};

export default Index;
