import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function UpdateFormInscription({ inscription, onUpdateinscrit }) {

  const [rembourser, setRembourser] = useState(''); 
  const [section, setSection] = useState(''); 
  const [secondaire_anne, setSecondaire_anne] = useState(''); 
  const [commune, setCommune] = useState(''); 
  const [minerval, setMinerval] = useState(''); 
  const secondairePattern = /^[1-6] secondaire$/;
  const communeRegex = /^[a-zA-Z]+$/;
  let updatedRembourser = rembourser !== '' ? rembourser : inscription.rembourser;
  let updatedSection = section !== '' ? section : inscription.section;
  let updatedSecondaire_anne = secondaire_anne !== '' ? secondaire_anne : inscription.secondaire_anne;
  let updatedCommune = commune !== '' ? commune : inscription.commune;
  let updatedMinerval = minerval !== '' ? minerval : inscription.minerval;

  function handleSubmit(event) {
    event.preventDefault();

    if(updatedRembourser < 0){
        alert("aucune valeur négatif autorisé")
        return;
    }

    if(updatedSection !== ''){
      if(updatedSection.toLocaleLowerCase() != "general" && updatedSection.toLocaleLowerCase() != "technique" && updatedSection.toLocaleLowerCase() != "professionnel" ){
        alert("les sections autorisées: general, technique, professionnel")
        return;
      }
    }

    if(updatedSecondaire_anne !== ''){
      if(!secondairePattern.test(updatedSecondaire_anne)){
        alert("format de saisit:1 secondaire, max:6 secondaire")
        return;
      }
    }
      
    if(updatedCommune !== ''){
      if(!communeRegex.test(updatedCommune)){
        alert("la commune doit contenir uniquement des lettres et aucun espace")
        return;
      }
    }

    if(updatedMinerval !== ''){
        if(updatedMinerval <=0){
            alert("le minerval ne peut pas être null ou négatif")
            return;
        }
    }

    const updatedInscription = {
      ...inscription,
      rembourser: updatedRembourser,
      section: updatedSection,
      secondaire_anne: updatedSecondaire_anne,
      commune: updatedCommune,
      minerval: updatedMinerval,
    };

    onUpdateinscrit(updatedInscription);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="rembourser">Remboursement:</label>
        <input
          type="number"
          className="form-control"
          id="rembourser"
          name="rembourser"
          value={rembourser}
          onChange={(e) => setRembourser(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="section">Section:</label>
        <input
          type="text"
          className="form-control"
          id="section"
          name="section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="secondaire_anne">secondaire:</label>
        <input
          type="text"
          className="form-control"
          id="secondaire_anne"
          name="secondaire_anne"
          value={secondaire_anne}
          onChange={(e) => setSecondaire_anne(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="commune">Commune:</label>
        <input
          type="text"
          className="form-control"
          id="commune"
          name="commune"
          value={commune}
          onChange={(e) => setCommune(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="minerval">Minerval:</label>
        <input
          type="number"
          className="form-control"
          id="minerval"
          name="minerval"
          value={minerval}
          onChange={(e) => setMinerval(e.target.value)}
        />
      </div>

      <Button type="submit" className="btn btn-primary">
        Mettre à jour l'inscription
      </Button>
    </Form>
  );
}

export default UpdateFormInscription;
