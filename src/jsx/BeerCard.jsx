import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { Draggable } from 'react-beautiful-dnd';

export default function BeerCard({ beer, index }) {
  return (
    <Draggable
      key={beer.id}
      draggableId={`${beer.id}`}
      index={index}
    >
      {(provided) => (
        <div
          id={`col-d1-${index}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListGroupItem>{beer.name}</ListGroupItem>
        </div>
      )}
    </Draggable>)
} 