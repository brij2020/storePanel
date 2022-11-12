// const API_BASE_URL = 'http://localhost:3001';
// const API_BASE_URL = 'https://store-pi.onrender.com'
// const API_BASE_URL = 'https://web-store-pan.herokuapp.com'
// const API_BASE_URL = 'http://localhost:8080'
// const API_BASE_URL = 'https://electro-backend.onrender.com'
const API_BASE_URL = 'https://ecom-electronic.onrender.com'
const API_KEY = '';
const API_END_POINT = {
	LOGIN:"users/login",
	GET_INVENTORY_LIST: 'store/store-list',
	UPDATE_INVENTORY: 'store/store-update',
	SEARCH_ITEM: 'store/store-search',
	GET_INVOICE: 'store/store-get-invoice',
	UPDATE_INVENTORYV2:'store/store-updatev2',
	CREATE_CATEGORY:'categories/add',
	GET_ALL_CATEGORY:'categories/list',
	GET_DETAIL_CATEGORY:'categories/',
	EDIT_CATEGORY:'categories/edit?_id',
	DELETE_CATEGORY:'categories/delete?_id',
	ADD_PRODUCT:'products/add',
	GET_PRODUCTS: 'products',
	GET_DETAIL_PRODUCT:'products',
	GET_ALL_SERVICES_REQUESTED:'api/request-service-list',
	CHANGE_SERVICE_REQUEST_STATUS:'api/change-equested-services-state'
}

module.exports = {
	API_BASE_URL,
	API_KEY,
	API_END_POINT
}
