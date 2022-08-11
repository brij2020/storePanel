import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'
export const doAsync = createAsyncThunk(
	'usershe/doAsync',
	async () => {
		const response  = await axios.post(`${API_END_POINT}/${API_END_POINT.LOGIN}`)
		const user = await response.json()
		return user;

	}
)
const initialState = {
	loader: 'idle',

	user:{
		image: ''
	}
}
const userSilce = createSlice({
	name:"usershe",
	initialState,
	reducers:{ 
		setUser: (state,action) => {

		}
	},
	extraReducers: (builder) => {
		console.log('builder',builder)
		builder
		.addCase(doAsync.pending, (state, action) => {
			state.loader = true
		})
		builder
		.addCase(doAsync.fulfilled, (state,action) => {
			state.loader = false;
			state.user.image = action.payload.message 
		})
		builder
		.addCase(doAsync.rejected,(state,action) => {
			state.loader = false;

		}) 

	}

})


export default userSilce.reducer