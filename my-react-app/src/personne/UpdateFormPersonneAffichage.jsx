import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

const UpdateForm = ({ item, onUpdatepersonne }) => {
    const [adresse, setAdresse] = useState('');
    const adressevalided = /^\s*[A-Za-z][A-Za-z\d\s./]*$/;
    const { t } = useTranslation();

    const handleAdresseChange = (e) => {
        setAdresse(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!adressevalided.test(adresse)) {
            alert("saississez une adresse à un format normal")
            return;
        }
        const updatedPersonne = {
            ...item,
            adresse: adresse,
        };
        onUpdatepersonne(updatedPersonne);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="adresse">{t('adress')}:</label>
                <input
                    type="text"
                    className="form-control"
                    id="adresse"
                    value={adresse}
                    onChange={handleAdresseChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">{t('update')}</button>
        </form>
    );
};

export default UpdateForm;
