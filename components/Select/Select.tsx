import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './Select.module.css';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export interface SelectHook<T> {
  value: T | undefined;
  setValue: Dispatch<SetStateAction<T>>;
}

export function useSelect<T>(defaultValue: T): SelectHook<T> {
  const [value, setValue] = useState<T>(defaultValue);
  return { value, setValue };
}

export default function Select<T>(props: { id?: string; className?: string; children?: any; hook: SelectHook<T> }) {
  const handleChange = (event: any) => {
    props.hook.setValue(event.target.value);
  };

  return (
    <div className={styles.select_wrapper}>
      <select className={classNames(styles.select, props.className)} id={props.id} onChange={handleChange}>
        <option selected={true} value={undefined}>
          ---
        </option>
        {props.children}
      </select>
      <FontAwesomeIcon icon={faCaretDown} className={styles.select_icon} />
    </div>
  );
}
