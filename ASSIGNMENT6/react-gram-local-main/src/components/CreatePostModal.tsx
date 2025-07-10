
import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, Type } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (postData: { image: string; caption: string }) => void;
}

const CreatePostModal = ({ isOpen, onClose, onCreatePost }: CreatePostModalProps) => {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [step, setStep] = useState(1);
  const [postType, setPostType] = useState<'image' | 'text'>('image');

  const sampleImages = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', { image, caption, postType });
    
    if (caption.trim() && (postType === 'text' || image)) {
      console.log('Creating post...');
      onCreatePost({ image: postType === 'text' ? '' : image, caption });
      // Reset form state
      setImage('');
      setCaption('');
      setStep(1);
      setPostType('image');
      onClose();
    } else {
      console.log('Validation failed:', { image: !!image, caption: caption.trim(), postType });
    }
  };

  const handleImageSelect = (selectedImage: string) => {
    console.log('Image selected:', selectedImage);
    setImage(selectedImage);
    setPostType('image');
    setStep(2);
  };

  const handleTextPost = () => {
    console.log('Text post selected');
    setPostType('text');
    setImage('');
    setStep(2);
  };

  const handleClose = () => {
    setImage('');
    setCaption('');
    setStep(1);
    setPostType('image');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold">Create new post</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          {step === 1 ? (
            <div className="flex-1 flex flex-col">
              <div className="text-center py-4 mb-4">
                <h3 className="text-lg font-medium mb-2">What would you like to share?</h3>
                <p className="text-gray-500">Choose an option below</p>
              </div>
              
              {/* Post Type Selection */}
              <div className="flex gap-4 mb-4">
                <button
                  onClick={handleTextPost}
                  className="flex-1 p-4 border-2 border-gray-200 rounded-lg hover:border-pink-500 transition-colors text-center"
                >
                  <Type className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <span className="text-sm font-medium">Text Post</span>
                </button>
                <div className="flex-1 p-4 border-2 border-gray-200 rounded-lg">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <span className="text-sm font-medium">Photo Post</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {sampleImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageSelect(img)}
                      className="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                    >
                      <img 
                        src={img} 
                        alt={`Sample ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              {postType === 'image' && image && (
                <div className="aspect-square rounded-lg overflow-hidden mb-4 flex-shrink-0">
                  <img 
                    src={image} 
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {postType === 'text' && (
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-4 mb-4 flex-shrink-0">
                  <Type className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-center text-purple-700 font-medium">Text Post</p>
                </div>
              )}
              
              <div className="flex-1 flex flex-col">
                <textarea
                  placeholder={postType === 'text' ? "What's on your mind?" : "Write a caption..."}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none flex-1 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
                  rows={postType === 'text' ? 8 : 4}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons - Always visible */}
        {step === 2 && (
          <div className="flex space-x-3 p-4 border-t flex-shrink-0">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!caption.trim()}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Share
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostModal;
