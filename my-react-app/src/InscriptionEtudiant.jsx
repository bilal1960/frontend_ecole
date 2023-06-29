


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // // import { useAuth0 } from '@auth0/auth0-react';

// // // // // function InscriptionEtudiant() {
// // // // //   const [data, setData] = useState([]);
// // // // //   const { getAccessTokenSilently } = useAuth0();

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         const accessToken = await getAccessTokenSilently();

// // // // //         const response = await fetch('/add/inscriptions', {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${accessToken}`,
// // // // //             'Content-Type': 'application/json',
// // // // //           },
// // // // //         });

// // // // //         if (!response.ok) {
// // // // //           throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
// // // // //         }

// // // // //         const responseData = await response.json();
// // // // //         setData(responseData);
// // // // //       } catch (error) {
// // // // //         console.error(error);
// // // // //       }
// // // // //     };

// // // // //     fetchData();
// // // // //   }, [getAccessTokenSilently]);

// // // // //   return (
// // // // //     <>
// // // // //       <h2>Liste des inscriptions</h2>
// // // // //       <ul className='list-group'>
// // // // //         {data.map((item) => (
// // // // //           <li key={item.id} className="list-group-item">
// // // // //           <strong>Nom:</strong> {item.nom}<br />
// // // // //           <strong>Prénom:</strong> {item.prenom}<br />
// // // // //           <strong>Date de naissance:</strong> {item.naissance}<br />
// // // // //           <strong>Nationalité:</strong> {item.nationalite}<br />
// // // // //           <strong>Sexe:</strong> {item.sexe}<br />
// // // // //           <strong>Commune:</strong> {item.commune}<br />
// // // // //           <strong>Adresse:</strong> {item.adresse}<br />
// // // // //           <strong>Minerval:</strong> {item.minerval}
// // // // //           </li>
// // // // //         ))}
// // // // //       </ul>
// // // // //     </>
// // // // //   );
// // // // // }

// // // // // export default InscriptionEtudiant;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // // import { useAuth0 } from '@auth0/auth0-react';

// // // // // function InscriptionEtudiant() {
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const [totalPages, setTotalPages] = useState(1);
// // // // //   const itemsPerPage = 10; // Nombre d'éléments par page
// // // // //   const [data, setData] = useState([]);
// // // // //   const { getAccessTokenSilently } = useAuth0();

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         const accessToken = await getAccessTokenSilently();

// // // // //         const response = await fetch(`/add/inscriptions/page?page=${currentPage}&pageSize=${itemsPerPage}`, {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${accessToken}`,
// // // // //             'Content-Type': 'application/json',
// // // // //           },
// // // // //         });

// // // // //         if (!response.ok) {
// // // // //           throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
// // // // //         }

// // // // //         const responseData = await response.json();
// // // // //         setData(responseData.inscriptions);
// // // // //         setTotalPages(responseData.totalPages);
// // // // //       } catch (error) {
// // // // //         console.error(error);
// // // // //       }
// // // // //     };

// // // // //     fetchData();
// // // // //   }, [getAccessTokenSilently, currentPage, itemsPerPage]);

// // // // //   const handlePageChange = (pageNumber) => {
// // // // //     setCurrentPage(pageNumber);
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       <h2>Liste des inscriptions</h2>
// // // // //       <ul className='list-group'>
// // // // //         {data.map((item) => (
// // // // //           <li key={item.id} className="list-group-item">
// // // // //             {/* Afficher les informations de l'inscription */}
// // // // //           </li>
// // // // //         ))}
// // // // //       </ul>

// // // // //       {/* Afficher la pagination */}
// // // // //       <nav>
// // // // //         <ul className="pagination">
// // // // //           {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
// // // // //             <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
// // // // //               <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
// // // // //                 {pageNumber}
// // // // //               </button>
// // // // //             </li>
// // // // //           ))}
// // // // //         </ul>
// // // // //       </nav>
// // // // //     </>
// // // // //   );
// // // // // }

// // // // // export default InscriptionEtudiant;

// // // // import React, { useState, useEffect } from 'react';
// // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // import { useAuth0 } from '@auth0/auth0-react';

// // // // function InscriptionEtudiant() {
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [totalPages, setTotalPages] = useState(1);
// // // //   const itemsPerPage = 10; // Nombre d'éléments par page
// // // //   const [data, setData] = useState([]);
// // // //   const { getAccessTokenSilently } = useAuth0();

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const accessToken = await getAccessTokenSilently();

// // // //         const response = await fetch(`/add/inscriptions/page?page=${currentPage}&pageSize=${itemsPerPage}`, {
// // // //           headers: {
// // // //             Authorization: `Bearer ${accessToken}`,
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //         });

