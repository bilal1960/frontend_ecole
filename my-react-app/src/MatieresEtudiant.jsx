import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Pagination } from 'react-bootstrap';
import UpdateForm from './UpdateFormMatiereEtudiant'; 

function MatieresEtudiant() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 4;
    const [data, setData] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const [personnes, setPersonnes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const matieresResponse = await fetch(`/add/matiere/matieres/api?page=${currentPage - 1}&size=${itemsPerPage}&sort=secondaire,asc`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!matieresResponse.ok) {
                    throw new Error("Une erreur s'est produite lors de la tentative de récupération des données.");
                }

                const matieresData = await matieresResponse.json();
                setData(matieresData.content ? matieresData.content : []);
                setTotalPages(matieresData.totalPages);

                const personnesResponse = await fetch(`/add/matiere/professeurs/api1`, {
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

    const handleUpdate = async (index, updatedMatiere) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const itemToUpdate = data[index];

            const updateResponse = await fetch(`/add/matiere/matieres/${itemToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMatiere),
            });

            if (!updateResponse.ok) {
                throw new Error("Une erreur s'est produite lors de la mise à jour des données.");
            }

            setData((prevData) => {
                const updatedData = [...prevData];
                updatedData[index] = updatedMatiere;
                return updatedData;
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="row">
            {data.map((item, index) => {
                const personneAssociee = personnes.find((personne) => personne.id === item.personne.id);

                return (
                    <div key={item.id} className="col-lg-6 col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                {personneAssociee && (
                                    <div>
                                        <p className="card-text">Professeur: {personneAssociee.nom} {personneAssociee.prenom}</p>
                                        <p className="card-text">Matière: {item.nom}</p>
                                        <p className="card-text">Début: {item.debut}</p>
                                        <p className="card-text">Fin: {item.fin}</p>
                                        <p className="card-text">DébutTime: {item.debutime}</p>
                                        <p className="card-text">FinTime: {item.fintime}</p>
                                        <p className="card-text">Local: {item.local}</p>
                                        <p className="card-text">Jour: {item.jour}</p>
                                        <p className="card-text">Année: {item.secondaire}</p>
                                        <UpdateForm item={item} onUpdate={(updatedMatiere) => handleUpdate(index, updatedMatiere)} />
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

export default MatieresEtudiant;
