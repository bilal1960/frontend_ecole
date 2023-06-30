// // // import React, { useState, useEffect } from 'react';
// // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // import { useAuth0 } from '@auth0/auth0-react';

// // // function PersonneAffichage() {
// // //   const [data, setData] = useState([]);
// // //   const { getAccessTokenSilently } = useAuth0();

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const accessToken = await getAccessTokenSilently();

// // //         const response = await fetch("/add/perso", {
// // //           headers: {
// // //             Authorization: `Bearer ${accessToken}`,
// // //             'Content-Type': 'application/json',
// // //           },
// // //         });

// // //         if (!response.ok) {
// // //           throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
// // //         }

// // //         const responseData = await response.json();
// // //         setData(responseData);
// // //       } catch (error) {
// // //         console.error(error);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [getAccessTokenSilently]);

// // //   return (
// // //     <div className="row">
// // //       {data.map((item) => (
// // //         <div key={item.id} className="col-lg-6 col-md-6 mb-4">
// // //           <div className="card">
// // //             <div className="card-body">
// // //               <h5 className="card-title">id: {item.id}</h5>
// // //               <p className="card-text">nom: {item.nom}</p>
// // //               <p className="card-text">prenom: {item.prenom}</p>
// // //               <p className="card-text">naissance: {item.naissance}</p>
// // //               <p className="card-text">nationalite: {item.nationalite}</p>
// // //               <p className="card-text">sexe: {item.sexe}</p>
// // //               <p className="card-text">adresse: {item.adresse}</p>
// // //               <p className="card-text">statut: {item.statut}</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // export default PersonneAffichage;

// // import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { useAuth0 } from '@auth0/auth0-react';

// // function PersonneAffichage() {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const itemsPerPage = 1; 
// //   const [data, setData] = useState([]);
// //   const { getAccessTokenSilently } = useAuth0();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const accessToken = await getAccessTokenSilently();

// //         const response = await fetch(`add/perso/api1?page=${currentPage}&size=${itemsPerPage}`, {
// //           headers: {
// //             Authorization: `Bearer ${accessToken}`,
// //             'Content-Type': 'application/json',
// //           },
// //         });

// //         if (!response.ok) {
// //           throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
// //         }

// //         const responseData = await response.json();
// //         setData(responseData);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     fetchData();
// //   }, [getAccessTokenSilently, currentPage]);

// //   const handlePageChange = (pageNumber) => {
// //     setCurrentPage(pageNumber);
// //   };

 

// //   if (data.length > 0) {
// //     return (
// //       <div className="row">
// //         {data.map((item) => (
// //           <div key={item.id} className="col-lg-6 col-md-6 mb-4">
// //             <div className="card">
// //               <div className="card-body">
// //                 <p className="card-text">nom: {item.nom}</p>
// //                 <p className="card-text">prenom: {item.prenom}</p>
// //                 <p className="card-text">naissance: {item.naissance}</p>
// //                 <p className="card-text">nationalite: {item.nationalite}</p>
// //                 <p className="card-text">sexe: {item.sexe}</p>
// //                 <p className="card-text">adresse: {item.adresse}</p>
// //                 <p className="card-text">statut: {item.statut}</p>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   }
// //   <nav>
// //   <ul className="pagination">
// //     <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
// //       <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
// //         Précédent
// //       </button>
// //     </li>

// //     {Array.from({ length: totalPages }, (_, index) => (
// //       <li
// //         key={index}
// //         className={`page-item ${currentPage === index ? 'active' : ''}`}
// //       >
// //         <button
// //           className="page-link"
// //           onClick={() => handlePageChange(index)}
// //         >
// //           {index + 1}
// //         </button>
// //       </li>
// //     ))}
// //     <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
// //       <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
// //         Suivant
// //       </button>
// //     </li>
// //   </ul>
// // </nav>
// // </div>
// // );
// // }
  


// // export default PersonneAffichage;

// // import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { useAuth0 } from '@auth0/auth0-react';

// // function PersonneAffichage() {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const itemsPerPage = 1;
// //   const [data, setData] = useState([]);
// //   const { getAccessTokenSilently } = useAuth0();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const accessToken = await getAccessTokenSilently();

// //         const response = await fetch(`add/perso/api1?page=${currentPage}&size=${itemsPerPage}`, {
// //           headers: {
// //             Authorization: `Bearer ${accessToken}`,
// //             'Content-Type': 'application/json',
// //           },
// //         });

// //         if (!response.ok) {
// //           throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
// //         }

