
// Utility functions for localStorage operations

export const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key: string, defaultValue: any = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Initialize default data
export const initializeDefaultData = () => {
  const defaultUser = {
    id: '1',
    username: 'john_doe',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    bio: 'Photography enthusiast 📸 | Travel lover ✈️ | Coffee addict ☕',
    followers: 1205,
    following: 456,
    highlights: [
      { title: 'Travel', cover: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b' },
      { title: 'Food', cover: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901' },
      { title: 'Work', cover: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1' }
    ]
  };

  const defaultPosts = [
    {
      id: '1',
      username: 'john_doe',
      avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      caption: 'Working from my favorite coffee shop today ☕️ #worklife #coffee',
      likes: 124,
      comments: [
        { username: 'jane_smith', text: 'Love this spot!' },
        { username: 'mike_wilson', text: 'Great lighting for photos 📸' }
      ],
      timestamp: '2 hours ago',
      isLiked: false,
      isSaved: false
    },
    {
      id: '2',
      username: 'jane_smith',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      caption: 'New setup complete! Ready for some serious coding 💻 #developer #workspace',
      likes: 89,
      comments: [
        { username: 'john_doe', text: 'Clean setup! 🔥' }
      ],
      timestamp: '5 hours ago',
      isLiked: true,
      isSaved: false
    }
  ];

  const defaultStories = [
    {
      id: '1',
      username: 'john_doe',
      avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      isViewed: false
    },
    {
      id: '2',
      username: 'jane_smith',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      isViewed: false
    },
    {
      id: '3',
      username: 'mike_wilson',
      avatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
      isViewed: true
    }
  ];

  // Only initialize if data doesn't exist
  if (!loadFromLocalStorage('currentUser')) {
    saveToLocalStorage('currentUser', defaultUser);
  }
  if (!loadFromLocalStorage('posts')) {
    saveToLocalStorage('posts', defaultPosts);
  }
  if (!loadFromLocalStorage('stories')) {
    saveToLocalStorage('stories', defaultStories);
  }
  if (!loadFromLocalStorage('savedPosts')) {
    saveToLocalStorage('savedPosts', []);
  }
};
