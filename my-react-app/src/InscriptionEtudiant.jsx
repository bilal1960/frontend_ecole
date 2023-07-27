import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Pagination } from 'react-bootstrap';

function InscriptionEtudiant() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 1;
  const [data, setData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const [personnes, setPersonnes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const inscriptionsResponse = await fetch(`/add/inscriptions/api?page=${currentPage - 1}&size=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!inscriptionsResponse.ok) {
          throw new Error("Une erreur s'est produite lors de la tentative de récupération des données des inscriptions.");
        }

        const inscriptionsData = await inscriptionsResponse.json();
        setData(inscriptionsData.content ? inscriptionsData.content : []);
        setTotalPages(inscriptionsData.totalPages);

        const personnesResponse = await fetch(`/add/perso/api`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!personnesResponse.ok) {
          throw new Error("Une erreur s'est produite lors de la tentative de récupération des données des personnes.");
        }

        const personnesData = await personnesResponse.json();
        setPersonnes(personnesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, getAccessTokenSilently]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function findPersonneAssociee(inscription, personnes) {
    return personnes.find((personne) => personne.id === inscription.personne.id);
  }

  return (
    <div className="row">
      {data.map((item) => {
        const personneAssociee = findPersonneAssociee(item, personnes);

        return (
          <div key={item.id} className="col-lg-6 col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                {personneAssociee && (
                  <div>
                    <p className="card-text">Nom : {personneAssociee.nom}</p>
                    <p className="card-text">Prénom : {personneAssociee.prenom}</p>
                    <p className="card-text">Naissance: {personneAssociee.naissance}</p>
                    <p className="card-text">Nationalité: {personneAssociee.nationalite}</p>
                    <p className="card-text">Sexe: {personneAssociee.sexe}</p>
                    <p className="card-text">Adresse: {personneAssociee.adresse}</p>
                    <p className="card-text">Commune : {item.commune}</p>
                    <p className="card-text">Minerval : {item.minerval}</p>
                    <p className="card-text">Statut: {personneAssociee.statut}</p>

                   
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

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

export default InscriptionEtudiant;
