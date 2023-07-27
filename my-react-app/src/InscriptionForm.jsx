import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './PersonnelForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';

function InscriptionForm({ setinscrits }) {
  const [personnels, setPersonnes] = useState([]);
  const { getAccessTokenSilently } = useAuth0();





  useEffect(() => {
    const fetchPersonnesDisponibles = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch('/add/perso/api', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setPersonnes(data);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des personnes disponibles.', error);
      }
    };
    
    
  

    fetchPersonnesDisponibles();
  },[]);

  

  const initialState = {
    commune: '',
    minerval: '',
    personne: '',
    
  };

 


  const [inscrits, setinscritss] = useState(initialState);

  function handleChange(event) {
    const { name, value, } = event.target;
    console.log("Valeur sélectionnée:", value); // Ajoutez cette ligne pour vérifier la valeur de "inscrits.matiere"
  
    setinscritss({
      ...inscrits,
      [name]: value,
    });
  }

  

  async function handleForsubmit(event) {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();

    const personneAssociee = personnels.find((personnel) => personnel.id === inscrits.personne);
  if ( personneAssociee.statut === "professeur") {
    
  }


    
   
    const response = await fetch('/add/inscriptions', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(inscrits),
    });

    if (response.ok) {
      setinscrits((inscrit) => [...inscrit, inscrits]);
      setinscritss(initialState);
    } else {
      return 'error';
    }
    return '';
  }

  return (
    <Form onSubmit={handleForsubmit}>
      { <div className="form-group">
        <label htmlFor="personne">Personne:</label>
        <select className="form-control" id="personne" name="personne" value={inscrits.personne} onChange={handleChange}>
          <option value="">Sélectionner une personne</option>
          {personnels.map((personnel) => (

            
            <option key={personnel.id} value={personnel.id}>
              {personnel.nom} {personnel.prenom} {personnel.statut}
              
            </option>
          ))}
        </select>
      </div> }




   
  


      <div className="form-group">
        <label htmlFor="commune">commune:</label>
        <input type="text" className="form-control" id="commune" name="commune" value={inscrits.commune} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="minerval">minerval:</label>
        <input type="text" className="form-control" id="minerval" name="minerval" value={inscrits.minerval} onChange={handleChange} />
      </div>

      <p>
        <Button className={`btn btn-primary ${style.menu}`} type="submit">
          <i className="bi bi-save" /> inscrire étudiant
        </Button>
      </p>
    </Form>
  );
}

export default InscriptionForm;
