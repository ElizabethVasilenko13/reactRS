import { usePasswordStrength } from '@hooks/usePasswordStrength';
import styles from './PasswordStrength.module.scss';
import classNames from 'classnames';

interface PasswordStrengthProps {
  password: string;
  isPasswordFocused?: boolean;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, isPasswordFocused = true }) => {
  const passwordStrength = usePasswordStrength(password);

  return (
    <div className={classNames(styles.passwordStrength, { [styles.hidden]: !isPasswordFocused })}>
      <div className={styles.progressBar}>
        <div
          className={classNames(styles.progressFill, {
            [styles.veryWeak]: passwordStrength <= 25,
            [styles.weak]: passwordStrength > 25 && passwordStrength <= 50,
            [styles.medium]: passwordStrength > 50 && passwordStrength <= 75,
            [styles.strong]: passwordStrength > 75,
          })}
          style={{ width: `${passwordStrength}%` }}
        />
      </div>
      <div className={styles.strengthText}>Password Strength: {passwordStrength}%</div>
    </div>
  );
};

export default PasswordStrength;
