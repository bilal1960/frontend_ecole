import React from 'react';
import useSWR from "swr"
import { useAuth0 } from '@auth0/auth0-react';

function ListMatiere({matiere}){

  const {getAccessTokenSilently} = useAuth0();

  const fetcher = async(URL) =>{
    const accessToken = await getAccessTokenSilently();
    return fetch(URL, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      } 

    }).then((r) => r.json())
  };

  const { data, isLoading, error } = useSWR('/add/matieres', fetcher);

  if (isLoading) return <p>Chargement...</p>;
  if(data.length===0) return <p>pas de donnée</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;
  if(data.length>0) return <p>matiere ajouté</p>;

    return (
        <ul>
          {matiere.map((item) => (
            <li key={item.id}>
              <span>id:        {item.id}      </span>
              <span>nom:      {item.nom}      </span>
              <span> debut:  {item.debut}    </span>
              <span>fin:     {item.fin}      </span>
            </li>
        ))}
  </ul>
);
}

export default ListMatiere;