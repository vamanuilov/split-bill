import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface FriendsModalProps {
  onClose: () => void;
}

interface Friend {
  id: string;
  name: string;
}

export const FriendsModal = ({ onClose }: FriendsModalProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [newFriendName, setNewFriendName] = useState('');

  useEffect(() => {
    // Load saved friends from localStorage
    const savedFriends = localStorage.getItem('friends');
    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }
  }, []);

  const saveFriends = (updatedFriends: Friend[]) => {
    localStorage.setItem('friends', JSON.stringify(updatedFriends));
    setFriends(updatedFriends);
  };

  const addFriend = () => {
    if (newFriendName.trim()) {
      const newFriend = {
        id: Date.now().toString(),
        name: newFriendName.trim()
      };
      const updatedFriends = [...friends, newFriend];
      saveFriends(updatedFriends);
      setNewFriendName('');
    }
  };

  const removeFriend = (id: string) => {
    const updatedFriends = friends.filter(friend => friend.id !== id);
    saveFriends(updatedFriends);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addFriend();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Friends List</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Manage your friends list for quick access when splitting bills
        </p>
        
        <div className="flex mb-4">
          <input
            type="text"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter friend's name"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700"
          />
          <button
            onClick={addFriend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md cursor-pointer flex items-center"
          >
            <Plus size={18} />
            <span className="ml-1">Add</span>
          </button>
        </div>
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {friends.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No friends added yet
            </p>
          ) : (
            friends.map(friend => (
              <div 
                key={friend.id}
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md"
              >
                <span>{friend.name}</span>
                <button
                  onClick={() => removeFriend(friend.id)}
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
