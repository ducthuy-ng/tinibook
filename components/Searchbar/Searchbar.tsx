import React, { HTMLInputTypeAttribute } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Input, { InputHook } from '../Input/Input';
import styles from './Searchbar.module.css';
import classNames from 'classnames';

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
      <SearchIcon className={styles.iconSearch} />
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
