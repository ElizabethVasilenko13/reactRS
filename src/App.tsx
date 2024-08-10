import ErrorBoundary from '@shared/ErrorBoundary/ErrorBoundary';
import Main from '@pages/Main/Main';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </div>
  );
};

export default App;
