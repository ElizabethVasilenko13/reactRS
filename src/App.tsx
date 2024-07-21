import ErrorBoundary from '@shared/ErrorBoundary/ErrorBoundary';
import Main from '@pages/Main/Main';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <Main />
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};

export default App;
