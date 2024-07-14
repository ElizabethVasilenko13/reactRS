import Main from '@pages/Main/Main';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Main />
      <Outlet />
    </div>
  );
};

export default App;
