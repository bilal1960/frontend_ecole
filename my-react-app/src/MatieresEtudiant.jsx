import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';

function MatieresEtudiant() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 1; // Afficher un élément par page
  const [data, setData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`add/matieres/api?page=${currentPage}&size=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json', // Ajout du header Content-Type
          },
        });

        if (!response.ok) {
          throw new Error('Une erreur s\'est produite lors de la tentative de récupération des données.');
        }

        const responseData = await response.json();
        console.log(responseData);

        setData(responseData.matieres ? responseData.matieres : []);
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
              <h5 className="card-title">{item.nom}</h5>
              <p className="card-text">Début: {item.debut}</p>
              <p className="card-text">Fin: {item.fin}</p>
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

export default MatieresEtudiant;