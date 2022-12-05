import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';

import styles from './Modal.module.css';
import { Close } from '@mui/icons-material';

export type ModalHook = {
  displayState: boolean;
  setDisplayState: Dispatch<SetStateAction<boolean>>;
};

export const useModal = (): ModalHook => {
  const [displayState, setDisplayState] = useState(false);
  return { displayState, setDisplayState };
};

function Modal(props: {
  hook: ModalHook;
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <div className={classNames(styles.modal, props.hook.displayState ? styles.modal_show : styles.modal_hide)}>
      <div className={classNames(styles.modalContainer)}>
        <div className={styles.titleCloseBtn}>
          <Close className={styles.closeBtn} onClick={() => props.hook.setDisplayState(false)} />
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
