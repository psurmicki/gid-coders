import React from 'react';
import { ListGroup } from 'reactstrap';
import { Droppable } from 'react-beautiful-dnd';
import BeerCard from './BeerCard.jsx';
import { v4 } from 'uuid';

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'rgb(209, 209, 209,0.5)' : 'rgb(255, 255, 255,0.3)',
  padding: 8,
  minHeight: '-webkit-fill-available',
  borderRadius: 4
});

export default function BeerList({ beers, id }) {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          <ListGroup>
            {beers.map((beer, index) => (
              <BeerCard key={v4()} beer={beer} index={index} id={id} />
            ))}
            {provided.placeholder}
          </ListGroup>
        </div>
      )}
    </Droppable>
  )
}