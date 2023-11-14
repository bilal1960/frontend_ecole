import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useSWR from "swr";

function ListInscription({ inscrit }) {
  const { getAccessTokenSilently } = useAuth0();
  const [permissions, setPermissions] = useState([]);

  const fetcher = async (URL) => {
    const accessToken = await getAccessTokenSilently();
    return fetch(URL, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    }).then((r) => r.json());
  };
  const { data, isLoading, error } = useSWR("/add/inscriptions", fetcher);

  React.useEffect(() => {
    if (data) {
      setPermissions(data);
    }
  }, [data]);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  // Filtrer les matières en fonction des autorisations
  const matieresFiltrees = matiere.filter((item) => {
    return permissions.includes(item.permission);
  });

  return (
    <ul>
      {inscrit.map((item) => (
        <li key={item.id}>
          <span>id:          {item.id}      </span>
          <span>nom:         {item.nom}      </span>
          <span>prenom:      {item.prenom}   </span>
          <span>naissance:   {item.naissance}</span>
          <span>nationalite: {item.nationalite}</span>
          <span>sexe:        {item.sexe}       </span>
          <span>commune:     {item.commune}    </span>
          <span>adresse:     {item.adresse}   </span>
          <span>minerval:    {item.minerval}  </span>

        </li>
      ))}
    </ul>
  );
}

export default ListInscription;
