
const BeerReducers = (state, action) => {
  console.log({ state }, { action });
  switch (action.type) {
    //Regular list beers
    case 'SET_BEERS':
      return {
        ...state,
        listBeers: action.payload
      };

    case 'ADD_BEERS':
      return {
        ...state,
        listBeers: [...state.listBeers, ...action.payload],
        favouriteBeers: state.favouriteBeers.filter(beer => beer.id !== action.payload[0].id)
      };

    case 'REORDER_BEERS':
      return {
        ...state,
        listBeers: action.payload
      };

    //Favourite beers
    case 'SET_FAVOURITE_BEERS':
      return {
        ...state,
        favouriteBeers: action.payload
      };

    case 'ADD_FAVOURITE_BEERS':
      console.log({ state }, { action });
      return {
        ...state,
        favouriteBeers: [...state.favouriteBeers, ...action.payload],
        listBeers: state.listBeers.filter(beer => beer.id !== action.payload[0].id)
      };

    case 'REORDER_FAVOURITE_BEERS':
      return {
        ...state,
        favouriteBeers: action.payload
      };







    case 'REMOVE_BEERS':
      return {
        ...state,
        listBeers: state.listBeers.filter(beer => beer.id !== action.payload)
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };



    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default BeerReducers;