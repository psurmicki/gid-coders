import React, { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import BeersContainer from './BeersContainer.jsx';
import '../styles/App.css';
import { useData } from '../utils/useData.jsx';

export default function DataViewerComponent() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useData(page);
  const [isActive, setIsActive] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(false);

  const beersComponent = data ? <BeersContainer beers={data} /> : null;

  const activated = () => {
    setIsActive((prevValue) => !prevValue);
    setPage((p) => p + 1)
  }

  // const deactivated = () => {
  //   console.log('deact', { data })
  //   if (data.length === 0) {
  //     console.log('ok')
  //     return setIsDisabled((prevValue) => !prevValue);
  //   }
  //   setPage((p) => p + 1)
  // }

  console.log('DVC', { data }, { isLoading }, { isActive })
  if (!isActive) {
    return (
      <Button
        className={'fetchButton'}
        color="warning"
        size="xl"
        onClick={() => activated()}
      >
        Click to fetch beers
      </Button>)
  } else return (
    <div>
      {isLoading && "Data is loading…"}
      {beersComponent}
      <Button
        disabled={page === 1}
        color="warning"
        size="x xl"
        onClick={() => setPage((p) => p - 1)}
      >
        Back to previous page
      </Button>
      <Button
        // disabled={isDisabled}
        color="warning"
        size="x xl"
        onClick={() => setPage((p) => p + 1)}
      >
        Load more beers
        </Button>
    </div>
  )
}