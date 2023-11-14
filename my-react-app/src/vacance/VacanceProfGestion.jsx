import React, { useEffect,useState } from 'react';
import VacanceProfForm from './VacanceProfForm';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

function VacanceProfGestion(){
const { user, getAccessTokenSilently } = useAuth0();
const [vacProfs, setVacances] = useState([]);
const {t } = useTranslation();

return (
    <>
      <h2>{t('add a person please')}</h2>
      <VacanceProfForm setVacances={setVacances} />
    </>
  );



}
export default VacanceProfGestion