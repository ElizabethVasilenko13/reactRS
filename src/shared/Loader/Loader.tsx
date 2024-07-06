import { Component } from 'react';
// import './Loader.css';
import styles from './Loader.module.scss';

class Loader extends Component {
  render() {
    return (
      <div className={styles.loader}>
        <div className={styles.loader__filmstrip} />
        <p className={styles.loader__text}>loading</p>
      </div>
    );
  }
}

export default Loader;
