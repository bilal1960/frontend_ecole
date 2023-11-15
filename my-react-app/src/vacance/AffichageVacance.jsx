import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import UpdateVacance from './UpdateVacance';

function AffichageVacance() {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 2;
    const [data, setData] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();
    const [personnelss, setPersonnes] = useState([]);


    useEffect(() => {
        const fetchVacances = async () => {
            try {
                const accessToken = await getAccessTokenSilently();

                const response = await fetch(`/add/vacance/pagivac?page=${currentPage}&size=${itemsPerPage}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(t("une erreur s'est produite ."));
                }

                const responseData = await response.json();
                setData(responseData.content);
                setTotalPages(responseData.totalPages);

                const personnesResponse = await fetch(`/add/vacance/personnet`, {
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
        }
              
        fetchVacances();
    }, [currentPage, getAccessTokenSilently, itemsPerPage, t]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleUpdate = async (index, updatedvacance) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const itemToUpdate = data[index];

            const updateResponse = await fetch(`/add/vacance/vacances/${itemToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedvacance),
            });

            if (!updateResponse.ok) {
                throw new Error("Une erreur s'est produite lors de la mise à jour des données.");
            }

            setData((prevData) => {
                const updatedData = [...prevData];
                updatedData[index] = updatedvacance;
                return updatedData;
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
          <div className="row">
            {data.map((item, index) => {
              const personneAssociee = personnelss.find((personne) => personne.id === item.personne.id);
      
              return ( 
                <div key={item.id} className="col-lg-6 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                        {personneAssociee && (
                            <div>
                    <p className="card-text">{t("name")}: {personneAssociee.nom}</p>
                    <p className="card-text">{t("firstname")} {personneAssociee.prenom}</p>
                    <p className="card-text">{t("status")} {personneAssociee.statut}</p>
                    <p className="card-text">{t("start date")} {item.datedebut}</p>
                    <p className="card-text">{t("end date")} {item.datefin}</p>
                    <p className="card-text">Type: {item.type}</p>
                    <p className="card-text">{t("comment")} {item.commentaire}</p>
                    <UpdateVacance vac={item} onUpdateVacance={(updatedvacance) => handleUpdate(index,updatedvacance)} />
                    </div>
                        )}
                  </div>
                </div>
                </div>
              );
            })}
          
        </div>
      
            <ReactPaginate
                previousLabel={t("Previous")}
                nextLabel={t("Next")}
                breakLabel={'...'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
                forcePage={currentPage } 
            />
            </div>
    );       
}

export default AffichageVacance;
