import styles from './Popup.module.css';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Variant = 'info' | 'success' | 'warning';

export type PopupHook = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  isShowing: boolean;
  setShowingState: Dispatch<SetStateAction<boolean>>;
  currentVariant: Variant;
  setCurrentVariant: Dispatch<SetStateAction<Variant>>;
};

export const usePopup = (): PopupHook => {
  const [message, setMessage] = useState('');
  const [isShowing, setShowingState] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<Variant>('info');

  return {
    message,
    setMessage,
    isShowing,
    setShowingState,
    currentVariant,
    setCurrentVariant,
  };
};

type Props = {
  popupHook: PopupHook;
  variant?: Variant;
};

const styleForVariant = {
  info: null,
  warning: styles.popup_warning,
  success: styles.popup_success,
};

function Popup(props: Props) {
  useEffect(() => {
    props.popupHook.setCurrentVariant(props.variant || 'info');
  }, [props.popupHook, props.variant]);

  return (
    <div
      onClick={() => {
        props.popupHook.setShowingState(false);
      }}
      className={classNames(
        styles.popup,
        styleForVariant[props.popupHook.currentVariant],
        props.popupHook.isShowing ? styles.popup_show : styles.popup_hide
      )}
    >
      {props.popupHook.message}
    </div>
  );
}

export default Popup;
