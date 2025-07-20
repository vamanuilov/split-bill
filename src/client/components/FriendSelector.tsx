import { useState, useEffect, useCallback } from 'react';
import { ChevronDown, UserPlus } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
}

interface FriendSelectorProps {
  onSelectFriend: (name: string) => void;
}

export const FriendSelector = ({ onSelectFriend }: FriendSelectorProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedFriends = localStorage.getItem('friends');
    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }
  }, []);

  const handleSelectFriend = useCallback((friendName: string) => {
    onSelectFriend(friendName);
    setIsOpen(false);
  }, [onSelectFriend]);

  if (friends.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center h-full justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded whitespace-nowrap cursor-pointer"
      >
        <UserPlus size={16} className="mr-1" />
        <span className="text-sm">Friends</span>
        <ChevronDown 
          size={14} 
          className={`ml-1 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
          <div className="max-h-48 overflow-y-auto">
            {friends.map(friend => (
              <button
                key={friend.id}
                onClick={() => handleSelectFriend(friend.name)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {friend.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
