import { FormSubmission } from '@models/form.interface';
import styles from './Tile.module.scss';
import classnames from 'classnames';
import { useEffect } from 'react';
import { useAppDispatch } from '@store/store';
import { resetIsUpdatedByIndex } from '@store/form/form.slice';

type TileProps = {
  submissionInfo: FormSubmission;
  index: number;
  formType: 'uncontrolled' | 'reactHook';
};

const Tile: React.FC<TileProps> = ({ submissionInfo, index, formType }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (submissionInfo.isUpdated) {
      const timer = setTimeout(() => {
        dispatch(resetIsUpdatedByIndex({ index, formType }));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submissionInfo.isUpdated]);

  return (
    <div className={classnames(styles.tile, { [styles.updated]: submissionInfo.isUpdated })}>
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
