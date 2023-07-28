import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PermissionGuard from './PermissionGuard';

const UpdateForm = ({ item, onUpdate }) => {
  const [newDebut, setNewDebut] = useState(item.debut);
  const [newFin, setNewFin] = useState(item.fin);
  const [newDebutime, setNewDebutime] = useState(item.debutime);
  const [newFintime, setNewFintime] = useState(item.fintime);
  const [newLocal, setNewLocal] = useState(item.local);
  const [newJour, setNewJour] = useState(item.jour);
  const [newSecondaire, setNewSecondaire] = useState(item.secondaire);




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
    const updatedMatiere = {
      ...item,
      debut: newDebut,
      fin: newFin,
      debutime: newDebutime,
      fintime: newFintime,
      local: newLocal,
      jour: newJour,
      secondaire: newSecondaire,
    };
    onUpdate(updatedMatiere);
  };

  return (

    <form onSubmit={handleSubmit}>
    <PermissionGuard permission={'write:matiere'}>
     <div className="form-group">
        <label htmlFor="newDebut">Nouveau Début:</label>
        <input
          type="text"
          className="form-control"
          id="newDebut"
          value={newDebut}
          onChange={handleDebutChange}
        />

      </div>
      <div className="form-group">
        <label htmlFor="newFin">Nouvelle Fin:</label>
        <input
          type="text"
          className="form-control"
          id="newFin"
          value={newFin}
          onChange={handleFinChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="newDebutime">Nouveau DébutTime:</label>
        <input
          type="time"
          className="form-control"
          id="newDebutime"
          value={newDebutime}
          onChange={handleDebutimeChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="newFintime">Nouvelle FinTime:</label>
        <input
          type="time"
          className="form-control"
          id="newFintime"
          value={newFintime}
          onChange={handleFintimeChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="local">Nouveau local:</label>
        <input
          type="text"
          className="form-control"
          id="local"
          value={newLocal}
          onChange={handlelocalchange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="jour"> changement jour:</label>
        <input
          type="text"
          className="form-control"
          id="jour"
          value={newJour}
          onChange={handlejourChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="secondaire"> changement année:</label>
        <input
          type="text"
          className="form-control"
          id="secondaire"
          value={newSecondaire}
          onChange={handleSecondaireChange}
        />
      </div>
      
      <button type="submit" className="btn btn-primary">Mettre à jour</button>
      </PermissionGuard>

    </form>
  );
};

export default UpdateForm;
