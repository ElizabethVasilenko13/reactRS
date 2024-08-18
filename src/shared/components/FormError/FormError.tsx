import classNames from 'classnames';
import styles from './FormError.module.scss';

interface FormErrorProps {
  error?: string;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  return (
    <div className={styles.inputErrorContainer}>
      {error && <div className={classNames(styles.inputError)}>{error}</div>}
    </div>
  );
};

export default FormError;
