import { useAuth0 } from '@auth0/auth0-react';

function useFetcher() {

  const { getAccessTokenSilently } = useAuth0();
  const fetcher = async (url) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  };

  return { fetcher };
}

export default useFetcher;