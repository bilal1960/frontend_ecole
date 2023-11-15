import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AbsenceForm from './AbsenceForm';
import { useTranslation } from 'react-i18next';

function AbsenceGestion() {
  const [absence, setAbsences] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch("/add/absence/etudiants/api1", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setAbsences(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAbsences();
  }, [getAccessTokenSilently]);

  return (
    <>
      <h2>{t("Manages absences")}</h2>
      <AbsenceForm setAbsences={setAbsences} />
    </>
  );
}

export default AbsenceGestion;
