import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'
export const loginAction = createAsyncThunk(
	'user/loginAction',
	async (data) => {
		console.log('data', data )
		const response  = await axios.post(`${API_BASE_URL}/${API_END_POINT.LOGIN}`, data)
	
		return response;

	}
)
const initialState = {
	loader: null,
	user:{}
}
const userSilce = createSlice({
	name:"user",
	initialState,
	reducers:{ 
		setUser: (state,{ payload }) => {
			state.user = payload.token
		},
		logOut: (state, { payload }) => {
			state.user = { }

		}
	},
	extraReducers: (builder) => {
		
		builder
		.addCase(loginAction.pending, (state, action) => {
			state.loader = true
		})
		builder
		.addCase(loginAction.fulfilled, (state,{ payload }) => {
			state.loader = false;
			state.user = payload.data.token
			setLocalUser(payload.data.token)
		})
		builder
		.addCase(loginAction.rejected,(state,action) => {
			state.loader = false;

		}) 

	}

})

export const { setUser, logOut } = userSilce.actions
export default userSilce.reducer;

const setLocalUser = (user) => {
	localStorage.setItem('token', user)
}