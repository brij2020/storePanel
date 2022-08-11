import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT';

export const getAllInvoices =  createAsyncThunk(
	'allinvoice',
	async () => {
		const dataResponse  = await axios(`${API_BASE_URL}/${API_END_POINT.GET_INVOICE}`)
		if(dataResponse.data.status) {
			return dataResponse.data.list
		} else {
			return []
		}
	})
const initialState = {
	list:[],
	status: false,
	loader: false

}	
const getInvoiceList = createSlice({
	name:"getInvoice",
	initialState,
	reducers:{},
	extraReducers: (builder) => {
		builder.addCase(getAllInvoices.pending,(state,{ payload}) => {
			loader: true
		})
		builder.addCase(getAllInvoices.fulfilled,(state,{ payload}) => {
			state.list = payload;
			loader: false
		})
		builder.addCase(getAllInvoices.rejected,(state,{ payload}) => {
			loader: false
		})
	}
})
export  default getInvoiceList.reducer