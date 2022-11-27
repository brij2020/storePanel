import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'

export const getDashboard = createAsyncThunk(
	'electro/dashboard-service',
	async (data) => {

        console.log('data', data)
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${data}`,
			},
		}
        console.log('data', config)
    	
		const response = await axios.post(`${API_BASE_URL}/${API_END_POINT.GET_DASHBOARD}`,{ },config );

			if(response.data.status) {
				return response.data;
			} else {
				return []
			}
		}
	);
const initialState = {
	data:{},
	loader: false
}
const dashboardSlice  = createSlice({
	name: 'electro/dashboard',
	initialState,
	reducers:{},
	extraReducers: builder => {
		builder.addCase(getDashboard.pending, (state, { payload }) => {
			state.loader = true
		})
		builder.addCase(getDashboard.fulfilled, (state, {payload} ) => {
			state.loader = false;
			state.data = payload.data;
		})
		builder.addCase(getDashboard.rejected, (state, { payload}) => {
			state.loader = false;
		})
	}
})
export default dashboardSlice.reducer;