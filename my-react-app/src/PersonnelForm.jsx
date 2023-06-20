import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './PersonnelForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function PersonnelForm({ setPersonnelss }) {
    const [personnelss, setPersonnels] = useState({
      nom: '',
      prenom: '',
      naissance: '',
      nationalite: '',
      sexe: '',
      adresse: '',
      statut: '',
    });

    function handleNomChange(event) {
      const newnom = event.target.value;
      setPersonnels({
        ...personnelss,
        nom: newnom,
      });
    }

    function handlePrenomChange(event) {
      const newprenom = event.target.value;
      setPersonnels({
        ...personnelss,
        prenom: newprenom,
      });
    }
  
    function handleNaissanceChange(event) {
      const newnaissance = event.target.value;
      setPersonnels({
        ...personnelss,
        naissance: newnaissance,
      });
    }

    function handleNationaliteChange(event) {
      const newnationalite = event.target.value;
      setPersonnels({
        ...personnelss,
        nationalite: newnationalite,
      });
    }

    function handleSexeChange(event)      {
      const newsexe = event.target.value;
      setPersonnels({
        ...personnelss,
        sexe: newsexe,
      });
    }
    
    function handleAdresse(event)         {
      const newadresse = event.target.value
      setPersonnels({
         ...personnelss,
         adresse: newadresse,
      });
    }

    function handleStatut(event)         {
      const newstatut = event.target.value
      setPersonnels({
         ...personnelss,
         statut: newstatut,
      });
    }

    async  function handleForsubmit(event) {
      event.preventDefault();

     await fetch('/add/personnes',{
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify( personnelss)
    });
      if (
        !personnelss.nom.trim() ||
        !personnelss.prenom.trim() ||
        !personnelss.naissance.trim() ||
        !personnelss.adresse.trim()
      ) {
        // eslint-disable-next-line no-alert
        return alert('tous les champs doivent être complété!');
      }
  
      
    }
    return (
      <Form onSubmit={handleForsubmit}>
        
  
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input type="text" className="form-control" id="nom" value={personnelss.nom} onChange={handleNomChange} />
        </div>
  
        <div className="form-group">
          <label htmlFor="prenom">prénom:</label>
          <input type="text" className="form-control" id="prenom" value={personnelss.prenom} onChange={handlePrenomChange} />
        </div>
  
        <div className="form-group">
          <label htmlFor="naissance">naissance:</label>
          <input type="text" className="form-control" id="naissance" value={personnelss.naissance} onChange={handleNaissanceChange} />
        </div>
  
        <div className="form-group">
          <label htmlFor="nationalite">nationalite:</label>
          <input type="text" className="form-control" id="nationalite" value={personnelss.nationalite} onChange={handleNationaliteChange} />
        </div>
        <div className="form-group">
          <label htmlFor="sexe">sexe:</label>
          <input type="text" className="form-control" id="sexe" value={personnelss.sexe} onChange={handleSexeChange} />
        </div>
        
        <div className="form-group">
          <label htmlFor="adresse">adresse:</label>
          <input type="text" className="form-control" id="adresse" value={personnelss.adresse} onChange={handleAdresse} />
        </div>

        <div className="form-group">
          <label htmlFor="statut">statut:</label>
          <input type="text" className="form-control" id="statut" value={personnelss.adresse} onChange={handleStatut} />
        </div>

        <p>
          <Button className={`btn btn-primary ${style.menu}`} type="submit">
            <i className="bi bi-save" /> Enregistrer personne
          </Button>
        </p>
      </Form>
    );
  }
  
  export default PersonnelForm;