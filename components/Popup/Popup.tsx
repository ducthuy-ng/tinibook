import styles from './Popup.module.css';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useState } from 'react';

export type PopupHook = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  isShowing: boolean;
  setShowingState: Dispatch<SetStateAction<boolean>>;
};

export const usePopup = (): PopupHook => {
  const [message, setMessage] = useState('');
  const [isShowing, setShowingState] = useState(false);

  return {
    message,
    setMessage,
    isShowing,
    setShowingState,
  };
};

type Props = {
  popupHook: PopupHook;
  variant?: 'info' | 'success' | 'warning';
};

const styleForVariant = {
  info: null,
  warning: styles.popup_warning,
  success: null,
};

function Popup(props: Props) {
  let variant = props.variant || 'info';

  return (
    <div
      onClick={() => {
        props.popupHook.setShowingState(false);
      }}
      className={classNames(
        styles.popup,
        styleForVariant[variant],
        props.popupHook.isShowing ? styles.popup_show : styles.popup_hide
      )}
    >
      {props.popupHook.message}
    </div>
  );
}

export default Popup;
