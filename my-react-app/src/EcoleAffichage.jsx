import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PermissionGuard from './PermissionGuard';
import UpdateEcole from './UpdateEcole';

const SchoolDetails = () => {
  const [ecole, setEcole] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const id = '04ece6ce-2690-4152-a5c9-09d40d5891b7';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`/add/ecoles/ecole?id=${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des détails de l\'école');
        }

        const data = await response.json();
        setEcole(data);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des détails de l\'école :', error);
      }
    };

    fetchData();
  }, [getAccessTokenSilently, id]);

  const handleUpdateEcole = async (updatedEcole) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`/add/ecoles/ecole/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEcole),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour des détails de l\'école');
      }

      // Mettre à jour les détails de l'école localement
      setEcole(updatedEcole);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la mise à jour des détails de l\'école :', error);
    }
  };

  return (
    <div>
      {ecole ? (
        <div>
          <h2>{ecole.nom}</h2>
          <p>Adresse: {ecole.adresse}</p>
          <p>Email: {ecole.mail}</p>
          <p>Téléphone: {ecole.number}</p>
          <p>Type: {ecole.type}</p>

          <PermissionGuard permission="write:ecole">
            <UpdateEcole ecole={ecole} onUpdateEcole={handleUpdateEcole} />
          </PermissionGuard>
        </div>
      ) : (
        <p>Chargement des détails de l'école...</p>
      )}
    </div>
  );
};

export default SchoolDetails;
