import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SchoolDetails = () => {
  const [ecole, setEcole] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const id = '04ece6ce-2690-4152-a5c9-09d40d5891b7';

    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`/add/ecoles/ecole?id=${id}`, {

          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des détails de l\'école');
        }

        const data = await response.json();
        setEcole(data);
      } catch (error) {
        console.log('Une erreur s\'est produite lors de la récupération des détails de l\'école :', error);
      }
    };

    fetchData();
  }, [getAccessTokenSilently]);

  return (
    <div>
      {ecole ? (
        <div>
          <h2>{ecole.nom}</h2>
          <p>Adresse: {ecole.adresse}</p>
          <p>Email: {ecole.mail}</p>
          <p>Téléphone: {ecole.number}</p>
          <p>Type: {ecole.type}</p>
        </div>
      ) : (
        <p>Chargement des détails de l'école...</p>
      )}
    </div>
  );
};

export default SchoolDetails;
