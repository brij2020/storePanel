import { createSlice } from '@reduxjs/toolkit';


const initialState = {
	count: 0
};
const countSlice  = createSlice({
	name: 'count',
	initialState,
	reducers: {
		plus: (state,{ payload }) => {  state.count =  state.count + payload.count },
		min: (state,{ payload }) => { state.count =  payload.count },
		mul: (state,{ payload }) => { state.count =  payload.count }

	}
}) 

export const  {plus,min,mul } = countSlice.actions;
export default countSlice.reducer