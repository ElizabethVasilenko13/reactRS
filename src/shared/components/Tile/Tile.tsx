import { FormSubmission } from '@models/form.interface';
import styles from './Tile.module.scss';
import classnames from 'classnames';

type TileProps = {
  submissionInfo: FormSubmission;
};

const Tile: React.FC<TileProps> = ({ submissionInfo }) => {
  return (
    <div className={classnames(styles.tile, { [styles.updated]: submissionInfo.isUpdated })}>
      <h3>Submission Details</h3>
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
        <strong>Picture:</strong>
        <img src={submissionInfo.picture} alt="Image" />
      </p>
      <p>
        <strong>Country:</strong> {submissionInfo.country}
      </p>
    </div>
  );
};

export default Tile;
