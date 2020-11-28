import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import BeerList from './BeerList.jsx';
import { move, reorder } from '../utils/dNdfunc.jsx'

export default function BeersContainer({ beers }) {
  const [listBeers, setListBeers] = useState(beers)
  const [favouriteBeers, setFavouriteBeers] = useState([])
  console.log({ listBeers }, { beers }, { favouriteBeers })

  const onDragEnd = result => {
    console.log({ result });
    const { source, destination } = result;
    if (!result.destination) return;

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'beersList') {
        const items = reorder(
          listBeers,
          source.index,
          destination.index
        );
        setListBeers(items)
      } else if (source.droppableId === 'favouriteBeersList') {
        const items = reorder(
          favouriteBeers,
          source.index,
          destination.index
        );
        setFavouriteBeers(items)
      }
    } else if (source.droppableId !== destination.droppableId) {
      if (source.droppableId === 'beersList') {
        const result = move(
          listBeers,
          favouriteBeers,
          source,
          destination)
        setListBeers(result.beersList)
        setFavouriteBeers(result.favouriteBeersList)
      } else if (source.droppableId === 'favouriteBeersList') {
        const result = move(
          favouriteBeers,
          listBeers,
          source,
          destination
        )
        setListBeers(result.beersList)
        setFavouriteBeers(result.favouriteBeersList)
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <Col>
          <BeerList beers={listBeers} id={"beersList"} title={'Beers List: '} />
        </Col>
        <Col>
        </Col>
        <Col>
          <BeerList beers={favouriteBeers} id={"favouriteBeersList"} title={'Favourite beers list: '} />
        </Col>
      </Row>
    </DragDropContext>
  );
}