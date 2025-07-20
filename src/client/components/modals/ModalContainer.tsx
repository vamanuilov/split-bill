import { useModal } from '../../contexts/ModalContext';
import { AuthModal } from './AuthModal';
import { ThemeModal } from './ThemeModal';
import { CurrencyModal } from './CurrencyModal';
import { FriendsModal } from './FriendsModal';

export const ModalContainer = () => {
  const { modalType, modalProps, closeModal } = useModal();

  if (!modalType) return null;

  const renderModal = () => {
    switch (modalType) {
      case 'auth':
        return <AuthModal onClose={closeModal} {...modalProps} />;
      case 'theme':
        return <ThemeModal onClose={closeModal} {...modalProps} />;
      case 'currency':
        return <CurrencyModal onClose={closeModal} {...modalProps} />;
      case 'friends':
        return <FriendsModal onClose={closeModal} {...modalProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {renderModal()}
      </div>
    </div>
  );
};
