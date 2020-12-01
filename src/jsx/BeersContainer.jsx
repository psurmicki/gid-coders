/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import BeerList from './BeerList.jsx';
import RemoveField from './RemoveField.jsx';
import { move, reorder, remove, refreshPage } from '../utils/functions.jsx';
import { Context } from '../store.jsx';
import '../styles/BeersContainer.css';

export default function BeersContainer({ beers, onClick, page }) {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({ type: 'SET_BEERS', payload: beers });
    dispatch({ type: 'SET_FAVOURITE_BEERS', payload: state.favouriteBeers })
  }, [beers]);

  const id2List = {
    beersList: 'listBeers',
    favouriteBeersList: 'favouriteBeers',
    removeField: 'removeField'
  };

  const getList = (id) => state[id2List[id]];

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!result.destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      source.droppableId === 'beersList' ?
        dispatch({ type: 'REORDER_BEERS', payload: items })
        :
        dispatch({ type: 'REORDER_FAVOURITE_BEERS', payload: items })
    } else if (destination.droppableId === 'removeField') {
      const removedItem = remove(
        getList(source.droppableId),
        source
      );
      source.droppableId === 'beersList' ?
        dispatch({ type: 'REMOVE_BEERS', payload: removedItem })
        :
        dispatch({ type: 'REMOVE_FAVOURITE_BEERS', payload: removedItem });
    } else if (source.droppableId === 'beersList' && destination.droppableId === 'favouriteBeersList') {
      const result = move(
        getList(source.droppableId),
        state.favouriteBeers,
        source,
        destination
      );
      dispatch({ type: 'ADD_FAVOURITE_BEERS', payload: result.moved })
    } else alert('You can not move beer from favourite list into beers list!')
  }

  return (
    <div>
      <Row noGutters>
        <Col><h2 className='beersListHeader'>Beers List:</h2></Col>
        <Col><h2 className='beersListHeader'>Add beer to favourite: </h2></Col>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row noGutters className='beersRow'>
          <Col className='beersList'>
            <BeerList beers={state.listBeers} id={"beersList"} />
          </Col>
          <Col className='beersList'>
            <BeerList beers={state.favouriteBeers} id={"favouriteBeersList"} />
          </Col>
        </Row>
        <Row noGutters>
          <Col><h2 className='beersListHeader'>Drop to remove beer: </h2></Col>
        </Row>
        <Row noGutters>
          <Col>
            <RemoveField id={"removedBeers"} />
          </Col>
        </Row>
      </DragDropContext>
      <Button
        name={'minus'}
        disabled={page === 1}
        color="warning"
        size="xl"
        className='button'
        onClick={onClick}
      >
        Load previous beer list
        </Button>
      <Button
        name={'plus'}
        disabled={beers.length < 10}
        color="warning"
        size="xl"
        className='button'
        onClick={onClick}
      >
        Load more beers
      </Button>
      {
        beers.length < 10 &&
        <Button
          outline
          color="danger"
          size="xl"
          className='button'
          onClick={refreshPage}
        >
          Refresh Page
      </Button>
      }
    </div>
  );
}