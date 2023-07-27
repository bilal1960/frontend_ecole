import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateForm = ({ item, onUpdatepersonne }) => {
  const [adresse, setAdresse] = useState(item.adresse);

  const handleAdresseChange = (e) => {
    setAdresse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPersonne = {
      ...item,
      adresse: adresse,
    };
    onUpdatepersonne(updatedPersonne);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="adresse">Adresse:</label>
        <input
          type="text"
          className="form-control"
          id="adresse"
          value={adresse}
          onChange={handleAdresseChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Mettre à jour</button>
    </form>
  );
};

export default UpdateForm;