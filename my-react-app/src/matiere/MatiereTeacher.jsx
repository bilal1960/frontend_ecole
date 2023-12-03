import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, Container, Row, Col, Pagination } from 'react-bootstrap';

function MatiereTeacher() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 1;
    const [matieres, setMatieres] = useState([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchMatieres = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await fetch(`/add/matiere/mesMatieres?page=${currentPage - 1}&size=${itemsPerPage}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    console.error("Erreur lors de la récupération des matières: " + response.statusText);
                    setMatieres([]);
                    return;
                }

                const data = await response.json();
                setMatieres(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Erreur lors de la récupération des matières', error);
                setMatieres([]);
            }
        };

        fetchMatieres();
    }, [getAccessTokenSilently, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container>
            <h2>Mes Matières</h2>
            <Row>
                {matieres && matieres.length > 0 ?    (
                    matieres.map(matiere => (
                        <Col md={4} key={matiere.id}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>{matiere.nom}</Card.Title>
                                    <Card.Text>
                                        Début: {matiere.debut}<br/>
                                        Fin: {matiere.fin}<br/>
                                        Heure: {matiere.debutime} - {matiere.fintime}<br/>
                                        Local: {matiere.local}<br/>
                                        Jour: {matiere.jour}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>Aucune matière n'a été trouvée.</p>
                )}
            </Row>
            {matieres && matieres.length > 0 && totalPages >0  && (
                <Pagination className="justify-content-center">
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
            )}
        </Container>
    );
}

export default MatiereTeacher;
