import React, { useState } from 'react';
import PersonnelForm from './PersonnelForm';


function PersonneGestion() {
  const [personnels, setPersonnelss] = useState('' || []);

  return (
    <>
      <h2>ajouter un employé ici svp</h2>
      <PersonnelForm setPersonnelss={setPersonnelss} />
    </>
  );
}

export default PersonneGestion ;