import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';

function PersonneAffichage() {
  const [data, setData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch('add/personnes/api', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [getAccessTokenSilently]);

  return (
    <div className="row">
      {data.map((item) => (
        <div key={item.id} className="col-lg-6 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">id: {item.id}</h5>
              <p className="card-text">nom: {item.nom}</p>
              <p className="card-text">prenom: {item.prenom}</p>
              <p className="card-text">naissance: {item.naissance}</p>
              <p className="card-text">nationalite: {item.nationalite}</p>
              <p className="card-text">sexe: {item.sexe}</p>
              <p className="card-text">adresse: {item.adresse}</p>
              <p className="card-text">statut: {item.statut}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PersonneAffichage;
