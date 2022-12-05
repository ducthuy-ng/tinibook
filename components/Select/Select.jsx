import React from 'react';
import styles from './Select.module.css';
import classNames from 'classnames';

function Select({ id = '', children }) {
  return (
    <select id={id} className={classNames(styles.select_container)}>
      {children}
    </select>
  );
}

export default Select;
