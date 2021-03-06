export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [moved] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, moved);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return { ...result, moved: [moved] }
};

export const remove = (source, droppableSource) => {
  const sourceClone = Array.from(source);
  const [removedItem] = sourceClone.splice(droppableSource.index, 1);
  return removedItem
};

export const refreshPage = () => {
  window.location.reload();
}