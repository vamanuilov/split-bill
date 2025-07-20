import { createContext, useState, useContext, type ReactNode } from 'react';

export type ModalType = 'auth' | 'theme' | 'currency' | 'friends' | null;

interface ModalContextType {
  modalType: ModalType;
  modalProps: Record<string, any>;
  openModal: (type: ModalType, props?: Record<string, any>) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalProps, setModalProps] = useState<Record<string, any>>({});

  const openModal = (type: ModalType, props: Record<string, any> = {}) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  return (
    <ModalContext.Provider value={{ modalType, modalProps, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
