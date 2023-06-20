import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './PersonnelForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MatiereForm({ setmatieres }) {
    const [matieres, setmatieress] = useState({
      nom: '',
      debut: '',
      fin: '',
    });

    function handleNomChange(event) {
      const newnom = event.target.value;
      setmatieress({
        ...matieres,
        nom: newnom,
      });
    }

    function handleDebutChange(event) {
      const newdebut = event.target.value;
      setmatieress({
        ...matieres,
        debut: newdebut,
      });
    }
  
    function handleFinChange(event) {
      const newfin = event.target.value;
      setmatieress({
        ...matieres,
        fin: newfin,
      });
    }

    async  function handleForsubmit(event) {
        event.preventDefault();

        if (
            !matieres.nom.trim() ||
            !inscrits.prenom.trim() ||
            !matieres.debut.trim()||
            !matieres.fin.trim()
            
          ) {
            // eslint-disable-next-line no-alert
            return alert('tous les champs doivent être complété!');
          }

    }

    return (
        <Form onSubmit={handleForsubmit}>
          
    
          <div className="form-group">
            <label htmlFor="nom">Nom:</label>
            <input type="text" className="form-control" id="nom" value={matieres.nom} onChange={handleNomChange} />
          </div>
    
          <div className="form-group">
            <label htmlFor="debut">debut:</label>
            <input type="text" className="form-control" id="debut" value={matieres.debut} onChange={handleDebutChange} />
          </div>
    
          <div className="form-group">
            <label htmlFor="fin">fin:</label>
            <input type="text" className="form-control" id="fin" value={matieres.fin} onChange={handleFinChange} />
          </div>
  
          <p>
            <Button className={`btn btn-primary ${style.menu}`} type="submit">
              <i className="bi bi-save" /> ajoute matière
            </Button>
          </p>
        </Form>
      );
}

    export default MatiereForm;