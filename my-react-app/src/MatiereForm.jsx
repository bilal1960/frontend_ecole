import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './PersonnelForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';

function MatiereForm({ setmatieres }) {
  const [personnelss, setPersonnes] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  const matieresList = [
    { value: 'mathématiques', label: 'Mathématiques' },
    { value: 'physique', label: 'physique' },
    { value: 'français', label: 'français' },
    { value: 'chimie', label: 'chimie' },
    { value: 'histoire', label: 'histoire' },
    { value: 'informatique', label: 'informatique' },
    { value: 'biologie', label: 'biologie' },

  ];
  

  useEffect(() => {
    const fetchPersonnesDisponibles = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch('/add/perso/professeurs/api', {
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
  }, []);

  const initialState = {
    nom: '',
    debut: '',
    fin: '',
    debutime: '',
    fintime: '',
    personne: '',
  };

  const [matieres, setmatieress] = useState(initialState);

  function handleChange(event) {
    const { name, value } = event.target;
    

    setmatieress({
      ...matieres,
      [name]: value,
    });
  }


  async function handleForsubmit(event) {
    event.preventDefault();
    
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch('/add/matiere/matieress', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(matieres),
    });

    if (response.ok) {
      setmatieres((matiere) => [...matiere, matieres]);
      setmatieress(initialState);
    } else {
      const data = await response.json();
      

    }
  
    return '';
  }

  return (
    <Form onSubmit={handleForsubmit}>
      <div className="form-group">
        <label htmlFor="personne">Personne:</label>
        <select className="form-control" id="personne" name="personne" value={matieres.personne} onChange={handleChange} >
          <option value="">Sélectionner une personne</option>
          {personnelss.map((personnel) => (
            <option key={personnel.id} value={personnel.id}>
              {personnel.nom} {personnel.prenom} {personnel.statut}
            </option>
          ))}
        </select>
      </div>

<div className="form-group">
  <label htmlFor="nom">Matière:</label>
  <select
    className="form-control"
    id="nom"
    name="nom"
    value={matieres.nom}
    onChange={handleChange}
  >
    <option value="">Sélectionner une matière</option>
    {matieresList.map((matiere) => (
      <option key={matiere.value} value={matiere.value}>
        {matiere.label}
      </option>
    ))}
  </select>
</div>


      <div className="form-group">
        <label htmlFor="debut">Début:</label>
        <input type="text" className="form-control" id="debut" name="debut" value={matieres.debut} onChange={handleChange}  />
      </div>

      <div className="form-group">
        <label htmlFor="fin">Fin:</label>
        <input type="text" className="form-control" id="fin" name="fin" value={matieres.fin} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="debutime">Debutime (HH:mm):</label>
        <input type="time" className="form-control" id="debutime" name="debutime" value={matieres.debutime} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="fintime">Fintime (HH:mm):</label>
        <input type="time" className="form-control" id="fintime" name="fintime" value={matieres.fintime} onChange={handleChange} />
      </div>

      <p>
        <Button className={`btn btn-primary ${style.menu}`} type="submit">
          <i className="bi bi-save" /> Ajouter matière
        </Button>
      </p>

    </Form>
  );
}

export default MatiereForm;
