
import React from 'react';

interface StoryProps {
  story: {
    id: string;
    username: string;
    avatar: string;
    image: string;
    isViewed: boolean;
  };
  onClick: () => void;
}

const Story = ({ story, onClick }: StoryProps) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center space-y-1 cursor-pointer group"
    >
      <div className={`p-0.5 rounded-full ${story.isViewed ? 'bg-gray-300' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'} transition-transform group-hover:scale-105`}>
        <div className="w-16 h-16 rounded-full bg-white p-0.5">
          <img 
            src={story.avatar} 
            alt={story.username}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-gray-600 truncate max-w-[70px]">
        {story.username}
      </span>
    </div>
  );
};

export default Story;
