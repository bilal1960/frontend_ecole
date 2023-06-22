import React, { useState } from 'react';
import PersonnelForm from './PersonnelForm';


function PersonneGestion() {
  const [personnels, setPersonnelss] = useState('' || []);

  return (
    <>
      <h2>ajouter une personne svp</h2>
      <PersonnelForm setPersonnelss={setPersonnelss} />
    </>
  );
}

export default PersonneGestion ;