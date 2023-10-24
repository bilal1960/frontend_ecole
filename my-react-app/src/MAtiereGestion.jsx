import React, { useEffect,useState } from 'react';
import MatiereForm from "./MatiereForm";
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

function MatiereGestion() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [matiere, setmatieres] = useState([]);
    const {t } = useTranslation();

    useEffect(() => {
        const fetchMatieres = async () => {
            try {
                const accessToken = await getAccessTokenSilently(); 
                const response = await fetch("add/matiere/matieres", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, 
                    },
                });
                const data = await response.json();
                setmatieres(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMatieres();
    }, [getAccessTokenSilently]);

    return (
        <>
            <h2>{t("add a subject")}</h2>
            <MatiereForm setmatieres={setmatieres} />
        </>
    );
}

export default MatiereGestion;
