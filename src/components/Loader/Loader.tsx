import styles from './loader.module.css';

export const Loader = () => (
  <div className={styles.loaderContainer}>
    Loading...
    <div data-testid="loader" className={styles.ldsRoller}>
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
