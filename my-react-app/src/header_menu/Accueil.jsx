import React from 'react';
import { useTranslation } from 'react-i18next';

function Accueil() {

  const { t } = useTranslation();

  return( <div>{t("Welcome to our school")}

     </div>
  );
}

export default Accueil;
