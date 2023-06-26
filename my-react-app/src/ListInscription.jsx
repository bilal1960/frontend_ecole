import React from 'react';

function ListInscription({inscrit}){

        return (
            <ul>
              {inscrit.map((item) => (
                <li key={item.id}>
                  <span>id:          {item.id}      </span>
                  <span>nom:         {item.nom}      </span>
                  <span> prenom:     {item.prenom}   </span>
                  <span>naissance:  {item.naissance} </span>
                  <span>nationalite: {item.nationalite}</span>
                  <span>sexe:        {item.sexe}       </span>
                  <span>commune:     {item.commune}    </span>
                  <span>adresse:     {item.adresse}   </span>
                  <span>minerval:    {item.minerval}  </span>
                </li>
            ))}
      </ul>
   );
    
}

export default ListInscription;