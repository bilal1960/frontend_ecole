import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PermissionGuard from '../permission/PermissionGuard';
import { useTranslation } from 'react-i18next';

const UpdateForm = ({ item, onUpdate }) => {
    const [newDebut, setNewDebut] = useState('');
    const [newFin, setNewFin] = useState('');
    const [newDebutime, setNewDebutime] = useState('');
    const [newFintime, setNewFintime] = useState('');
    const [newLocal, setNewLocal] = useState('');
    const [newJour, setNewJour] = useState('');
    const [newSecondaire, setNewSecondaire] = useState('');
    const currentYear = new Date().getFullYear();
    const localPattern = /^[\s]*[a-zA-Z][a-zA-Z0-9\s]*$/;
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const joursAutorises = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
    const secondairePattern = /^[1-6] secondaire$/;
    const {t } = useTranslation();

    const handleDebutChange = (e) => {
        setNewDebut(e.target.value);
    };

    const handleFinChange = (e) => {
        setNewFin(e.target.value);
    };

    const handleDebutimeChange = (e) => {
        setNewDebutime(e.target.value);

    };

    const handleFintimeChange = (e) => {
        setNewFintime(e.target.value);
      
    };

    const handlelocalchange = (e) => {
        setNewLocal(e.target.value);
    };

    const handlejourChange = (e) => {
        setNewJour(e.target.value);
    }

    const handleSecondaireChange = (e) => {
        setNewSecondaire(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMatiere = { ...item };

        if (newDebut !== '') {
            if (!datePattern.test(newDebut)) {
                alert("Le format de la date de début doit être dd/MM/yyyy.");
                return;
            }
            updatedMatiere.debut = newDebut;
        }

        if (newFin !== '') {
            if (!datePattern.test(newFin)) {
                alert("Le format de la date de fin doit être dd/MM/yyyy.");
                return;
            }
            updatedMatiere.fin = newFin;
        }

        const debutYear = new Date(newDebut).getFullYear();
        const finYear = new Date(newFin).getFullYear();
        if(newDebut !== ''  && newFin !== ''){
            
            if(finYear > debutYear+1){
                alert("La date de fin scolaire ne peut pas dépasser 1 ans de différence avec datedebut.");
                return; 
            }
    
            if (debutYear !== currentYear && debutYear !== currentYear -1 || finYear !== currentYear && finYear !== currentYear+1) {
                alert("L'année de début doit être l'année en cours ou l'année précédente ou vérifier que la fin d'année est 2023 ou 2024.");
                return; 
            }
        }
        
        if (newDebutime !== '') {
            if(newDebutime < "09:00"){
                alert("L'heure de début doit être 09:00 ");
                return;
            }
            updatedMatiere.debutime = newDebutime;
        }

        if (newFintime !== '') {
            updatedMatiere.fintime = newFintime;
        }

        if (newLocal !== '') {
            if (!localPattern.test(newLocal)) {
                alert("Le local doit commencer par une lettre de l'alphabet ensuite elle peut contenir des lettres ou chiffres positif");
                return; 
            }
            updatedMatiere.local = newLocal;
        }

        if (newJour !== '') {
            const jourEnMinuscules = newJour.trim().toLowerCase();
            if (!joursAutorises.includes(jourEnMinuscules)) {
                alert("Le jour de la semaine doit être du lundi au vendredi.");
                return;
            }
            updatedMatiere.jour = newJour;
        }

        if (newSecondaire !== '') {
            if (!secondairePattern.test(newSecondaire)) {
                alert("La valeur doit être entre '1 secondaire' et '6 secondaire'.");
                return; 
            }
            updatedMatiere.secondaire = newSecondaire;
        }

        onUpdate(updatedMatiere);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PermissionGuard permission={'write:matiere'}>
                <div className="form-group">
                    <label htmlFor="newDebut">{t("new begin")}:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="newDebut"
                        value={newDebut}
                        onChange={handleDebutChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newFin">{t("new end")}:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="newFin"
                        value={newFin}
                        onChange={handleFinChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newDebutime">{t("new start time")}:</label>
                    <input
                        type="time"
                        className="form-control"
                        id="newDebutime"
                        value={newDebutime}
                        onChange={handleDebutimeChange}
                        
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newFintime">{t("new end time")}:</label>
                    <input
                        type="time"
                        className="form-control"
                        id="newFintime"
                        value={newFintime}
                        onChange={handleFintimeChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="local">{t("new room")}:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="local"
                        value={newLocal}
                        onChange={handlelocalchange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="jour"> {t("day")}:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="jour"
                        value={newJour}
                        onChange={handlejourChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="secondaire"> {t("year change")}:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="secondaire"
                        value={newSecondaire}
                        onChange={handleSecondaireChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">{t("update")}</button>
           
                </PermissionGuard>
        </form>
    );
};

export default UpdateForm;
