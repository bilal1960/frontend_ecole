import React, { useEffect,useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import InscriptionForm from './InscriptionForm';

function InscriptionGestion(){
    const [inscrit, setinscrit] = useState( []);
    const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchInscription = async () => {
      try {
        const accessToken = await getAccessTokenSilently(); 
        const response = await fetch("/add/inscriptions", {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        });
        const data = await response.json();
        setinscrit(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInscription();
  }, [getAccessTokenSilently]);
    
    return (
        <>
          <h2>ajouter une inscription svp  svp</h2>

          <InscriptionForm setinscrits={setinscrit} />
          
        </>
      );


}

export default InscriptionGestion;