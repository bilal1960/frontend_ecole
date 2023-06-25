import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MatieresEtudiant() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 1; // Remplacez cette valeur par le nombre d'éléments à afficher par page
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);

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
        const response = await fetch('/add/matieres', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InlUZXVfaktnaWdaQ1Y5Uk55Q19OWCJ9.eyJpc3MiOiJodHRwczovL2JpbGFsLXByb2ppbnQtMjIyMy5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjQ4ZWRmZmMzY2VkZjlmM2FkYzdiZmY0IiwiYXVkIjpbImh0dHBzOi8vZWNvbGUvYXBpIiwiaHR0cHM6Ly9iaWxhbC1wcm9qaW50LTIyMjMuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NzcwNzg3NCwiZXhwIjoxNjg3Nzk0Mjc0LCJhenAiOiIydTF4SFl6bWZSQ0hpMjhyMDEyR09PbWNXRjA0dTVwcCIsInNjb3BlIjoib3BlbmlkIHdyaXRlOm1hdGllcmUgcmVhZDphbGwtbWF0aWVyZSBvZmZsaW5lX2FjY2VzcyJ9.BN_AGj_VSrZ_yqJkMuK4yX9URuH99lMlWqlS34ZdkjQW77iNvmT3gMyIPrcrbr1VcSX0-iqCxbpYWY83vM25qjL135b-96CtXJavzLc4lv7BWkhC9a7o9eiXqPo1d7PySdomL7C4BIQyWNHNGTteX1tbAIlyqSgvnBBkrUb3Ydl75YdAquxeUrsGFTg8KIvIvNu4O3E5Fc5aI6ymeo2gLdlDzdDNtcFAYEBzZZHnMniXefJzAwV2GIcjJmWFzRWZ43s9oztMCjibl6FlEi8v2zxO1bd6Ojfiq8pLHOfIcGGnsmSy8gBqPE0dBmYQIwEDrUyNqNMCk338KirIauYlWg'

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
  }, [currentPage]);

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