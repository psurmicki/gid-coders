/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import BeerList from './BeerList.jsx';
import { move, reorder } from '../utils/dNdfunc.jsx';
import { Context } from '../store.jsx';

export default function BeersContainer({ beers }) {
  const [state, dispatch] = useContext(Context);
  console.log({ beers }, { state })

  useEffect(() => {
    dispatch({ type: 'SET_BEERS', payload: beers });
    dispatch({ type: 'SET_FAVOURITE_BEERS', payload: state.favouriteBeers })
  }, [beers]);

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!result.destination) return;

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'beersList') {
        const items = reorder(
          state.listBeers,
          source.index,
          destination.index
        );
        dispatch({ type: 'REORDER_BEERS', payload: items })

      } else if (source.droppableId === 'favouriteBeersList') {
        const items = reorder(
          state.favouriteBeers,
          source.index,
          destination.index
        );
        dispatch({ type: 'REORDER_FAVOURITE_BEERS', payload: items })
      }
    } else if (source.droppableId !== destination.droppableId) {
      if (source.droppableId === 'beersList') {
        const result = move(
          state.listBeers,
          state.favouriteBeers,
          source,
          destination
        );
        dispatch({ type: 'ADD_FAVOURITE_BEERS', payload: result.removed })
        // } else if (source.droppableId === 'favouriteBeersList') {
        //   const result = move(
        //     state.favouriteBeers,
        //     state.listBeers,
        //     source,
        //     destination
        //   );
        //   dispatch({ type: 'ADD_BEERS', payload: result.removed });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <Col>
          <BeerList beers={state.listBeers} id={"beersList"} title={'Beers List: '} />
        </Col>
        <Col>
        </Col>
        <Col>
          <BeerList beers={state.favouriteBeers} id={"favouriteBeersList"} title={'Favourite beers list: '} />
        </Col>
      </Row>
      <Row style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <Col>
          <BeerList beers={state.removedBeers} id={"removedBeers"} title={'Remove Beers! '} />
        </Col>
      </Row>
    </DragDropContext>
  );
}