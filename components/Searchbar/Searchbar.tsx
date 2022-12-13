import React, { HTMLInputTypeAttribute } from 'react';
import Input, { InputHook } from '../Input/Input';
import classNames from 'classnames';
import styles from './Searchbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type Props = {
  id?: string;
  type?: HTMLInputTypeAttribute;
  defaultValue?: string | number;
  name?: string;
  className?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  inputHook?: InputHook;
};

export default function Searchbar(props: Props) {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon className={styles.iconSearch} icon={faMagnifyingGlass} />
      <Input
        id={props.id}
        type={props.type}
        name={props.name}
        className={classNames(props.className, styles.SearchbarInput)}
        placeholder={props.placeholder}
        inputHook={props.inputHook}
      />
    </div>
  );
}
