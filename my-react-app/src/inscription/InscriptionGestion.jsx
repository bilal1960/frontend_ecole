import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import InscriptionForm from './InscriptionForm';
import { useTranslation } from 'react-i18next';

function InscriptionGestion() {
  const [inscrit, setinscrit] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();

  useEffect(() => {
    const fetchInscription = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch("/add/inscriptions", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setinscrit(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInscription();
  }, [getAccessTokenSilently]);

  return (
    <>
      <h2>{t('add a registrer ')}</h2>
      <InscriptionForm setinscrits={setinscrit} />
    </>
  );
}

export default InscriptionGestion;
