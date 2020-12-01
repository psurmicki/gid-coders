/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useData } from '../utils/useData.jsx';
import BeersContainer from './BeersContainer.jsx';
import DataForm from './DataForm.jsx';
import NoData from './NoData.jsx';
import '../styles/loader.css';

export default function DataViewerComponent() {
  const [page, setPage] = useState(1);
  const [path, setPath] = useState('');
  const [isActive, setIsActive] = useState(false);
  const { data, isLoading } = useData(path);

  const handlePage = (e) => {
    const { name } = e.target;
    if (name === 'plus') {
      setPage((p) => p + 1);
    } else {
      setPage((p) => p - 1)
    }
  }

  const handlePath = () => {
    let parts = path.split('&');
    let newPath = ''
    if (!path) return;
    if (parts.length === 3) {
      newPath = `${parts[0]}&page=${page}&${parts[2]}`
      setPath(newPath);
    } else {
      newPath = `page=${page}&${parts[1]}`
      setPath(newPath);
    }
  }

  useEffect(() => {
    handlePath()
  }, [page]);

  const onSubmit = data => {
    const { beers_property, beer_value } = data;
    if (beers_property && beer_value) {
      setPath(`${beers_property}=${beer_value}&page=${page}&per_page=10`)
      setIsActive((prevValue) => !prevValue);
    }
    else {
      setPath(`page=${page}&per_page=10`)
      setIsActive((prevValue) => !prevValue);
    }
  };

  if (!isActive) {
    return <DataForm onSubmit={onSubmit} />
  } else return (
    <div>
      {isLoading ?
        <div className='loader' />
        :
        data.length ?
          <BeersContainer beers={data} onClick={handlePage} page={page} />
          :
          <NoData />
      }
    </div>
  )
}