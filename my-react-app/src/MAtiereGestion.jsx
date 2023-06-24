import React, { useState } from 'react';
import MatiereForm from "./MatiereForm";

function MatiereGestion(){
    const [matiere, setmatieres] = useState('' || []);
    

    return (
        <>
          <h2>ajouter une matière  svp</h2>
          <MatiereForm setmatieres={setmatieres} />
        </>
      );
}

export default MatiereGestion;