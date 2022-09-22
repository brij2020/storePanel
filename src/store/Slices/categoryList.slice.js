import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'


// create async thunk later in use.
export const getAllCategory = createAsyncThunk(
	'store/category',
	async () => {
		const response = await axios.get(`${API_BASE_URL}/${API_END_POINT.GET_ALL_CATEGORY}`);
		if(response.status === 200 && response.data.status) {
			return ({ list: response.data.list})
		} else {
			return []
		}
		
});
const initialState = {
	list:[],
	loader: false
}
const CategoryListSlice = createSlice({
	name: 'categoryList',
	initialState,
	reducers:{ 
		removeCategoryList: (state,{payload:list}) => {
			console.log('reducer loist',list)
			state.list = list.list
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getAllCategory.pending,(state, { payload}) => {
			state.loader = false;
		})	
		builder.addCase(getAllCategory.fulfilled,(state,{ payload}) => {
			state.loader = true;

			state.list = payload?.list
		})
		builder.addCase(getAllCategory.rejected, (state,{ payload}) => {
			state.loader = false;

		})
	}
})
export const { removeCategoryList } = CategoryListSlice.actions;
export default CategoryListSlice.reducer;
