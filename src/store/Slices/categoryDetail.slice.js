import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'

// create async thunk later in use.
export const getCategoryDetail = createAsyncThunk(
	'store/categoryDetail',
	async (id) => {
		const response = await axios.get(`${API_BASE_URL}/${API_END_POINT.GET_DETAIL_CATEGORY}${id}`);
		if(response.status === 200 && response.data.status) {
			return ({ detail: response.data.detail})
		} else {
			return []
		}
		
});
const initialState = {
	detail:{},
	loader: false
}
const CategoryDetailSlice = createSlice({
	name: 'categorydetail',
	initialState,
	reducers:{ },
	extraReducers: (builder) => {
		builder.addCase(getCategoryDetail.pending,(state, { payload}) => {
			state.loader = false;
		})	
		builder.addCase(getCategoryDetail.fulfilled,(state,{ payload}) => {
			state.loader = true;

			state.detail = payload?.detail
		})
		builder.addCase(getCategoryDetail.rejected, (state,{ payload}) => {
			state.loader = false;

		})
	}
})
export default CategoryDetailSlice.reducer;
