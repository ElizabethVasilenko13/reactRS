import loader from '/public/images/giphy.webp';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img src={loader.src} alt="Loader" />
    </div>
  );
};

export default Loader;
