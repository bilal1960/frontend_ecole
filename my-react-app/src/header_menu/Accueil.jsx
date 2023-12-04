import React from 'react';
import { useTranslation } from 'react-i18next';
import DisqusComment from '../school/DisqusComment';
function Accueil() {


  const { t } = useTranslation();

  return( <div>{t("Welcome to our school")}
         <DisqusComment></DisqusComment>



     </div>
  );
}

export default Accueil;
