import classNames from 'classnames';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import LoginStyles from '../styles/login.module.css';
import Popup, { usePopup } from '../components/Popup/Popup';
import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

export default function Login() {
  const popupHook = usePopup();

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const data = {
      username: target.username.value,
      password: target.password.value,
    };

    const resp = await fetch('/api/identity-access/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    switch (resp.status) {
      case 200: {
        await router.push('/');
      }

      case 401:
        popupHook.setMessage('Invalid credential');
        popupHook.setShowingState(true);
        break;

      case 500:
        popupHook.setMessage('Internal server error. Please try again later.');
        popupHook.setShowingState(true);
        break;

      default:
        popupHook.setMessage('Unknown error. Please try again later.');
        popupHook.setShowingState(true);
    }
  };

  return (
    <form className={LoginStyles.login} onSubmit={handleSubmit}>
      <div className={LoginStyles.login_container}>
        <div className={classNames(LoginStyles.row, LoginStyles.row_center)}>
          <h1>Đăng nhập</h1>
        </div>
        <div className={classNames(LoginStyles.row, LoginStyles.row_input)}>
          <label htmlFor="username" className={LoginStyles.label}>
            Email
          </label>
          <Input id={'username'} name="username" placeholder="Nhập tên tài khoản" />
        </div>
        <div className={classNames(LoginStyles.row, LoginStyles.row_input)}>
          <label htmlFor="password" className={LoginStyles.label}>
            Mật khẩu
          </label>
          <Input id={'password'} name="password" type={'password'} placeholder="Nhập mật khẩu" />
        </div>
        <div className={classNames(LoginStyles.row, LoginStyles.row_center)}>
          <Button type={'submit'} className={classNames(LoginStyles.button)}>
            Đăng Nhập
          </Button>
        </div>
      </div>
      <Popup variant={'warning'} popupHook={popupHook} />
    </form>
  );
}
