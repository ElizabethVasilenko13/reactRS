import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import styles from './Title.module.scss';

type HeaderProps = {
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: string;
};

const Title: React.FC<HeaderProps> = ({ title, level = 1, color }) => {
  const { theme } = useTheme();

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={classNames(styles.header, styles[theme])} style={{ color }}>
      {title}
    </Tag>
  );
};

export default Title;
