import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';

function NoteForm({ setNotes }) {
    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();
    const [personnels, setPersonnes] = useState([]);

    useEffect(() => {
        const fetchPersonnesDisponibles = async () => {
          try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch('/add/note/notepersonne', {
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
        deliberation: '',
        session: '',
        resultat: '',
        moyenne: '',
        reussi: false,
        personne: ''
        
    };

    const [noteData, setNoteData] = useState(initialState);

    const formattedDeliberation = noteData.deliberation ? format(parseISO(noteData.deliberation), 'dd/MM/yyyy') : '';
    
    const personnelToSubmit = {
        ...noteData,
        deliberation: formattedDeliberation, 
      };

    function handleChange(event) {
        
        const { name, value, type, checked } = event.target;
        setNoteData(prevNoteData => ({
            ...prevNoteData,
            [name]: type === 'checkbox' ? checked : value
        }));


    }

    async function handleSubmit(event) {
        event.preventDefault();
        const accessToken = await getAccessTokenSilently();

        console.log("Données soumises : ", personnelToSubmit);


        const response = await fetch('/add/note', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(personnelToSubmit)
        });

        if (response.ok) {
            setNotes(notes => [...notes, noteData]);
            setNoteData(initialState);
        } else {
            console.error('Erreur lors de la soumission des données de note');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>

<div className="form-group">
        <label htmlFor="personne">{t("person")}:</label>
        <select className="form-control" id="personne" name="personne" value={noteData.personne} onChange={handleChange}>
          <option value="">{t("select a person")}</option>
          {personnels.map((personnel) => (
            <option key={personnel.id} value={personnel.id}>
              {personnel.nom} {personnel.prenom} {personnel.statut}

            </option>
          ))}
        </select>
      </div>
           
            <div className="form-group">
                <label htmlFor="nom">{t("name")}</label>
                <input type="text" className="form-control" id="nom" name="nom" value={noteData.nom} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="deliberation">{t("grades release date")}</label>
                <input type="date" className="form-control" id="deliberation" name="deliberation" value={noteData.deliberation} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="session">session:</label>
                <input type="text" className="form-control" id="session" name="session" value={noteData.session} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="resultat">{t("result")}</label>
                <input type="number" className="form-control" id="resultat" name="resultat" value={noteData.resultat} onChange={handleChange} />
            </div>

            <div className="form-group d-flex align-items-center mb-3" style={{ gap: '10px' }}>  {/* Ajoutez une marge en bas ici */}
    <label htmlFor="reussi" className="mb-0 flex-grow-1">{t("passed")}</label>
    <input 
        type="checkbox" 
        className="form-check-input" 
        id="reussi" 
        name="reussi" 
        checked={noteData.reussi} 
        onChange={handleChange} 
    />
</div>




        <Button type="submit">{t("submit grade")}</Button>
        </Form>
    );
}

export default NoteForm;
