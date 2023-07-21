import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Pagination } from 'react-bootstrap';

function MatieresEtudiant() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 1;
  const [data, setData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`/add/matieres/api?page=${currentPage - 1}&size=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json', 
          },
        });

        if (!response.ok) {
          throw new Error('Une erreur s\'est produite lors de la tentative de récupération des données.');
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

      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
}

export default MatieresEtudiant;