// // // //         if (!response.ok) {
// // // //           throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
// // // //         }

// // // //         const responseData = await response.json();
// // // //         setData(responseData.inscrit); // Modifier la clé pour correspondre à la structure de la réponse de votre API
// // // //         setTotalPages(responseData.totalPages);
// // // //       } catch (error) {
// // // //         console.error(error);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [getAccessTokenSilently, currentPage, itemsPerPage]);

// // // //   const handlePageChange = (pageNumber) => {
// // // //     setCurrentPage(pageNumber);
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <h2>Liste des inscriptions</h2>
// // // //       <ul className='list-group'>
// // // //         {data.map((item) => (
// // // //           <li key={item.id} className="list-group-item">
// // // //             {/* Afficher les informations de l'inscription */}
// // // //           </li>
// // // //         ))}
// // // //       </ul>

// // // //       {/* Afficher la pagination */}
// // // //       <nav>
// // // //         <ul className="pagination">
// // // //           {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
// // // //             <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
// // // //               <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
// // // //                 {pageNumber}
// // // //               </button>
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       </nav>
// // // //     </>
// // // //   );
// // // // }

// // // // export default InscriptionEtudiant;


// // //  import React, { useState, useEffect } from 'react';
// // //  import 'bootstrap/dist/css/bootstrap.min.css';
// // //  import { useAuth0 } from '@auth0/auth0-react';

// // //  function InscriptionEtudiant() {
// // //    const [currentPage, setCurrentPage] = useState(1);
// // //    const [totalPages, setTotalPages] = useState(1);
// // //    const itemsPerPage = 1; // Afficher un élément par page
// // //    const [data, setData] = useState([]);
// // //    const { getAccessTokenSilently } = useAuth0();

// // //    useEffect(() => {
// // //      const fetchData = async () => {
// // //       try {
// // //         const accessToken = await getAccessTokenSilently();

// // //          const response = await fetch(`/add/inscriptions/pagi?page=${currentPage}&size=${itemsPerPage}`, {
// // //            headers: {
// // //              Authorization: `Bearer ${accessToken}`,
// // //              'Content-Type': 'application/json', // Ajout du header Content-Type
// // //            },
// // //          });

// // //          if (!response.ok) {
// // //            throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
// // //          }

// // //          const responseData = await response.json();
// // //          setData(responseData.inscriptions ? responseData.inscriptions : []);
// // //          setTotalPages(responseData.totalPages);
// // //        } catch (error) {
// // //          console.error(error);
// // //        }
// // //      };

// // //      fetchData();
// // //    }, [currentPage, getAccessTokenSilently]);

// // //    const handlePageChange = (pageNumber) => {
// // //     setCurrentPage(pageNumber);
// // //    };

// // //    return (
// // //      <div className="row">
// // //       {data.map((item) => (
// // //         <div key={item.id} className="col-lg-6 col-md-6 mb-4">
// // //           <div className="card">
// // //             <div className="card-body">
// // //               <h5 className="card-title">{item.nom}</h5>
// // //               <p className="card-text">Prénom: {item.prenom}</p>
// // //                <p className="card-text">Date de naissance: {item.naissance}</p>
// // //               <p className="card-text">Nationalité: {item.nationalite}</p>
// // //               <p className="card-text">Sexe: {item.sexe}</p>
// // //               <p className="card-text">Commune: {item.commune}</p>
// // //               <p className="card-text">Adresse: {item.adresse}</p>
// // //                <p className="card-text">Minerval: {item.minerval}</p>
// // //              </div>
// // //            </div>
// // //          </div>
// // //        ))}

// // //        <nav>
// // //          <ul className="pagination">
// // //           <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
// // //              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
// // //               Précédent
// // //              </button>
// // //           </li>

// // //           {Array.from({ length: totalPages }, (_, index) => (
// // //              <li
// // //                key={index}
// // //               className={`page-item ${currentPage === index ? 'active' : ''}`}
// // //             >
// // //               <button
// // //                 className="page-link"
// // //                 onClick={() => handlePageChange(index)}
// // //               >
// // //                 {index + 1}
// // //               </button>
// // //             </li>
// // //           ))}
// // //           <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
// // //             <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
// // //               Suivant
// // //             </button>
// // //           </li>
// // //         </ul>
// // //      </nav>
// // //     </div>
// // //    );
// // //  }

// // //  export default InscriptionEtudiant;


// // import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { useAuth0 } from '@auth0/auth0-react';

// // function InscriptionEtudiant() {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const itemsPerPage = 1; // Afficher un élément par page
// //   const [data, setData] = useState([]);
// //   const { getAccessTokenSilently } = useAuth0();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const accessToken = await getAccessTokenSilently();

