import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Pagination } from 'react-bootstrap';
import UpdateFormPersonneAffichage from './UpdateFormPersonneAffichage';
import QRCode  from 'react-qr-code';
import { useTranslation } from 'react-i18next';

function PersonneAffichage() {
  const [currentPage, setCurrentPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 1; 
  const [data, setData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const { t } = useTranslation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`add/perso/api1?page=${currentPage}&size=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json', 
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

  const handleUpdate = async (index, updatedPersonne) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const itemToUpdate = data[index];

      const updateResponse = await fetch(`/add/perso/persos/${itemToUpdate.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPersonne),
      });

      if (!updateResponse.ok) {
        throw new Error("Une erreur s'est produite lors de la mise à jour des données.");
      }

      setData((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = updatedPersonne;
        return updatedData;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row">
      {data.map((item, index) => (
        <div key={item.id} className="col-lg-6 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <p className="card-text">id: {item.id} <QRCode value = {item.id}   ></QRCode></p>
              <p className="card-text">{t('name')}: {item.nom}</p>
              <p className="card-text">{t('firstname')}: {item.prenom} </p>
              <p className="card-text">{t('year of birth')}: {item.naissance}</p>
              <p className="card-text">{t('nationality')}: {item.nationalite}</p>
              <p className="card-text">{t('sex')}: {item.sexe}</p>
              <p className="card-text">{t('adress')}: {item.adresse}</p>
              <p className="card-text">{t('status')}: {item.statut}</p>
              <UpdateFormPersonneAffichage item={item} onUpdatepersonne={(updatedPersonne) => handleUpdate(index, updatedPersonne)} />
            </div>
          </div>
        </div>
      ))}
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0} 
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index === currentPage} 
            onClick={() => handlePageChange(index)} 
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1} 
        />
      </Pagination>
    </div>
  );
}

export default PersonneAffichage;
