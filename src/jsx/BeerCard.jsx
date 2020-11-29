import React, { useContext } from 'react';
import { ListGroupItem } from 'reactstrap';
import { Draggable } from 'react-beautiful-dnd';
import { Context } from '../store.jsx';

export default function BeerCard({ beer, index, id }) {

  const [state, dispatch] = useContext(Context);

  const handleDragDisable = () => {
    let favouriteBeerNames = state.favouriteBeers.map(({ name }) => (name));
    if (id === 'beersList') {
      return favouriteBeerNames.includes(beer.name)
    }
  }

  return (
    <Draggable
      draggableId={`${beer.id}-${id}`}
      index={index}
      isDragDisabled={handleDragDisable()}
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