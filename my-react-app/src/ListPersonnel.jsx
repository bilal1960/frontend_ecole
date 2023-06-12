import React from 'react';

function ListPersonnel({personnels}){
    return (
        <ul>
          {personnels.map((item) => (
            <li key={item.id}>
              <span>id:          {item.id}      </span>
              <span>nom:         {item.nom}      </span>
              <span> prenom:     {item.prenom}   </span>
              <span>naissance:  {item.naissance} </span>
              <span>nationalite: {item.nationalite}</span>
              <span>sexe:        {item.sexe}       </span>
              <span>adresse:     {item.adresse}    </span>
            </li>
          ))}
        </ul>
      );
    }
    
    export default ListPersonnel;
