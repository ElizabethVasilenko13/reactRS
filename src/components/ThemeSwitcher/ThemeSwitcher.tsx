'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useTheme } from '@context/ThemeContext';
import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <label className={styles.switch} htmlFor="themeSwitch">
        <input type="checkbox" id="themeSwitch" name="theme-switch" onChange={toggleTheme} checked={theme === 'dark'} />
        <span className={styles.slider} />
      </label>
    </div>
  );
};

export default ThemeSwitcher;
