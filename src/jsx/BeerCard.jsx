import React, { useContext } from 'react';
import { ListGroupItem } from 'reactstrap';
import { Draggable } from 'react-beautiful-dnd';
import { Context } from '../store.jsx';

const getItemStyle = (draggableStyle, disabled) => ({
  padding: 4,
  margin: '0 0 6px 0',
  borderRadius: 5,
  fontSize: 17,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  background: disabled ? 'rgb(208, 28, 28)' : 'rgb(100, 181, 27)',
  ...draggableStyle
});


export default function BeerCard({ beer, index, id }) {
  const [state,] = useContext(Context);

  const handleDragDisable = () => {
    let favouriteBeerNames = state.favouriteBeers.map(({ name }) => (name));
    if (id === 'beersList') {
      return favouriteBeerNames.includes(beer.name)
    }
  }

  return (
    <div>
      <Draggable
        draggableId={`${beer.id}-${id}`}
        index={index}
        isDragDisabled={handleDragDisable()}
      >
        {(provided, snapshot) => (
          <div
            id={`col-d1-${index}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              provided.draggableProps.style,
              handleDragDisable()
            )}
          >
            <ListGroupItem>
              {beer.name}
            </ListGroupItem>
          </div>
        )}
      </Draggable>

    </div>)
}


