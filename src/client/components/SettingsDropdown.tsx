import { useState, useCallback } from 'react';
import { Settings, ChevronDown, Sun, Moon, DollarSign, Users } from 'lucide-react';
import { useModal, type ModalType } from '../contexts/ModalContext';
import { useTheme } from '../contexts/ThemeContext';

export const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const { theme, toggleTheme } = useTheme();

  const handleOptionClick = useCallback((modalType: ModalType) => {
    openModal(modalType);
    setIsOpen(false);
  }, [openModal]);

  const handleThemeToggle = useCallback(() => {
    toggleTheme();
    setIsOpen(false);
  }, [toggleTheme]);

  const settingsOptions: Array<{ key: ModalType, label: string, icon: typeof DollarSign }> = [
    { key: 'currency', label: 'Currency', icon: DollarSign },
    { key: 'friends', label: 'Friends', icon: Users }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
        aria-label="Settings"
      >
        <Settings size={16} />
        <ChevronDown 
          size={14} 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
          <div>
            <button
              onClick={handleThemeToggle}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span>Theme</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {theme === 'dark' ? 'Dark' : 'Light'}
              </div>
            </button>
            {settingsOptions.map(option => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.key}
                  onClick={() => handleOptionClick(option.key)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <IconComponent size={16} />
                  <span>{option.label}</span>
                </button>
              );
            })}
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
