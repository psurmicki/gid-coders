import React, { createContext, useReducer } from "react";
import { beerReducers } from './reducers.jsx';

const initialState = {
    listBeers: [],
    favouriteBeers: [],
    error: null
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(beerReducers, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;