import React, { useState } from 'react';
import useSWR from "swr";
import { useAuth0 } from '@auth0/auth0-react';

function ListeNote({points}){
  const { getAccessTokenSilently } = useAuth0();
  const [permissions, setPermissions] = useState([]);

  const fetcher = async (URL) => {
    const accessToken = await getAccessTokenSilently();
    return fetch(URL, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    }).then((r) => r.json());
  };


}