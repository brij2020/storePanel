import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux'
import userReducer  from '../src/store/Slices/login.slice'
const RenderWithRedux =  (ui,{
    preloadedState={},
    store=configureStore({reducer:{userReducer: userReducer}, preloadedState}),
    ...renderOptions
}={}) =>  {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    
      // Return an object with the store and all of RTL's query functions
      return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
export default RenderWithRedux;
