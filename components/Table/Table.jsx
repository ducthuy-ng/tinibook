import React from 'react';
import styles from './Table.module.css';

function Table({ children }) {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.innerTable}>{children}</table>
    </div>
  );
}

export default Table;
