import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './PersonnelForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';

function InscriptionForm({ setinscrits }) {
    const { getAccessTokenSilently } = useAuth0();

    const [inscrits, setinscritss] = useState({
      nom: '',
      prenom: '',
      naissance: '',
      nationalite: '',
      sexe: '',
      commune: '',
      adresse: '',
      minerval: '',
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

    function handleadresse(event){
      const newadresse = event.target.value
      setinscritss({
        ...inscrits,
        adresse: newadresse,
      }) 
    }

    function handleminerval(event){
      const newminerval = event.target.value
      setinscritss({
        ...inscrits,
        minerval: newminerval,
      })
    }
    async  function handleForsubmit(event) {
        event.preventDefault();
        const accessToken = await getAccessTokenSilently();

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
      
            setinscritss({
              nom: '',
              prenom: '',
              naissance: '',
              nationalite: '',
              sexe: '',
              commune: '',
              adresse: '',
              minerval: '',
            });
          } else {
            return 'error';
          }
          return '';
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

          <div className="form-group">
            <label htmlFor="adresse">adresse:</label>
            <input type="text" className="form-control" id="adresse" value={inscrits.adresse} onChange={handleadresse} />
          </div>

          <div className="form-group">
            <label htmlFor="adresse">minerval:</label>
            <input type="text" className="form-control" id="minerval" value={inscrits.minerval} onChange={handleminerval} />
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