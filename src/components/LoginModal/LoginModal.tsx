import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Spin } from 'antd';
import {
  GithubLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import {
  clear,
  loginRequest,
  userSelector,
} from 'service/redux/slices/userSlice';
import { LOGIN_STATUS, PROVIDERS } from 'utils/constants';
import { useTranslation } from 'react-i18next';

interface LoginModalProps {
  visible: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loadingStatus = useSelector(userSelector).status;

  const handleLogin = (provider: string) => {
    if (loadingStatus === LOGIN_STATUS.LOADING) return;
    dispatch(loginRequest({ provider }));
  };

  useEffect(() => {
    if (loadingStatus === LOGIN_STATUS.FAILED) {
      dispatch(clear());
    }
  }, [dispatch, loadingStatus]);

  const renderIf =
    loadingStatus === LOGIN_STATUS.LOADING ? (
      <Spin />
    ) : (
      <>
        <GithubLoginButton onClick={() => handleLogin(PROVIDERS.GITHUB)}>
          {PROVIDERS.GITHUB}
        </GithubLoginButton>
        <GoogleLoginButton onClick={() => handleLogin(PROVIDERS.GOOGLE)}>
          {PROVIDERS.GOOGLE}
        </GoogleLoginButton>
      </>
    );
  return (
    <Modal
      visible={visible}
      centered
      title={t('Modal.LoginTitle')}
      closable={false}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      {renderIf}
    </Modal>
  );
};

export default LoginModal;
