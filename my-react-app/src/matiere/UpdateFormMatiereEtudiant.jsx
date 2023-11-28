import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PermissionGuard from '../permission/PermissionGuard';
import { useTranslation } from 'react-i18next';
import { format,parse } from 'date-fns';

const UpdateForm = ({ item, onUpdate }) => {
    const [newDebut, setNewDebut] = useState('');
    const [newFin, setNewFin] = useState('');
    const [newDebutime, setNewDebutime] = useState('');
    const [newFintime, setNewFintime] = useState('');
    const [newLocal, setNewLocal] = useState('');
    const [newJour, setNewJour] = useState('');
    const [newSecondaire, setNewSecondaire] = useState('');
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
            const parsedDatedebut = parse(newDebut, 'yyyy-MM-dd', new Date());
            if (!isNaN(parsedDatedebut)) {
                updatedMatiere.debut = format(parsedDatedebut, 'dd/MM/yyyy');
        }
    }
    
        if (newFin !== '') {
            const parsedDatefin = parse(newFin, 'yyyy-MM-dd', new Date());
            if (!isNaN(parsedDatefin)) {
                updatedMatiere.fin = format(parsedDatefin, 'dd/MM/yyyy');
            }
        }  
        
        if (newDebutime !== '') {
                
                updatedMatiere.debutime = newDebutime;

            }
        

        if (newFintime !== '') {
            updatedMatiere.fintime = newFintime;
        }

        if (newLocal !== '') {
            
            updatedMatiere.local = newLocal;
        }

         if(newJour !== ''){
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
                        type="date"
                        className="form-control"
                        id="newDebut"
                        value={newDebut}
                        onChange={handleDebutChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newFin">{t("new end")}:</label>
                    <input
                        type="date"
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
