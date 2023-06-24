import React, { useState } from 'react';
import MatiereForm from "./MatiereForm";
import PermissionGuard from './PermissionGuard';

function MatiereGestion(){
    const [matiere, setmatieres] = useState('' || []);
    

    return (
        <>
          <PermissionGuard permission={'write:matiere'}>

          <h2>ajouter une matière  svp</h2>
          <MatiereForm setmatieres={setmatieres} />
          </PermissionGuard>


        </>
      );
}

export default MatiereGestion;