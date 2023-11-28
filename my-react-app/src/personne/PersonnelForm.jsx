import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './PersonnelForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';


function PersonnelForm({ setPersonnelss }) {
  const { getAccessTokenSilently } = useAuth0();
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const adresseRegexp = /^\s*[A-Za-z][A-Za-z\d\s./]*$/;
  const nationalitechamp = /^[A-Za-zéèç]*$/;
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
  const { t } = useTranslation();



  const [personnelss, setPersonnels] = useState({
    nom: '',
    prenom: '',
    naissance: '',
    nationalite: '',
    sexe: '',
    adresse: '',
    statut: '',
    mail: '',
  });

  const formattedNaissance = personnelss.naissance ? format(parseISO(personnelss.naissance), 'dd/MM/yyyy') : '';

  const personnelToSubmit = {
    ...personnelss,
    naissance: formattedNaissance, 
  };

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

  function handleMail(event) {
    const newmail = event.target.value;
    setPersonnels({
      ...personnelss,
      mail: newmail,
    });
  }

  async function handleForsubmit(event) {
    event.preventDefault();

    const accessToken = await getAccessTokenSilently();

    if (!regex.test(personnelss.nom)) {
      toastr.error("Le nom doit contenir uniquement des lettres et espace");
      return;
    }

    if (!regex.test(personnelss.prenom)) {
      toastr.error("Le prénom doit contenir uniquement des lettres et espace");
      return;
    }
    if (!datePattern.test(formattedNaissance)) {
      toastr.error("Le format de la date de naissance doit être dd/MM/yyyy.");
      return;
    }

    if (!adresseRegexp.test(personnelss.adresse)) {
      toastr.error("Entrer une adresse valide");
      return;
    }

    if (!nationalitechamp.test(personnelss.nationalite)) {
      toastr.error("Entrer une nationalité sans espace ni chiffre");
      return;
    }

    try {
        const response = await fetch('/add/perso/pagi', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(personnelToSubmit),
        });

        if (!response.ok) {
            const errorData = await response.json();
            toastr.error(errorData.erreur || "Une erreur s'est produite lors de la soumission");
            return;
        }

        // Gestion de la réponse réussie
        const newPersonnel = await response.json();
        setPersonnelss((personnels) => [...personnels, newPersonnel]);

        // Réinitialiser le formulaire
        setPersonnels({
            nom: '',
            prenom: '',
            naissance: '',
            nationalite: '',
            sexe: '',
            adresse: '',
            statut: '',
            mail: '',
        });
        toastr.success("Personne ajoutée avec succès!");
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire', error);
        toastr.error("Erreur lors de la communication avec le serveur");
    }
}


  return (
    <Form onSubmit={handleForsubmit}>
      
      <div className="form-group">
        <label htmlFor="nom">{t('name')}</label>
        <input
          type="text"
          className="form-control custom-input"
          id="nom"
          value={personnelss.nom}
          onChange={handleNomChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="prenom">{t('firstname')}</label>
        <input
          type="text"
          className="form-control"
          id="prenom"
          value={personnelss.prenom}
          onChange={handlePrenomChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="naissance">{t('year of birth')}</label>
        <input
          type="date"
          className="form-control"
          id="naissance"
          value={personnelss.naissance}
          onChange={handleNaissanceChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="nationalite">{t('nationality')}</label>
        <input
          type="text"
          className="form-control"
          id="nationalite"
          value={personnelss.nationalite}
          onChange={handleNationaliteChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="sexe">{t('sex')}</label>
        <input
          type="text"
          className="form-control"
          id="sexe"
          value={personnelss.sexe}
          onChange={handleSexeChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="adresse">{t('adress')}</label>
        <input
          type="text"
          className="form-control"
          id="adresse"
          value={personnelss.adresse}
          onChange={handleAdresse}
        />
      </div>

      <div className="form-group">
        <label htmlFor="statut">{t('status')}</label>
        <input
          type="text"
          className="form-control"
          id="statut"
          value={personnelss.statut}
          onChange={handleStatut}
        />
      </div>

      <div className="form-group">
        <label htmlFor="mil">{t('email')}</label>
        <input
          type="text"
          className="form-control"
          id="statut"
          value={personnelss.mail}
          onChange={handleMail}
        />
      </div>
      <p>
        <Button className={`btn btn-primary ${style.menu}`} type="submit">
          <i className="bi bi-save" /> {t('registrer person')}
        </Button>
      </p>
    </Form>
  );
}

export default PersonnelForm;
