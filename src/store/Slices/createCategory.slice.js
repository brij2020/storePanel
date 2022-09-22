import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'

export const createCategory = createAsyncThunk(
	'electro/create-cat',
	async (catObject) => {
		const response = await axios.post(`${API_BASE_URL}/${API_END_POINT.CREATE_CATEGORY}`,catObject);
		console.log('data',response);
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
const createCatgorySlice  = createSlice({
	name: 'electro/category',
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