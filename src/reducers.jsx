export function beerReducers(state, action) {
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
    case 'REMOVE_BEERS':
      return {
        ...state,
        listBeers: state.listBeers.filter(beer => beer.id !== action.payload.id)
      };
    //Favourite beers
    case 'SET_FAVOURITE_BEERS':
      return {
        ...state,
        favouriteBeers: action.payload
      };
    case 'ADD_FAVOURITE_BEERS':
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
    case 'REMOVE_FAVOURITE_BEERS':
      return {
        ...state,
        favouriteBeers: state.favouriteBeers.filter(beer => beer.id !== action.payload.id)
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

export function apiReducer(state, action) {
  switch (action.type) {
    case 'FETCHING':
      return {
        data: null,
        isLoading: true,
        error: null
      };
    case 'SUCCESS':
      return {
        data: action.payload,
        isLoading: false,
        error: null
      };
    case 'ERROR':
      return {
        data: null,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};