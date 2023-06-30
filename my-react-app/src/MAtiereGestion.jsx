import React, { useEffect,useState } from 'react';
import MatiereForm from "./MatiereForm";
import { useAuth0 } from '@auth0/auth0-react';

function MatiereGestion(){
    const [matiere, setmatieres] = useState('' || []);
    const { user, getAccessTokenSilently } = useAuth0();
  const [matieres, setMatieres] = useState([]);

  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        const accessToken = await getAccessTokenSilently(); 
        const response = await fetch("add/matieres", {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        });
        const data = await response.json();
        setMatieres(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMatieres();
  }, [getAccessTokenSilently]);
    
    return (
        <>
          <h2>ajouter une matière  svp</h2>

          <MatiereForm setmatieres={setmatieres} />
          
        </>
      );


}

export default MatiereGestion;