import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';

function MatieresEtudiant() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 1; // Remplacez cette valeur par le nombre d'éléments à afficher par page
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();


  useEffect(() => {
    // Mettez à jour le nombre total de pages lorsque le nombre total d'éléments change
    const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(calculatedTotalPages);
  }, [totalItems, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently(); 

        const response = await fetch('/add/matieres', {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Une erreur s\'est produite lors de la récupération des données.');
        }

        const data = await response.json();
        setData(data);
        setTotalItems(data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage],[getAccessTokenSilently]);

  // Calculez les indices de début et de fin des éléments à afficher en fonction de la page actuelle
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtrer les éléments à afficher en fonction des indices calculés
  const displayedItems = data.slice(startIndex, endIndex);

  

  return (
    <div className="row">
      {/* Afficher les éléments correspondant à la page actuelle */}
      {displayedItems.map((item) => (
        <div key={item.id} className="col-lg-6 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{item.nom}</h5>
              <p className="card-text">Début : {item.debut}</p>
              <p className="card-text">Fin : {item.fin}</p>
              
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              Précédent
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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