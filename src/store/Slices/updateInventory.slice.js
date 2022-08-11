import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT';

export const updateInventory = createAsyncThunk('store/updateInventory',
	async (data) => {
		console.log("api is v2 called ", data)
		if(typeof data.isV2 !== 'undefined' && data.isV2 ) {
			delete data.isV2;
			const response = await axios.post(`${API_BASE_URL}/${API_END_POINT.UPDATE_INVENTORYV2}`, data);
			return response;
		} else {
			const response = await axios.post(`${API_BASE_URL}/${API_END_POINT.UPDATE_INVENTORY}`, data);
			return response;	
		}
		
});

const initialState = {
	status: false,
	message:''
}
const updateInventorySlice = createSlice({
	name:'storeUpdate',
	initialState,
	reducers:{},
	extraReducers: (builder) => {
		builder.addCase(updateInventory.pending,(state,{ payload }) => {
			state.loader = true;
		})
		builder.addCase(updateInventory.fulfilled,(state,{ payload}) => {
			state.loader = false;
			state.message = 'Upload done successfully!'

		})
		builder.addCase(updateInventory.rejected,(state,{ payload }) => {
			state.loader = false;
			state.message = 'Upload failed!'


		})
	}
})
export default updateInventorySlice.reducer;