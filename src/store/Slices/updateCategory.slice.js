import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'

export const updateCategory = createAsyncThunk(
	'electro/update-cat',
	async ({catObject,id}) => {
        console.log(catObject,id)
		const response = await axios.post(`${API_BASE_URL}/${API_END_POINT.EDIT_CATEGORY}=${id}`,catObject);
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
const updateCatgorySlice  = createSlice({
	name: 'electro/update-category',
	initialState,
	reducers:{},
	extraReducers: builder => {
		builder.addCase(updateCategory.pending, (state, { payload }) => {
			state.loader = true
		})
		builder.addCase(updateCategory.fulfilled, (state, {payload} ) => {
			state.loader = false;
			state.data = payload;
		})
		builder.addCase(updateCategory.rejected, (state, { payload}) => {
			state.loader = false;
		})
	}
})
export default updateCatgorySlice.reducer;