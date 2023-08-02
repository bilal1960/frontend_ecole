import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './PersonnelForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';

function PersonnelForm({ setPersonnelss }) {
  const { getAccessTokenSilently } = useAuth0();
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const adresseRegexp = /^[A-Za-z][A-Za-z\d\s./]*$/;
  const nationalitechamp = /^[A-Za-zéèç]*$/;
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;

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

  function handleSexeChange(event) {
    const newsexe = event.target.value;
    setPersonnels({
      ...personnelss,
      sexe: newsexe,
    });
  }

  function handleAdresse(event) {
    const newadresse = event.target.value;
    setPersonnels({
      ...personnelss,
      adresse: newadresse,
    });
  }

  function handleStatut(event) {
    const newstatut = event.target.value;
    setPersonnels({
      ...personnelss,
      statut: newstatut,
    });
  }

  async function handleForsubmit(event) {
    event.preventDefault();

    if(!regex.test(personnelss.nom)){
      alert("Le nom doit contenir uniquement des lettres et espace");
      return;
    }

    if (!regex.test(personnelss.prenom)) {
      alert("Le prénom doit contenir uniquement des lettres et espace");
      
      return;
    }
    if (!datePattern.test(personnelss.naissance)) {
      alert("Le format de la date de début doit être dd/MM/yyyy.");
      return;
    }
    
    if(personnelss.sexe != "homme" && personnelss.sexe != "femme"){
      alert("Le champ sexe doit être complété par homme ou femme");
      return;
    }
    if(personnelss.statut != "etudiant" && personnelss.statut != "professeur"){
      alert("Le champ statut doit être complété par etudiant ou professeur");
      return;
    }

    if (!adresseRegexp.test(personnelss.adresse)) {
      alert("Entrer une adresse valide");
      return;
  }

  if (!nationalitechamp.test(personnelss.nationalite)) {
    alert("Entrer une nationalité sans espace ni chiffre");
    return;
}

    const accessToken = await getAccessTokenSilently();

    const response = await fetch('/add/perso/pagi', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(personnelss),
    });

    if (response.ok) {
      setPersonnelss((personnels) => [...personnels, personnelss]);

      setPersonnels({
        nom: '',
        prenom: '',
        naissance: '',
        nationalite: '',
        sexe: '',
        adresse: '',
        statut: '',
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
        <input
          type="text"
          className="form-control"
          id="nom"
          value={personnelss.nom}
          onChange={handleNomChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="prenom">Prénom:</label>
        <input
          type="text"
          className="form-control"
          id="prenom"
          value={personnelss.prenom}
          onChange={handlePrenomChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="naissance">Naissance:(dd/MM/yyyy)</label>
        <input
          type="text"
          className="form-control"
          id="naissance"
          value={personnelss.naissance}
          onChange={handleNaissanceChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="nationalite">Nationalité:</label>
        <input
          type="text"
          className="form-control"
          id="nationalite"
          value={personnelss.nationalite}
          onChange={handleNationaliteChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="sexe">Sexe: homme ou femme</label>
        <input
          type="text"
          className="form-control"
          id="sexe"
          value={personnelss.sexe}
          onChange={handleSexeChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="adresse">Adresse:</label>
        <input
          type="text"
          className="form-control"
          id="adresse"
          value={personnelss.adresse}
          onChange={handleAdresse}
        />
      </div>

      <div className="form-group">
        <label htmlFor="statut">Statut: etudiant ou professeur</label>
        <input
          type="text"
          className="form-control"
          id="statut"
          value={personnelss.statut}
          onChange={handleStatut}
        />
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
