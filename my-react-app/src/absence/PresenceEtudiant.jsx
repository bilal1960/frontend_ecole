import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Pagination } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import UpdateAbsence from './UpdateAbsence';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function PresenceEtudiant() {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 1;  
    const [data, setData] = useState([]);
    const [personnes, setPersonnes] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await fetch(`/add/absence/pagipresence?page=${currentPage}&size=${itemsPerPage}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(t('Error fetching absences.'));
                }

                const responseData = await response.json();
                setData(responseData.content ? responseData.content : []);
                setTotalPages(responseData.totalPages);

                const personnesResponse = await fetch(`/add/absence/personne`, {
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

    const handleUpdate = async (index, updatedabsence) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const itemToUpdate = data[index];

            const updateResponse = await fetch(`/add/absence/absences/${itemToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedabsence),
            });

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                toastr.error(errorData.erreur || "Une erreur s'est produite lors de la mise à jour de l'inscription.");
                return;
            }

            setData((prevData) => {
                const updatedData = [...prevData];
                updatedData[index] = updatedabsence;
                return updatedData;
            });
            toastr.success("succès update absence");
        } catch (error) {
            console.error(error);
            toastr.error("Erreur lors de la communication avec le serveur");
        }
    };

    function findPersonneAssociee(presence, personnes) {
        return personnes.find((personne) => personne.id === presence.personne.id);
      }

    return (
        <div className="row">
            {data.map((item, index) => {
            const personneAssociee = findPersonneAssociee(item, personnes);
            
            return (
                <div key={item.id} className="col-lg-3 col-md-3 mb-3">
                    <div className="card">
                        <div className="card-body" >
                        {personneAssociee &&(
                            <div>
                            <p className="card-text">{t("name")} {personneAssociee.nom}</p>
                            <p className="card-text">{t("firstname")} {personneAssociee.prenom}</p>
                            <p className="card-text">{t("status")} {personneAssociee.statut}</p>    
                            <p className="card-text">{t('presence')}: {item.presence}</p>
                            <p className="card-text">{t('Date')}: {item.date}</p>
                            <p className="card-text">{t('start time')}: {item.heuredebut}</p>
                            <p className="card-text">{t('end time')}: {item.heurefin}</p>
                            <p className="card-text">{t('certificate')}: {item.certficat ? t('Yes') : t('No')}</p>
                            <UpdateAbsence item={item} onUpdateAbsence={(updatedabsence) => handleUpdate(index, updatedabsence)} />
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

export default PresenceEtudiant;
