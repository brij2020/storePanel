import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'

// create async thunk later in use.
export const getAllInventory = createAsyncThunk(
	'store/invetory',
	async () => {
		const response = await axios.get(`${API_BASE_URL}/${API_END_POINT.GET_INVENTORY_LIST}`);
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
const InventorySlice = createSlice({
	name: 'inventoryList',
	initialState,
	reducers:{ },
	extraReducers: (builder) => {
		builder.addCase(getAllInventory.pending,(state, { payload}) => {
			state.loader = false;
		})	
		builder.addCase(getAllInventory.fulfilled,(state,{ payload}) => {
			state.loader = true;
			console.log('ttest is here',payload)
			state.list = payload?.list
		})
		builder.addCase(getAllInventory.rejected, (state,{ payload}) => {
			state.loader = false;

		})
	}
})
export default InventorySlice.reducer;
