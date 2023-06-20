import React from 'react';
import useSWR from "swr"
import { useAuth0 } from '@auth0/auth0-react';


 function ListPersonnel({personnels}){

  const {getAccessTokenSilently} = useAuth0();

  const fetcher = async(URL) =>{
    const accessToken = await getAccessTokenSilently();
    return fetch(URL, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      } 

    }).then((r) => r.jSON())
  };
  const { data, isLoading, error } = useSWR('/add/personnes', fetcher);
  if(personnels === undefined || personnels ===null) return <p>encore aucune personne à la liste!</p>;

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;
  



    return (
        <ul>
          {personnels.map((item) => (
            <li key={item.id}>
              <span>id:          {item.id}      </span>
              <span>nom:         {item.nom}      </span>
              <span> prenom:     {item.prenom}   </span>
              <span>naissance:  {item.naissance} </span>
              <span>nationalite: {item.nationalite}</span>
              <span>sexe:        {item.sexe}       </span>
              <span>adresse:     {item.adresse}    </span>
              <span>statut: {item.statut}          </span>
            </li>
          ))}
        </ul>
      );
          }

     export default ListPersonnel;

        
    
     
