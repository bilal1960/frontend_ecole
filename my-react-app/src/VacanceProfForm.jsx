import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

function VacanceProfForm({ setVacances }) {
  const { getAccessTokenSilently } = useAuth0();
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const { t } = useTranslation();
  const [personnelsss, setPersonnes] = useState([]);

  useEffect(() => {
    const fetchPersonnesDisponibles = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch('/add/vacance/personnet', {
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
    datedebut: '',
    datefin: '',
    type: '',
    commentaire: '',
    personne: '',
    
  };
  const [vacance, setVacance] = useState(initialState);

  function handleChange(event) {
    const { name, value } = event.target;
    setVacance({
      ...vacance,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    

    

    const accessToken = await getAccessTokenSilently();

    const response = await fetch('/add/vacance', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(vacance),
    });

    if (response.ok) {
      setVacances((prevVacances) => [...prevVacances, vacance]);
      setVacance(initialState);

      
      
    } else {
      alert("Une erreur s'est produite lors de l'enregistrement de la vacance.");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>

<div className="form-group">
        <label htmlFor="personne">{t("person")}:</label>
        <select className="form-control" id="personne" name="personne" value={vacance.personne} onChange={handleChange} >
          <option value="">Sélectionner une personne</option>
          {personnelsss.map((personnel) => (
            <option key={personnel.id} value={personnel.id}>
              {personnel.nom} {personnel.prenom} {personnel.statut}
            </option>
          ))}
        </select>
      </div>
      <Form.Group>
        <Form.Label>{t('start_date')}</Form.Label>
        <Form.Control
          type="text"
          name="datedebut"
          value={vacance.datedebut}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>{t('end_date')}</Form.Label>
        <Form.Control
          type="text"
          name="datefin"
          value={vacance.datefin}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>{t('type')}</Form.Label>
        <Form.Control
          type="text"
          name="type"
          value={vacance.type}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>{t('comment')}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="commentaire"
          value={vacance.commentaire}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {t('submit')}
      </Button>
    </Form>
  );
}

export default VacanceProfForm;
