import React, { useState, useEffect } from 'react';
import PersonnelForm from './PersonnelForm';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

function PersonneGestion() {
  const [personnels, setPersonnelss] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPersonne = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch("/add/perso/api", {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        });
        const data = await response.json();
        setPersonnelss(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPersonne();
  }, [getAccessTokenSilently]);

  return (
    <>
      <h2>{t('add a person please')}</h2>
      <PersonnelForm setPersonnelss={setPersonnelss} />
    </>
  );
}

export default PersonneGestion;
