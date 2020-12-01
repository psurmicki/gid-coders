import { useEffect, useReducer } from 'react';
import { apiReducer } from '../reducers.jsx';

const fetchData = async (path) => {
  if (!path) return;
  const response = await fetch(`https://api.punkapi.com/v2/beers?${path}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.status);
};

export const useData = (path) => {
  const [response, dispatch] = useReducer(apiReducer, { data: null, isLoading: false, error: null });
  useEffect(() => {
    dispatch({ type: 'FETCHING' });
    fetchData(path)
      .then((data) => dispatch({ type: 'SUCCESS', payload: data }))
      .catch((error) => dispatch({ type: 'ERROR', payload: error }));
  }, [path]);
  return response;
};