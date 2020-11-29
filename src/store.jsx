import React, { createContext, useReducer } from "react";
import BeerReducers from './reducers.jsx';

const initialState = {
    listBeers: [],
    favouriteBeers: [],
    removedBeers: [],
    error: null
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(BeerReducers, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;