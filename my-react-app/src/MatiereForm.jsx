import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

function MatiereForm({ setmatieres }) {
  const [personnelss, setPersonnes] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const currentYear = new Date().getFullYear();
  const localPattern = /^[\s]*[a-zA-Z][a-zA-Z0-9\s]*$/;
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const {t } = useTranslation();
  const matieresList = [
    { value: 'mathématiques', label: t('Mathematics') },
    { value: 'physique', label: t("physics") },
    { value: 'français', label: t("french") },
    { value: 'chimie', label: t("chimistry") },
    { value: 'histoire', label: t("history") },
    { value: 'informatique', label: t('computer') },
    { value: 'biologie', label: t('biology') },
  ];

  const matieresJours = [
    { value: 'Lundi', label: t('monday') },
    { value: 'Mardi', label: t('tuesday') },
    { value: 'Mercredi', label: t('wednesday') },
    { value: 'Jeudi', label: t('thrusday') },
    { value: 'Vendredi', label: t('friday') },
  ];

  const tabsecondaire = [
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
        const response = await fetch('/add/matiere/professeurs/api1', {
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
    local: '',
    jour: '',
    secondaire: '',
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

    const debutYear = new Date(matieres.debut).getFullYear();
    const finYear = new Date(matieres.fin).getFullYear();

    if(matieres.debutime < "09:00"){
      alert("L'heure de début doit être 09:00 ou ultérieure.");
      return; 
    }

    if (!datePattern.test(matieres.debut)) {
      alert("Le format de la date de début doit être dd/MM/yyyy.");
      return;
    }

    if (debutYear !== currentYear && debutYear !== currentYear -1 || finYear !== currentYear && finYear !== currentYear+1 || finYear > debutYear+1) {
      alert("L'année de début doit être l'année en cours ou l'année précédente ou inférieur à la fin d'année. max 1 année écart entre debut et fin");
      return; 
    }

    if (!localPattern.test(matieres.local)) {
      alert("Le local doit commencer par une lettre de l'alphabet ensuite elle peut contenir des lettres ou chiffres positif");
      return; 
    }

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
      const data = await response.text();
      console.error('Erreur lors de l\'ajout de la matière:', data);
    }

    return '';
  }

  return (
    <Form onSubmit={handleForsubmit}>
      <div className="form-group">
        <label htmlFor="personne">{t("person")}:</label>
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
        <label htmlFor="nom">{t("subject")}:</label>
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
        <label htmlFor="jour">{t("day")}:</label>
        <select className="form-control" id="jour" name="jour" value={matieres.jour} onChange={handleChange} >
          <option value="">Sélectionner un jour</option>
          {matieresJours.map((jour) => (
            <option key={jour.value} value={jour.value}>
              {jour.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="secondaire">{t("class")}:</label>
        <select className="form-control" id="secondaire" name="secondaire" value={matieres.secondaire} onChange={handleChange} >
          <option value="">Sélectionner une classe</option>
          {tabsecondaire.map((classe) => (
            <option key={classe.value} value={classe.value}>
              {classe.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="local">{t("room")}:</label>
        <input type="text" className="form-control" id="local" name="local" value={matieres.local} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="debut">Début:</label>
        <input type="text" className="form-control" id="debut" name="debut" value={matieres.debut} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="fin">Fin:</label>
        <input type="text" className="form-control" id="fin" name="fin" value={matieres.fin} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="debutime">{t("start time")}:</label>
        <input type="time" className="form-control" id="debutime" name="debutime" value={matieres.debutime} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="fintime">{t("end time")}:</label>
        <input type="time" className="form-control" id="fintime" name="fintime" value={matieres.fintime} onChange={handleChange} required />
      </div>

      <Button variant="primary" type="submit">
        {t("registrer")}
      </Button>
    </Form>
  );
}

export default MatiereForm;
