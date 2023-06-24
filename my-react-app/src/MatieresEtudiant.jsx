// import React, { useEffect, useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

// function MatieresEtudiant() {
//   const { user, getAccessTokenSilently } = useAuth0();
//   const [matieres, setMatieres] = useState([]);

//   useEffect(() => {
//     const fetchMatieres = async () => {
//       try {
//         const accessToken = await getAccessTokenSilently(); 

//         const response = await fetch('/add/matieres', {
//           headers: {
//             Authorization: `Bearer ${accessToken}`, 
//           },
//         });

//         const data = await response.json();
//         console.log(data);
//         setMatieres(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchMatieres();
//   }, [getAccessTokenSilently]);

//   return (
//     <div>
//       <h1> matières</h1>
//       <ul>
//         {matieres.map((matiere) => (
//           <li key={matiere.id}>
//             <p>Nom : {matiere.nom}</p>
//             <p>Début : {matiere.debut}</p>
//             <p>Fin : {matiere.fin}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default MatieresEtudiant;

import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MatieresEtudiant() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [matieres, setMatieres] = useState([]);

  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        const accessToken = await getAccessTokenSilently(); 

        const response = await fetch('/add/matieres', {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        });

        const data = await response.json();
        console.log(data);
        setMatieres(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMatieres();
  }, [getAccessTokenSilently]);

  return (
    <div>
      <h1>Matières</h1>
      <div className="row">
        {matieres.map((matiere) => (
          <div key={matiere.id} className="col-lg-6 col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{matiere.nom}</h5>
                <p className="card-text">Début : {matiere.debut}</p>
                <p className="card-text">Fin : {matiere.fin}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatieresEtudiant;





