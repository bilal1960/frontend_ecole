import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './PersonnelForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function InscriptionForm({ setinscrits }) {
    const [inscrits, setinscritss] = useState({
      nom: '',
      prenom: '',
      naissance: '',
      nationalite: '',
      sexe: '',
      commune: '',
    });

    function handleNomChange(event) {
      const newnom = event.target.value;
      setinscritss({
        ...inscrits,
        nom: newnom,
      });
    }

    function handlePrenomChange(event) {
      const newprenom = event.target.value;
      setinscritss({
        ...inscrits,
        prenom: newprenom,
      });
    }
  
    function handleNaissanceChange(event) {
      const newnaissance = event.target.value;
      setinscritss({
        ...inscrits,
        naissance: newnaissance,
      });
    }

    function handleNationaliteChange(event) {
      const newnationalite = event.target.value;
      setinscritss({
        ...inscrits,
        nationalite: newnationalite,
      });
    }

    function handleSexeChange(event)      {
      const newsexe = event.target.value;
      setinscritss({
        ...inscrits,
        sexe: newsexe,
      });
    }
    
    function handlecommune(event)         {
      const newcommune = event.target.value
      setinscritss({
         ...inscrits,
         commune: newcommune,
      });
    }
    async  function handleForsubmit(event) {
        event.preventDefault();

        if (
            !inscrits.nom.trim() ||
            !inscrits.prenom.trim() ||
            !inscrits.naissance.trim()||
            !inscrits.commune.trim()||
            !inscrits.sexe.trim()||
            !inscrits.nationalite.trim()
          ) {
            // eslint-disable-next-line no-alert
            return alert('tous les champs doivent être complété!');
          }

    }

    return (
        <Form onSubmit={handleForsubmit}>
          
    
          <div className="form-group">
            <label htmlFor="nom">Nom:</label>
            <input type="text" className="form-control" id="nom" value={inscrits.nom} onChange={handleNomChange} />
          </div>
    
          <div className="form-group">
            <label htmlFor="prenom">prénom:</label>
            <input type="text" className="form-control" id="prenom" value={inscrits.prenom} onChange={handlePrenomChange} />
          </div>
    
          <div className="form-group">
            <label htmlFor="naissance">naissance:</label>
            <input type="text" className="form-control" id="naissance" value={inscrits.naissance} onChange={handleNaissanceChange} />
          </div>
    
          <div className="form-group">
            <label htmlFor="nationalite">nationalite:</label>
            <input type="text" className="form-control" id="nationalite" value={inscrits.nationalite} onChange={handleNationaliteChange} />
          </div>
          <div className="form-group">
            <label htmlFor="sexe">sexe:</label>
            <input type="text" className="form-control" id="sexe" value={inscrits.sexe} onChange={handleSexeChange} />
          </div>
          
          <div className="form-group">
            <label htmlFor="adresse">commune:</label>
            <input type="text" className="form-control" id="commune" value={inscrits.commune} onChange={handlecommune} />
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