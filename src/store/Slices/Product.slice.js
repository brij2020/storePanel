import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { API_BASE_URL, API_END_POINT } from '../../REST_API_END_POINT'

export const listAllProduct = createAsyncThunk(
	'electro/list-all-product',
	async (catObject) => {
		axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiX2lkIjoiNjI4OWU0MzVlNmU2YWMzMTg4N2EzYzVkIiwiaWF0IjoxNjY0MTIyNzYwLCJleHAiOjE2NjQ3Mjc1NjB9.ZWKskInvhqVTZ5dbLObs_HfAW2PKP47mwI0cTvZnz_8`
		const response = await axios.get(`${API_BASE_URL}/${API_END_POINT.GET_PRODUCTS}`);
		console.log('response',response)
			if(response.data.status) {
				return Object.assign({},response?.data,{status: true });
			} else {
				return []
			}
		}
	);
export const getProductDetail = createAsyncThunk(
	'electro/list-all-product',
	async (catObject) => {
		axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiX2lkIjoiNjI4OWU0MzVlNmU2YWMzMTg4N2EzYzVkIiwiaWF0IjoxNjY0MTIyNzYwLCJleHAiOjE2NjQ3Mjc1NjB9.ZWKskInvhqVTZ5dbLObs_HfAW2PKP47mwI0cTvZnz_8`
		const response = await axios.get(`${API_BASE_URL}/${API_END_POINT.GET_DETAIL_PRODUCT}/${catObject}`);
		console.log('response',response)
			if(response.data) {
				return Object.assign({},response?.data,{status: true });
			} else {
				return []
			}
		}
	);

const initialState = {
	data:[],
	loader: false
}
const allProductsSlice  = createSlice({
	name: 'electro/all-product',
	initialState,
	reducers:{},
	extraReducers: builder => {
		
		builder.addCase(listAllProduct.pending,(state,{payload}) => {
			state.loader = true;
		})

		builder.addCase(listAllProduct.fulfilled,(state,{payload}) => {
			state.loader = false;
			state.data = payload.products;
		})
		builder.addCase(listAllProduct.rejected,(state,{payload}) => {
			state.loader = false;
			state.data = payload;
		})
	}
})
const productDetailSlice  = createSlice({
	name: 'electro/detail-product',
	initialState,
	reducers:{},
	extraReducers: builder => {
		
		builder.addCase(getProductDetail.pending,(state,{payload}) => {
			state.loader = true;
		})

		builder.addCase(getProductDetail.fulfilled,(state,{payload}) => {
			
			state.loader = false;
			state.data = payload.product;
		})
		builder.addCase(getProductDetail.rejected,(state,{payload}) => {
			state.loader = false;
			state.data = payload;
		})
	}
})
const allProductSlice = allProductsSlice.reducer;
const productDetailReducer = productDetailSlice.reducer
export   { allProductSlice, productDetailReducer } 