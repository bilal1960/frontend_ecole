import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Pagination } from 'react-bootstrap';
import UpdateInscription from './UpdateInscription';
import { useTranslation } from 'react-i18next';

function InscriptionEtudiant() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 1;
  const [data, setData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const [personnes, setPersonnes] = useState([]);
  const {t } = useTranslation();
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

  async function handleUpdate(index, updatedInscription) {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`/add/inscriptions/inscrit/${updatedInscription.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInscription),
      });

      if (!response.ok) {
        throw new Error("Une erreur s'est produite lors de la mise à jour de l'inscription.");
      }

      setData((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = updatedInscription;
        return updatedData;
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="row">
      {data.map((item, index) => {
        const personneAssociee = findPersonneAssociee(item, personnes);

        return (
          <div key={item.id} className="col-lg-6 col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                {personneAssociee && (
                  <div>
                    <p>{t("name")} : {personneAssociee.nom}</p>
                    <p>{t("firstname")} : {personneAssociee.prenom}</p>
                    <p>{t("year of birth")}: {personneAssociee.naissance}</p>
                    <p>{t("nationality")}: {personneAssociee.nationalite}</p>
                    <p>{t("sex")}: {personneAssociee.sexe}</p>
                    <p>{t("adress")}: {personneAssociee.adresse}</p>
                    <p>{t("date of registration")}: {item.date_inscrit}</p>
                    <p>{t("refund")}: {item.rembourser}</p>
                    <p>Section: {item.section}</p>
                    <p>{t("town")}: {item.commune}</p>
                    <p>{t("year")}: {item.secondaire_anne}</p>
                    <p>{t("registration fees")}: {item.minerval}</p>
                    <UpdateInscription
                      inscription={item}
                      onUpdateinscrit={(updatedInscription) => handleUpdate(index, updatedInscription)}
                    />
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
