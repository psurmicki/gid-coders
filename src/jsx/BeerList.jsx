import React from 'react';
import { ListGroup } from 'reactstrap';
import { Droppable } from 'react-beautiful-dnd';
import BeerCard from './BeerCard.jsx';

export default function BeerList({ beers, id, title }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
        >
          <h5>{title}</h5>
          <ListGroup>
            {beers.map((beer, index) => (
              <BeerCard key={beer.id} beer={beer} index={index} />
            ))}
            {provided.placeholder}
          </ListGroup>
        </div>
      )}
    </Droppable>
  )
}