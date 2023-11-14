import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

function AbsenceForm({ setAbsences }) {
    const [personnels, setPersonnes] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();


    useEffect(() => {
        const fetchPersonnesDisponibles = async () => {
          try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch('/add/absence/professeurs/api2', {
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
        personne: '',
        presence: '',
        date: '',
        heuredebut: '',
        heurefin: '',
        certficat: false
    };

    const [absenceData, setAbsenceData] = useState(initialState);

    function handleChange(event) {
        const { name,value, checked } = event.target;

        if (name === "certficat") {
            setAbsenceData({
                ...absenceData,
                [name]: checked
            });
        }else{

            setAbsenceData({
                ...absenceData,
                [name]: value
            });
        }

       
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const accessToken = await getAccessTokenSilently();

        const response = await fetch('/add/absence/prof', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(absenceData)
        });

        if (response.ok) {
            setAbsences(absence => [...absence, absenceData]);
            setAbsenceData(initialState);
        } else {
            console.error('Error while submitting absence data');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>

<div className="form-group">
        <label htmlFor="personne">{t("person")}:</label>
        <select className="form-control" id="personne" name="personne" value={absenceData.personne} onChange={handleChange}>
          <option value="">{t("select a person")}</option>
          {personnels.map((personnel) => (
            <option key={personnel.id} value={personnel.id}>
              {personnel.nom} {personnel.prenom} {personnel.statut}

            </option>
          ))}
        </select>
      </div>
            <div className="form-group">
                <label htmlFor="presence">Presence</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="presence" 
                    name="presence" 
                    value={absenceData.presence} 
                    onChange={handleChange} 
                />
            </div>

            <div className="form-group">
                <label htmlFor="date">{t("Date")}:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="date" 
                    name="date" 
                    value={absenceData.date} 
                    onChange={handleChange} 
                />
            </div>

            <div className="form-group">
                <label htmlFor="heuredebut">{t("Start Time")}:</label>
                <input 
                    type="time" 
                    className="form-control" 
                    id="heuredebut" 
                    name="heuredebut" 
                    value={absenceData.heuredebut} 
                    onChange={handleChange} 
                />
            </div>

            <div className="form-group">
                <label htmlFor="heurefin">{t("End Time")}:</label>
                <input 
                    type="time" 
                    className="form-control" 
                    id="heurefin" 
                    name="heurefin" 
                    value={absenceData.heurefin} 
                    onChange={handleChange} 
                />
            </div>

            <p>
                <Button type="submit">
                    <i className="bi bi-save" /> {t("Save Absence")}
                </Button>
            </p>
        </Form>
    );
}

export default AbsenceForm;
