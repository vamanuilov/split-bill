import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ModalProvider } from './contexts/ModalContext';
import { BillSplitterApp } from './components/BillSplitter';
import { ModalContainer } from './components/modals/ModalContainer';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 p-4">
              <BillSplitterApp />
              <ModalContainer />
            </main>
          </div>
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
