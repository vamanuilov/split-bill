import { X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeModalProps {
  onClose: () => void;
}

export const ThemeModal = ({ onClose }: ThemeModalProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Theme Settings</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Light Theme</span>
          <button
            onClick={() => setTheme('light')}
            className={`w-16 h-8 rounded-full flex items-center transition-colors ${
              theme === 'light' 
                ? 'bg-blue-500 justify-end' 
                : 'bg-gray-300 dark:bg-gray-600 justify-start'
            } cursor-pointer`}
          >
            <span className={`bg-white w-6 h-6 rounded-full shadow-md transform mx-1`}></span>
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Dark Theme</span>
          <button
            onClick={() => setTheme('dark')}
            className={`w-16 h-8 rounded-full flex items-center transition-colors ${
              theme === 'dark' 
                ? 'bg-blue-500 justify-end' 
                : 'bg-gray-300 dark:bg-gray-600 justify-start'
            } cursor-pointer`}
          >
            <span className={`bg-white w-6 h-6 rounded-full shadow-md transform mx-1`}></span>
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <span>System Default</span>
          <button
            onClick={() => {
              const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              setTheme(isSystemDark ? 'dark' : 'light');
            }}
            className="w-16 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-start cursor-pointer"
          >
            <span className="bg-white w-6 h-6 rounded-full shadow-md transform mx-1"></span>
          </button>
        </div>
      </div>
    </div>
  );
};
