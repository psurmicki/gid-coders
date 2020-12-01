import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'rgb(255, 18, 18)' : 'rgb(255, 255, 255)',
  padding: 8,
  opacity: 0.3,
  width: '45vw',
  height: '20vh',
});

export default function RemoveField() {
  return (
    <Droppable droppableId={'removeField'}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
        </div>
      )}
    </Droppable>
  )
}


