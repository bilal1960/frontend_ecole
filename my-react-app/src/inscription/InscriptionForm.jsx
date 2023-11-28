import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from '../personne/PersonnelForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';



function InscriptionForm({ setinscrits }) {
  const [personnels, setPersonnes] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const communeRegex = /^[a-zA-Z]+$/;
  const { t } = useTranslation();

  const sectionList = [
    { value: 'General', label: 'General' },
    { value: 'Technique', label: t('Technical') },
    { value: 'Professionnel', label: t('Professional') },
  ];

  const secondaire = [
    { value: '1 secondaire', label: t("1 secondary") },
    { value: '2 secondaire', label: t("2 secondary") },
    { value: '3 secondaire', label: t("3 secondary") },
    { value: '4 secondaire', label: t("4 secondary") },
    { value: '5 secondaire', label: t("5 secondary") },
    { value: '6 secondaire', label: t("6 secondary") },
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
  }, []);

  const initialState = {
    commune: '',
    minerval: '',
    date_inscrit: '',
    rembourser: 0.0,
    section: '',
    secondaire_anne: '',
    personne: '',
    
  };

  const [inscrits, setinscritss] = useState(initialState);

  const formattedinscrit = inscrits.date_inscrit ? format(parseISO(inscrits.date_inscrit), 'dd/MM/yyyy') : '';

  const inscritToSubmit = {
    ...inscrits,
    date_inscrit: formattedinscrit, 
  };

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
    if (personneAssociee.statut === "professeur") {
        
    }

    if (inscrits.minerval <= 0) {
      toastr.error("Le prix du minerval doit être positif et supérieur à 0");
      return;
    }

    if (!communeRegex.test(inscrits.commune)) {
      toastr.error("Entrer une commune valide uniquement des lettres et aucun espace");
      return;
    }

    try {
        const response = await fetch('/add/inscriptions', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(inscritToSubmit),
        });

        if (!response.ok) {
            const errorData = await response.json();
            toastr.error(errorData.erreur || "Une erreur s'est produite lors de la soumission");
            return;
        }

        
        const inscritData = await response.json();
        setinscrits((inscrit) => [...inscrit, inscritData]);
        setinscritss(initialState);
        toastr.success("Inscription réussie!");
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire', error);
        toastr.error("Erreur lors de la communication avec le serveur");
    }
}


  return (
    <Form onSubmit={handleForsubmit}>
      <div className="form-group">
        <label htmlFor="personne">{t("person")}:</label>
        <select className="form-control" id="personne" name="personne" value={inscrits.personne} onChange={handleChange}>
          <option value="">{t("select a person")}</option>
          {personnels.map((personnel) => (
            <option key={personnel.id} value={personnel.id}>
              {personnel.nom} {personnel.prenom} {personnel.statut}

            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date_inscrit">{t("date of registration")}</label>
        <input type="date" className="form-control" id="date_inscrit" name="date_inscrit" value={inscrits.date_inscrit} onChange={handleChange} />
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
          <option value="">{t("select a section")}</option>
          {sectionList.map((inscrit) => (
            <option key={inscrit.value} value={inscrit.value}>
              {inscrit.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="secondaire_anne">{t("secondary")}:</label>
        <select
          className="form-control"
          id="secondaire_anne"
          name="secondaire_anne"
          value={inscrits.secondaire_anne}
          onChange={handleChange}
        >

          <option value="">{t("select a section")}</option>
          {secondaire.map((inscrit) => (
            <option key={inscrit.value} value={inscrit.value}>
              {inscrit.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="commune">{t("town")}:</label>
        <input type="text" className="form-control" id="commune" name="commune" value={inscrits.commune} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="minerval">{t("registration fees")}:</label>
        <input type="text" className="form-control" id="minerval" name="minerval" value={inscrits.minerval} onChange={handleChange} />
      </div>

      <p>
        <Button className={`btn btn-primary ${style.menu}`} type="submit">
          <i className="bi bi-save" /> {t("registrer a student")}
        </Button>
      </p>
    </Form>
  );
}

export default InscriptionForm;
