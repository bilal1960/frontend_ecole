import React, { useState } from 'react';
import useSWR from "swr";
import { useAuth0 } from '@auth0/auth0-react';

function ListeNote({points}){
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

  const { data, isLoading, error } = useSWR("/add/note/notes", fetcher);

  React.useEffect(() => {
    if (data) {
      setPermissions(data);
    }
  }, [data]);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  return (
    <ul>
      {points.map((item) => (
        <li key={item.id}>
          <span>id:                  {item.id}   </span>
          <span>nom:                 {item.nom}  </span>
          <span>deliberation: {item.deliberation}</span>
          <span>session:         {item.session}  </span>
          <span>resultat:         {item.resultat}  </span>
          <span>moyenne:         {item.moyenne}  </span>
          <span>reussi:         {item.reussi}  </span>


        </li>
      ))}
    </ul>
  );

}
export default ListeNote