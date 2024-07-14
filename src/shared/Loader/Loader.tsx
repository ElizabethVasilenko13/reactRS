import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__filmstrip} />
      <p className={styles.loader__text}>loading</p>
    </div>
  );
};

export default Loader;
