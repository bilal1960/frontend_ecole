  import useSWR from "swr"
  import { useAuth0 } from '@auth0/auth0-react';
  import React, { useState, useEffect } from 'react';

   function ListPersonnel({personnels}){

    const {getAccessTokenSilently} = useAuth0();
    const [permissions, setPermissions] = useState([]);


    const fetcher = async(URL) =>{
      const accessToken = await getAccessTokenSilently();
      return fetch(URL, {
        headers: {
         accept: 'application/json',
         Authorization: `Bearer ${accessToken}`,
        } 

      }).then((r) => r.json())
    };

    React.useEffect(() => {
     if (data) {
       setPermissions(data);
     }
   }, [data]);
    const { data, isLoading, error } = useSWR('/add/perso/api', fetcher);
  

    if (isLoading) return <p>Chargement...</p>;
    if(data.length===0) return <p>pas de donnée</p>;
    if (error) return <p>Erreur lors du chargement des données.</p>;
    if(data.length>0) return <p>personne ajouté</p>;
  
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
                <span>statut:     {item.statut}     </span>
            </li>
        ))}

         </ul>
       );

           }

     export default ListPersonnel;

        



    
     
