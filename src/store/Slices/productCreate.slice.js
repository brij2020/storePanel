import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'

export const createProduct = createAsyncThunk(
	'electro/create-product',
	async (catObject) => {
		
		axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiX2lkIjoiNjI4OWU0MzVlNmU2YWMzMTg4N2EzYzVkIiwiaWF0IjoxNjY0MTIyNzYwLCJleHAiOjE2NjQ3Mjc1NjB9.ZWKskInvhqVTZ5dbLObs_HfAW2PKP47mwI0cTvZnz_8`
		const response = await axios.post(`${API_BASE_URL}/${API_END_POINT.ADD_PRODUCT}`,catObject);
			if(response.data.status) {
				return Object.assign({},response.data,{status: true });
			} else {
				return []
			}
		}
	);
const initialState = {
	data:{},
	loader: false
}
const createCatgorySlice  = createSlice({
	name: 'electro/product',
	initialState,
	reducers:{},
	extraReducers: builder => {
		builder.addCase(createCategory.pending, (state, { payload }) => {
			state.loader = true
		})
		builder.addCase(createCategory.fulfilled, (state, {payload} ) => {
			state.loader = false;
			state.data = payload;
		})
		builder.addCase(createCategory.rejected, (state, { payload}) => {
			state.loader = false;
		})
	}
})
export default createCatgorySlice.reducer;