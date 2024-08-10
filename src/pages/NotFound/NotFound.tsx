import { useNavigate } from 'react-router-dom';
import lostImg from '@assets/lost.png';
import loader from '@assets/giphy.webp';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <>
      <h1>Have lost in space?</h1>
      <h2>Click on the portal to get back home</h2>
      <div className={styles.container}>
        <img src={lostImg} alt="Lost img" className={styles.rick} />
        <button type="button" onClick={handleNavigateHome}>
          <img src={loader} alt="Portal img" className={styles.rick} />
        </button>
      </div>
    </>
  );
};

export default NotFound;