// //         const responseData = await response.json();
// //         setData(responseData.personnelss ? responseData.personnelss : []);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     fetchData();
// //   }, [getAccessTokenSilently, currentPage]);

// //   const handlePageChange = (pageNumber) => {
// //     setCurrentPage(pageNumber);
// //   };

// //   if (data.length > 0) {
// //     return (
// //       <div>
// //         <div className="row">
// //           {data.map((item) => (
// //             <div key={item.id} className="col-lg-6 col-md-6 mb-4">
// //               <div className="card">
// //                 <div className="card-body">
// //                   <p className="card-text">nom: {item.nom}</p>
// //                   <p className="card-text">prenom: {item.prenom}</p>
// //                   <p className="card-text">naissance: {item.naissance}</p>
// //                   <p className="card-text">nationalite: {item.nationalite}</p>
// //                   <p className="card-text">sexe: {item.sexe}</p>
// //                   <p className="card-text">adresse: {item.adresse}</p>
// //                   <p className="card-text">statut: {item.statut}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //         <nav>
// //           <ul className="pagination">
// //             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
// //               <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
// //                 Précédent
// //               </button>
// //             </li>

// //             {Array.from({ length: totalPages }, (_, index) => (
// //               <li
// //                 key={index}
// //                 className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
// //               >
// //                 <button
// //                   className="page-link"
// //                   onClick={() => handlePageChange(index + 1)}
// //                 >
// //                   {index + 1}
// //                 </button>
// //               </li>
// //             ))}
// //             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
// //               <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
// //                 Suivant
// //               </button>
// //             </li>
// //           </ul>
// //         </nav>
// //       </div>
// //     );
// //   }

// //   return null;
// // }

// // export default PersonneAffichage;

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useAuth0 } from '@auth0/auth0-react';

// function PersonneAffichage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 1;
//   const [data, setData] = useState([]);
//   const { getAccessTokenSilently } = useAuth0();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const accessToken = await getAccessTokenSilently();

//         const response = await fetch(`add/perso/api1?page=${currentPage}&size=${itemsPerPage}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
//         }

//         const responseData = await response.json();
//         setData(responseData.personnelss ? responseData.personnelss : []);
//         setTotalPages(responseData.totalPages );
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [currentPage,getAccessTokenSilently ]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   if (data.length > 0) {
//     return (
//       <div>
//         <div className="row">
//           {data.map((item) => (
//             <div key={item.id} className="col-lg-6 col-md-6 mb-4">
//               <div className="card">
//                 <div className="card-body">
//                   <p className="card-text">nom: {item.nom}</p>
//                   <p className="card-text">prenom: {item.prenom}</p>
//                   <p className="card-text">naissance: {item.naissance}</p>
//                   <p className="card-text">nationalite: {item.nationalite}</p>
//                   <p className="card-text">sexe: {item.sexe}</p>
//                   <p className="card-text">adresse: {item.adresse}</p>
//                   <p className="card-text">statut: {item.statut}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <nav>
//           <ul className="pagination">
//             <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
//                 Précédent
//               </button>
//             </li>

//             {Array.from({ length: totalPages }, (_, index) => (
//               <li
//                 key={index}
//                 className={`page-item ${currentPage === index ? 'active' : ''}`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => handlePageChange(index)}
//                 >
//                   {index + 1}
//                 </button>
//               </li>
//             ))}
//             <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
//                 Suivant
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     );
//   }

//   return null;
// }

// export default PersonneAffichage;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 import { useAuth0 } from '@auth0/auth0-react';

 function PersonneAffichage()
{const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 1; 
  const [data, setData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`add/perso/api1?page=${currentPage}&size=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json', // Ajout du header Content-Type
          },
        });

        if (!response.ok) {
          throw new Error('Une erreur s\'est produite lors de la tentative de récupération des données.');
        }

        const responseData = await response.json();
        

        setData(responseData.content);
        setTotalPages(responseData.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, getAccessTokenSilently]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="row">
      {data.map((item) => (
        <div key={item.id} className="col-lg-6 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
            <p className="card-text">nom: {item.nom}</p>
                  <p className="card-text">prenom: {item.prenom}</p>
                  <p className="card-text">naissance: {item.naissance}</p>
                  <p className="card-text">nationalite: {item.nationalite}</p>
                  <p className="card-text">sexe: {item.sexe}</p>
                  <p className="card-text">adresse: {item.adresse}</p>
                 <p className="card-text">statut: {item.statut}</p>
            </div>
          </div>
        </div>
      ))}

      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
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
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
          }

export default PersonneAffichage;