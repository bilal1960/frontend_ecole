import React from 'react';

function ListMatiere({matiere}){

    return (
        <ul>
          {inscrit.map((item) => (
            <li key={item.id}>
              <span>id:        {item.id}      </span>
              <span>nom:      {item.nom}      </span>
              <span> debut:  {item.debut}    </span>
              <span>fin:     {item.fin}      </span>
            </li>
        ))}
  </ul>
);
}

export default ListMatiere;