// //         const response = await fetch(`/add/inscriptions?page=${currentPage}&size=${itemsPerPage}`, {
// //           headers: {
// //             Authorization: `Bearer ${accessToken}`,
// //             'Content-Type': 'application/json', // Ajout du header Content-Type
// //           },
// //         });

// //         if (!response.ok) {
// //           throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
// //         }

// //         const responseData = await response.json();
// //         setData(responseData.inscriptions ? responseData.inscriptions : []);
// //         setTotalPages(responseData.totalPages);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     fetchData();
// //   }, [currentPage, getAccessTokenSilently]);

// //   const handlePageChange = (pageNumber) => {
// //     setCurrentPage(pageNumber);
// //   };

// //   return (
// //     <div className="row">
// //       {data.map((item) => (
// //         <div key={item.id} className="col-lg-6 col-md-6 mb-4">
// //           <div className="card">
// //             <div className="card-body">
// //               <h5 className="card-title">{item.nom}</h5>
// //               <p className="card-text">Prénom: {item.prenom}</p>
// //               <p className="card-text">Date de naissance: {item.naissance}</p>
// //               <p className="card-text">Nationalité: {item.nationalite}</p>
// //               <p className="card-text">Sexe: {item.sexe}</p>
// //               <p className="card-text">Commune: {item.commune}</p>
// //               <p className="card-text">Adresse: {item.adresse}</p>
// //               <p className="card-text">Minerval: {item.minerval}</p>
// //             </div>
// //           </div>
// //         </div>
// //       ))}

// //       <nav>
// //         <ul className="pagination">
// //           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
// //             <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
// //               Précédent
// //             </button>
// //           </li>

// //           {Array.from({ length: totalPages }, (_, index) => (
// //             <li
// //               key={index}
// //               className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
// //             >
// //               <button
// //                 className="page-link"
// //                 onClick={() => handlePageChange(index + 1)}
// //               >
// //                 {index + 1}
// //               </button>
// //             </li>
// //           ))}
// //           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
// //             <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
// //               Suivant
// //             </button>
// //           </li>
// //         </ul>
// //       </nav>
// //     </div>
// //   );
// // }

// // export default InscriptionEtudiant;


// // ...

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useAuth0 } from '@auth0/auth0-react';

// function InscriptionEtudiant() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 1;
//   const [data, setData] = useState([]);
//   const { getAccessTokenSilently } = useAuth0();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const accessToken = await getAccessTokenSilently();

//         const response = await fetch(`/inscriptions/api?page=${currentPage - 1}&size=${itemsPerPage}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
//         }

//         const responseData = await response.json();
//         setData(responseData.content ? responseData.content : []);
//         setTotalPages(responseData.totalPages);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [currentPage, getAccessTokenSilently]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="row">
//       {data.map((item) => (
//         // Render your Inscription items here
//         <div key={item.id} className="col-lg-6 col-md-6 mb-4">
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title">{item.nom}</h5>
//               <p className="card-text">Prénom: {item.prenom}</p>
//               <p className="card-text">Date de naissance: {item.naissance}</p>
//               <p className="card-text">Nationalité: {item.nationalite}</p>
//               <p className="card-text">Sexe: {item.sexe}</p>
//               <p className="card-text">Commune: {item.commune}</p>
//               <p className="card-text">Adresse: {item.adresse}</p>
//               <p className="card-text">Minerval: {item.minerval}</p>
//             </div>
//           </div>
//         </div>
//       ))}

//       <nav>
//         <ul className="pagination">
//           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
//               Précédent
//             </button>
//           </li>

//           {Array.from({ length: totalPages }, (_, index) => (
//             <li
//               key={index}
//               className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//             <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
//               Suivant
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default InscriptionEtudiant;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';

function InscriptionEtudiant() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 1;
  const [data, setData] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`/add/inscriptions/api?page=${currentPage}&size=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
        }

        const responseData = await response.json();
        setData(responseData.content ? responseData.content : []);
        setTotalPages(responseData.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, getAccessTokenSilently]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

  return (
    <div className="row">
      {data.map((item) => (
        <div key={item.id} className="col-lg-6 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{item.nom}</h5>
              <p className="card-text">Prénom: {item.prenom}</p>
              <p className="card-text">Date de naissance: {item.naissance}</p>
              <p className="card-text">Nationalité: {item.nationalite}</p>
              <p className="card-text">Sexe: {item.sexe}</p>
              <p className="card-text">Commune: {item.commune}</p>
              <p className="card-text">Adresse: {item.adresse}</p>
              <p className="card-text">Minerval: {item.minerval}</p>
            </div>
          </div>
        </div>
      ))}

      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage)}>
              Précédent
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 2)}>
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default InscriptionEtudiant;















