import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'

export const searchProduct = createAsyncThunk(
	'store/search-inventory',
	async (key) => {
		const response = await axios.get(`${API_BASE_URL}/${API_END_POINT.SEARCH_ITEM}?searchKey=${key}`);
		console.log('data',response);
			if(response.data.status) {
				return response.data.list;
			} else {
				return []
			}
		}
	);
const initialState = {
	list:[],
	loader: false
}
const searchSlice  = createSlice({
	name: 'store/searh',
	initialState,
	reducers:{},
	extraReducers: builder => {
		builder.addCase(searchProduct.pending, (state, { payload }) => {
			state.loader = true
		})
		builder.addCase(searchProduct.fulfilled, (state, {payload} ) => {
			state.loader = false;
			state.list = payload;
		})
		builder.addCase(searchProduct.rejected, (state, { payload}) => {
			state.loader = false;
		})
	}
})
export default searchSlice.reducer;