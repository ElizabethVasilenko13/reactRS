import Image from 'next/image';
import loader from '/public/images/giphy.webp';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <Image src={loader.src} alt="Loader" width={200} height={200} />
    </div>
  );
};

export default Loader;
