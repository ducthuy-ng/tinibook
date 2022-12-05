import React, { Dispatch, HTMLInputTypeAttribute, SetStateAction, useState } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';

export type InputHook = {
  value: string;
  changeValue: Dispatch<SetStateAction<string>>;
};

export const useInputHook = (startValue?: string): InputHook => {
  const [value, changeValue] = useState(startValue || '');
  return { value, changeValue };
};

type Props = {
  id?: string;
  type?: HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
  name?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  inputHook?: InputHook;
};

const Input = (props: Props) => {
  return (
    <input
      id={props.id}
      type={props.type}
      className={classNames(styles.box, props.className)}
      name={props.name}
      placeholder={props.placeholder}
      value={props.inputHook ? props.inputHook.value : props.value}
      disabled={props.disabled}
      onChange={(event) => props.inputHook && props.inputHook.changeValue(event.target.value)}
    />
  );
};

export default Input;
