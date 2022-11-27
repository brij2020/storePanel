
import React,{ Suspense } from 'react';
import {  BrowserRouter as Router ,Routes,Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { createBrowserHistory } from 'history'
import { useSelector } from 'react-redux'
import  { authState } from '../Hooks';

import Header from '../Components/Header'
import LeftSideBar from '../Components/LeftSideBar'
import RightSideBar from '../Components/RightSideBar'
import Login from '../Screens/Login'
import Loader from '../Components/Loader'

import Inventry from '../Screens/Inventry'
import ManageInventory from '../Screens/ManageInventory';
import GenerateInvoice from '../Screens/InvoiceGenerate';
import PrintInvoice from '../Screens/PrintInvoice'
import TrackInvoice from '../Screens/InvoiceTrack'

const InvoiceManagment = React.lazy(() => import('../Screens/InvoiceManagment'));
const CategoryManagement  = React.lazy(() => import('../Screens/CategoryScreen'));
const CategoryList  = React.lazy(() => import('../Screens/CategoryListScreen'));
const ProductScreen = React.lazy(() => import('../Screens/ProductScreen'));
const ProductList = React.lazy(() => import('../Screens/ProductList'));
const Home = React.lazy(() => import('../Screens/Dashboard'));
const ServiceList = React.lazy(() => import('../Screens/ServicesListScreen'));
const OrderList = React.lazy(() => import('../Screens/OrderList'));
const ContactUsListScreen = React.lazy(() => import('../Screens/ContactUsListScreen'));


const CSR = (props) => {
		const [ isLoggedIn, setLoggedIn] =  authState();

	return (<>	
		{
		isLoggedIn ? (
			<Suspense fallback={ <Loader />}>
				<Router history={createBrowserHistory()}>
					 <Header />
					 <LeftSideBar />
					 <RightSideBar />
					<Routes> 
						<Route exact={ true } path='/inventory' element={<Inventry />} />
						<Route exact={ true } path='/category-list' element={<CategoryList />} />
						<Route exact={ true } path='/edit-inventory' element={<ManageInventory />} />
						<Route exact={ true } path='/generate-invoice' element={ <GenerateInvoice />} />
						<Route exact={ true } path='/print-invoice' element={ <PrintInvoice />} />
						<Route path='/track-invoice' element={ <TrackInvoice />} /> 
						<Route exact={ true } path='/sell-product' element={ <InvoiceManagment />} /> 
						<Route exact={ true } path="/category" element={<CategoryManagement />} />
						<Route exact={ true } path="/product-add" element={<ProductScreen />} />
						<Route exact={ true } path="/product-list" element={<ProductList />} />
						<Route exact={ true } path="/services" element={<ServiceList />} />
						<Route exact={ true } path="/booking" element={<ProductList />} />
						<Route exact={ true } path="/orders" element={<OrderList />} />
						<Route exact={ true } path="/contacts" element={<ContactUsListScreen />} />
						<Route exact ={ true } path='/dashboard' element={<Home />} />
					</Routes>
				</Router>
				</Suspense>

			) : (
				<Login />
			)
		}
	</>)
}
export default CSR;
