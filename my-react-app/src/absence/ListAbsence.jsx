import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useSWR from "swr";
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function ListAbsence({absence}) {
  const { getAccessTokenSilently } = useAuth0();
  const { t } = useTranslation();

  const fetcher = async (URL) => {
    const accessToken = await getAccessTokenSilently();
    return fetch(URL, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    }).then((r) => r.json());
  };
  
  const { data: absences, isLoading, error } = useSWR("/add/absence", fetcher);

  if (isLoading) return <p>{t('Loading...')}</p>;
  if (error) return <p>{t('Error loading data.')}</p>;

  return (
    <div>
      <h3>{t('List of Absences')}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('Presence')}</th>
            <th>{t('Date')}</th>
            <th>{t('Start Time')}</th>
            <th>{t('End Time')}</th>
            <th>{t('Certificate')}</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(absences) && absences.map(absence => (
            <tr key={absence.id}>
              <td>{absence.presence}</td>
              <td>{absence.date}</td>
              <td>{absence.heuredebut}</td>
              <td>{absence.heurefin}</td>
              <td>{absence.certficat}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListAbsence;
