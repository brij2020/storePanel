// const API_BASE_URL = 'http://localhost:3001';
const API_BASE_URL = 'https://store-pi.onrender.com'
const API_KEY = '';
const API_END_POINT = {
	LOGIN:"users/login",
	GET_INVENTORY_LIST: 'store/store-list',
	UPDATE_INVENTORY: 'store/store-update',
	SEARCH_ITEM: 'store/store-search',
	GET_INVOICE: 'store/store-get-invoice',
	UPDATE_INVENTORYV2:'store/store-updatev2'
}

module.exports = {
	API_BASE_URL,
	API_KEY,
	API_END_POINT
}