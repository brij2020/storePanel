
import testReducer from './Slices/test.sample.slice';
import authReducer from './Slices/auth.slice';
import countReducer from './Slices/counter.slice';
import userReducer  from './Slices/login.slice'
import InventryReducer  from './Slices/Inventory.slice'
import  UpdateInventory from './Slices/updateInventory.slice'
import SearchReducer  from "./Slices/search.slice"
import getAllInvoiceReducer  from "./Slices/getInvoice.slice"
import getALlCategoryReducer  from "./Slices/categoryList.slice"
import CategoryDetailSlice  from "./Slices/categoryDetail.slice"
import updateCatgorySlice  from "./Slices/categoryDetail.slice"
import deleteCatgorySlice from "./Slices/categoryDelete.slice"
import { allProductSlice, productDetailReducer } from "./Slices/Product.slice";
import { serviceStatusChangeReducer, serviceListReducer} from "./Slices/Services.Slice";
const combinedReducers = {
	testReducer, 
	authReducer,
	countReducer,
	userReducer,
	InventryReducer,
	UpdateInventory,
	SearchReducer,
	getAllInvoiceReducer,
	getALlCategoryReducer,
	CategoryDetailSlice,
	updateCatgorySlice,
	deleteCatgorySlice,
	allProductSlice,
	productDetailReducer,
	serviceStatusChangeReducer,
	serviceListReducer
}

export default combinedReducers