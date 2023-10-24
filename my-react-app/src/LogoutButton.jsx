 import React from "react";
 import { useAuth0 } from "@auth0/auth0-react";
 import Button from "react-bootstrap/Button";
 import { useTranslation } from 'react-i18next';

 const LogoutButton = () => {
   const { logout } = useAuth0();
   const { t } = useTranslation();

   return (
     <Button 
      variant="primary" 
       onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    >
       {t('logout')}

     </Button>
   );
 };

 export default LogoutButton;
