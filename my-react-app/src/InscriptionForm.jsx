import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './PersonnelForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';

function InscriptionForm({ setinscrits }) {
  const [personnels, setPersonnes] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const communeRegex = /^[a-zA-Z]+$/;

  const sectionList = [
    {value: 'General', label: 'General'},
    {value: 'Technique', label: 'Technique'},
    {value: 'Professionnel', label: 'Professionnel'},

  ];

  const secondaire = [
    {value: '1 secondaire', label: '1 secondaire'},
    {value: '2 secondaire', label: '2 secondaire'},
    {value: '3 secondaire', label: '3 secondaire'},
    {value: '4 secondaire', label: '4 secondaire'},
    {value: '5 secondaire', label: '5 secondaire'},
    {value: '6 secondaire', label: '6 secondaire'},

  ];





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
    date_inscrit: '',
    rembourser: 0.0,
    section: '',
    secondaire_anne:'',
    personne: '',
    
  };

 


  const [inscrits, setinscritss] = useState(initialState);

  function handleChange(event) {
    const { name, value, } = event.target;
  
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

  if(inscrits.minerval <=0){
    alert("le prix du minerval doit être positif et supérieur à 0")
    return;
  }

  if(!datePattern.test(inscrits.date_inscrit)){
    alert("format date invalide, le bon format  est dd/MM/yyyy")
    return;
  }

  if(!communeRegex.test(inscrits.commune)){
    alert("entrer une commune valide uniquement des lettres et aucun espace")
    return;
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
       <div className="form-group">
        <label htmlFor="personne">Personne:</label>
        <select className="form-control" id="personne" name="personne" value={inscrits.personne} onChange={handleChange}>
          <option value="">Sélectionner une personne</option>
          {personnels.map((personnel) => (
            <option key={personnel.id} value={personnel.id}>
              {personnel.nom} {personnel.prenom} {personnel.statut}
              
            </option>
          ))}
        </select>
      </div> 

      <div className="form-group">
        <label htmlFor="date_inscrit">date_inscrit:(dd/MM/yyyy)</label>
        <input type="text" className="form-control" id="date_inscrit" name="date_inscrit" value={inscrits.date_inscrit} onChange={handleChange} />
      </div>

      <div className="form-group">
  <label htmlFor="section">Section:</label>
  <select
    className="form-control"
    id="section"
    name="section"
    value={inscrits.section}
    onChange={handleChange}
  >
    <option value="">Sélectionner une section</option>
    {sectionList.map((inscrit) => (
      <option key={inscrit.value} value={inscrit.value}>
        {inscrit.label}
      </option>
    ))}
  </select>
</div>

<div className="form-group">
  <label htmlFor="secondaire_anne">Secondaire:</label>
  <select
    className="form-control"
    id="secondaire_anne"
    name="secondaire_anne"
    value={inscrits.secondaire_anne}
    onChange={handleChange}
  >
    <option value="">Sélectionner une section</option>
    {secondaire.map((inscrit) => (
      <option key={inscrit.value} value={inscrit.value}>
        {inscrit.label}
      </option>
    ))}
  </select>
</div>

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
