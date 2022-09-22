import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'
import { removeCategoryList } from './categoryList.slice'

export const deleteCategoryAction = createAsyncThunk(
	'electro/delete-cat',
	async ({id,list},{dispatch}) => {
       
		const response = await axios.post(`${API_BASE_URL}/${API_END_POINT.DELETE_CATEGORY}=${id}`);
		console.log('data',list);

			if(response.data.status) {
                dispatch(removeCategoryList({ list }))
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
const deleteCatgorySlice  = createSlice({
	name: 'electro/category-delete',
	initialState,
	reducers:{
    },
	extraReducers: builder => {
		builder.addCase(deleteCategoryAction.pending, (state, { payload }) => {
			state.loader = true
		})
		builder.addCase(deleteCategoryAction.fulfilled, (state, {payload} ) => {
			state.loader = false;
			state.data = payload;
		})
		builder.addCase(deleteCategoryAction.rejected, (state, { payload}) => {
			state.loader = false;
		})
	}
})
export default deleteCatgorySlice.reducer;