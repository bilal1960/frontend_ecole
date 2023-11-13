import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

function AffichageNotes() {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 2;
    const [notes, setNotes] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();
    const [personnelss, setPersonnes] = useState([]);


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const accessToken = await getAccessTokenSilently();

                const response = await fetch(`/add/note/paginote?page=${currentPage}&size=${itemsPerPage}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(t("une erreur s'est produite lors de la récupération des notes."));
                }

                const responseData = await response.json();

                console.log("Données récupérées : ", responseData.content);

                setNotes(responseData.content);
                setTotalPages(responseData.totalPages);

                const personnesResponse = await fetch(`/add/note/notepersonne`, {
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
              
        fetchNotes();
    }, [currentPage, getAccessTokenSilently, itemsPerPage, t]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <div className="container mt-5">
          <div className="row">
            {notes.map((item, index) => {
              const personneAssociee = personnelss.find((personne) => personne.id === item.personne.id);
      
              return ( 
                <div key={item.id} className="col-lg-6 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                        {personneAssociee && (
                            <div>
                    <p className="card-text">nom: {personneAssociee.nom}</p>
                    <p className="card-text">prénom: {personneAssociee.prenom}</p>
                    <p className="card-text">Nom: {item.nom}</p>
                    <p className="card-text">deliberation: {item.deliberation}</p>
                    <p className="card-text">session: {item.session}</p>
                    <p className="card-text">resultat: {item.resultat}</p>
                    <p className="card-text">moyenne: {personneAssociee.moyenne}</p>
                    <p className="card-text">reussi: {item.reussi ? 'Oui' : 'Non'}</p>
                    </div>
                        )}
                  </div>
                </div>
                </div>
              );
            })}
          
        </div>

            <ReactPaginate
                previousLabel={'Précédent'}
                nextLabel={'Suivant'}
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

export default AffichageNotes;
