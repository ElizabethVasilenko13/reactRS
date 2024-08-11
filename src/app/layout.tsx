import { ThemeProvider } from '@context/ThemeContext';
import ErrorBoundary from '@shared/ErrorBoundary/ErrorBoundary';
import StoreProvider from './StoreProvider';
import './index.scss';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ErrorBoundary>
            <ThemeProvider>{children}</ThemeProvider>
          </ErrorBoundary>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
