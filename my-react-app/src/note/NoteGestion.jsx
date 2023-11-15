import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NoteForm from './NoteForm';
import { useTranslation } from 'react-i18next';

function NoteGestion(){
    const [points, setNotes] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchNotes = async () => {
          try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch('/add/note', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            const data = await response.json();
            setNotes(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchNotes();
      }, [getAccessTokenSilently]);

      return (
        <>
          <h2>{t("Manages absences")}</h2>
          <NoteForm setNotes={setNotes} />
        </>
      );
}
export default NoteGestion