import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Slices/test.sample.slice';
import logger from 'redux-logger'
import reducer from './reducers'


const store  = configureStore({
	reducer,// all reducer are automatically combined 
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: true,
})
export default store;