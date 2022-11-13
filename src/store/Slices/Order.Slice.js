import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'

 export const fetchAllOrdersRequest = createAsyncThunk(
 	'get-list-allorders-request',
 	async({ pageno=1, perpage=10}={ pageno: 1,perpage: 10}) => {
		try {
			const response = await axios.get(`${API_BASE_URL}/${API_END_POINT.GET_ALL_PRODUCTS}?perpage=${perpage}&pageno=${pageno}`);

			if(response && response.data && response.data.status) {
				return JSON.stringify(response)
			} else {
				return response
			}
		} catch(e) {
			return ({ data: { status: false, msg:" please try again " }})
		}
		 
})
let initialState = {
	loader: false,
	list: []
}

const OrdersListSlice = createSlice({
	name: 'all-orders-request',
	initialState,
	reducers:{

	},
	extraReducers: builder => {
		builder
		.addCase(fetchAllOrdersRequest.pending, (state,{ payload}) => {
			state.loader = true;
			
		})
		builder
		.addCase(fetchAllOrdersRequest.fulfilled, (state,{payload})=> {
			state.loader = false;
			state.list = JSON.parse(payload).data.list;
			state.pages = JSON.parse(payload).data.page
		})
		builder
		.addCase(fetchAllOrdersRequest.rejected, (state,{payload})=> {
			state.loader = false;
			state.list = initialState.list
		})

	}
})


 export const changeServicesStatus = createAsyncThunk(
 	'change-service-request-state',
 	 async(data) => {
		try {
			const response = await axios.post(`${API_BASE_URL}/${API_END_POINT.CHANGE_SERVICE_REQUEST_STATUS}`,data);
			if(response && response.data && response.data.status) {
				return response
			} else {
				return response
			}
		} catch(e) {
			return ({ data: { status: false, msg:" please try again " }})
		}
		 
})
 initialState = {
	loader: false,
	data: {}
}

const ServiceStateSlice = createSlice({
	name: 'service-status-change-request',
	initialState,
	reducers:{

	},
	extraReducers: builder => {
		builder
		.addCase(changeServicesStatus.pending, (state,{ payload}) => {
			state.loader = true;
			
		})
		builder
		.addCase(changeServicesStatus.fulfilled, (state,{payload})=> {
			state.loader = false;
			state.data = payload.data.data
		})
		builder
		.addCase(changeServicesStatus.rejected, (state,{payload})=> {
			state.loader = false;
			state.data = initialState.data
		})

	}
})






// const serviceStatusChangeReducer =  OrdersListSlice.reducer
const ordersListReducer =  OrdersListSlice.reducer
export {  ordersListReducer }