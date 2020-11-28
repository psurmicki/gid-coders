/* eslint-disable default-case */
import { useEffect, useReducer } from 'react';

const fetchData = async (path) => {
  if (path !== 0) {
    const response = await fetch(`https://api.punkapi.com/v2/beers?page=${path}&per_page=10`);
    if (response.ok) {
      return response.json();
    }
    throw await response.json();
  }
};

const apiReducer = (state, action) => {
  console.log({ state }, { action })
  switch (action.type) {
    case 'FETCHING':
      return {
        data: null,
        isLoading: true,
        error: null
      };
    case 'SUCCESS':
      return {
        data: action.payload,
        isLoading: false,
        error: null
      };
    case 'ERROR':
      return {
        data: null,
        isLoading: false,
        error: action.payload
      };
  }
  return state;
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