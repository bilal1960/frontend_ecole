import useSWR from "swr";
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';

function ListVacanceProf({vacProfs}){
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

      const { data, isLoading, error } = useSWR('/add/vacance', fetcher);

  useEffect(() => {
    if (data) {
      setPermissions(data);
    }
  }, [data]);

  if (isLoading) return <p>Chargement...</p>;
  if (data.length === 0) return <p>pas de donnée</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;
  if (data.length > 0) return <p>personne ajouté</p>;

  return (
    <ul>
      {vacProfs.map((item) => (
        <li key={item.id}>
          <span>id:         {item.id}</span>
          <span>datedebut:  {item.datedebut}</span>
          <span>datefin:    {item.datefin}</span>
          <span>type:       {item.type}</span>
          <span>commentaire:{item.commentaire}</span>
        </li>
      ))}
    </ul>
  );
}
export default ListVacanceProf;


