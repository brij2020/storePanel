import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const initialState = {
	msg: 'name'
}
const sampleSlice  = createSlice({
	name:'sample',
	initialState,
	reducers:{
		sayHello: (state, payload) => {
			console.log('pay load',payload)
			state.msg = 'new daa'
		},
		
	}
})
export const { sayHello } = sampleSlice.actions;
export default sampleSlice.reducer
