import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateEcole = ({ ecole, onUpdateEcole }) => {
  const [newAdresse, setNewAdresse] = useState('');
  const [newMail, setNewMail] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newType, setNewType] = useState('');
  const regex = /(\+32\s?)?\d{1,}(\s?\d{2}){1,}/;
  const regenmail = /.*@.*\..*/;
  const regenxpadresse = /^\s*[A-Za-z][A-Za-z\d\s./]*$/;

  const handleAdresseChange = (e) => {
    setNewAdresse(e.target.value);
  };

  const handleMailChange = (e) => {
    setNewMail(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleTypeChange = (e) => {
    setNewType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedEcole = { ...ecole };

    if (newAdresse !== ''){
      if (!regenxpadresse.test(newAdresse)) {
        alert("Entrez une adresse valide pas de chiffre en début ni caractère spéciaux");
        return;
      } else {
        updatedEcole.adresse = newAdresse;
      }
    }
    if (newMail !== ''){
      if (!regenmail.test(newMail)) {
        alert("L'email doit contenir @ pour être validé");
        return;
      } else {
        updatedEcole.mail = newMail;
      }
    }
    if (newNumber !== ''){
      if (!regex.test(newNumber)) {
        alert("Veuillez saisir un numéro valide: 0480 ect ou +32 04890 ect");
        return;
      } else {
        updatedEcole.number = newNumber;
      }
    }
    if (newType !== ''){
      if(newType != "secondaire" && newType != "secondaire/supérieur" && newType != "secondaire /supérieur"){
        alert("Il faut saisir des données validées : secondaire ou secondaire/supérieur ou secondaire /supérieur");
        return;
      } else {
        updatedEcole.type = newType;
      }
    }

    onUpdateEcole(updatedEcole);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="newAdresse">Nouvelle Adresse:</label>
        <input
          type="text"
          className="form-control"
          id="newAdresse"
          value={newAdresse}
          onChange={handleAdresseChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="newMail">Nouveau Mail:</label>
        <input
          type="text"
          className="form-control"
          id="newMail"
          value={newMail}
          onChange={handleMailChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="newNumber">Nouveau Number:</label>
        <input
          type="text"
          className="form-control"
          id="newNumber"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="newType">Nouveau Type:</label>
        <input
          type="text"
          className="form-control"
          id="newType"
          value={newType}
          onChange={handleTypeChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Mettre à jour</button>
    </form>
  );
};

export default UpdateEcole;
