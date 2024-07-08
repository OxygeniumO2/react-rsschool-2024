import React from 'react';
import styles from './loader.module.css';

class Loader extends React.Component {
  render() {
    return (
      <div className={styles.loaderContainer}>
        Loading...
        <div className={styles.ldsRoller}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Loader;
