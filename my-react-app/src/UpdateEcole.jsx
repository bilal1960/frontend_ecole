import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateEcole = ({ ecole, onUpdateEcole }) => {
  const [newAdresse, setNewAdresse] = useState(ecole.adresse);
  const [newMail, setNewMail] = useState(ecole.mail);
  const [newNumber, setNewNumber] = useState(ecole.number);
  const [newType, setNewType] = useState(ecole.type);

  

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
    const updatedEcole = {
      ...ecole,
      adresse: newAdresse,
      mail: newMail,
      number: newNumber,
      type: newType,
    };
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
