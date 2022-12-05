import React from 'react';
import styles from './TableRow.module.css';

function TableRows({ rowsData }) {
  return rowsData.map((data, index) => {
    const { isbn, name, quantity, price } = data;
    return (
      <tr key={index}>
        <td className={styles.tdItem}>{index + 1}</td>
        <td className={styles.tdItem}>{isbn}</td>
        <td className={styles.tdItem}>{name}</td>
        <td className={styles.tdItem}>{quantity}</td>
        <td className={styles.tdItem}>{price}</td>
      </tr>
    );
  });
}

export default TableRows;
