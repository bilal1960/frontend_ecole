import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <Button variant="primary" onClick={handleLogin}>
      {t('login')}
    </Button>
  );
};

export default LoginButton;
