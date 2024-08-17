import { FormSubmission } from '@models/form.interface';
import styles from './Tile.module.scss';
import classnames from 'classnames';
import { useEffect, useState } from 'react';

type TileProps = {
  submissionInfo: FormSubmission;
};

const Tile: React.FC<TileProps> = ({ submissionInfo }) => {
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (submissionInfo.isUpdated) {
      setIsUpdated(true);
      const timer = setTimeout(() => {
        setIsUpdated(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submissionInfo.isUpdated]);
  return (
    <div className={classnames(styles.tile, { [styles.updated]: isUpdated })}>
      <p>
        <strong>Name:</strong> {submissionInfo.name}
      </p>
      <p>
        <strong>Age:</strong> {submissionInfo.age}
      </p>
      <p>
        <strong>Email:</strong> {submissionInfo.email}
      </p>
      <p>
        <strong>Gender:</strong> {submissionInfo.gender}
      </p>
      <p>
        <strong>Country:</strong> {submissionInfo.country}
      </p>
      <p className={styles.image}>
        <img src={submissionInfo.picture} alt="Image" />
      </p>
    </div>
  );
};

export default Tile;
