import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  className?: classNames.ArgumentArray | string;
  id?: string;
  name?: string;
  placeholder?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: any;
};

function Button(props: Props) {
  return (
    <button type={props.type} className={classNames(styles.button, props.className)} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
