import React from 'react';
import { Modal } from 'antd';
import {
  GithubLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

interface LoginModalProps {
  visible: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible }) => {
  const handleLogin = () => {
    console.log('login!');
  };
  return (
    <Modal
      visible={visible}
      centered
      title="로그인. 부탁."
      closable={false}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <GithubLoginButton onClick={handleLogin}>Github</GithubLoginButton>
      <GoogleLoginButton onClick={handleLogin}>Google</GoogleLoginButton>
    </Modal>
  );
};

export default LoginModal;
