import React,{ Suspense } from 'react';
import {  BrowserRouter,Routes,Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { createBrowserHistory } from 'history'
import { useSelector } from 'react-redux'
import  { authState } from './Hooks';

import Header from './Components/Header'
import LeftSideBar from './Components/LeftSideBar'
import RightSideBar from './Components/RightSideBar'
import Login from './Screens/Login'
import Loader from './Components/Loader'
import Home from './Screens/Dashboard'
import Inventry from './Screens/Inventry'
import ManageInventory from './Screens/ManageInventory';
import GenerateInvoice from './Screens/InvoiceGenerate';
import PrintInvoice from './Screens/PrintInvoice'
const TrackInvoice = React.lazy(() => import('./Screens/InvoiceTrack'))
const InvoiceManagment = React.lazy(() => import('./Screens/InvoiceManagment'))


const App = (props) => {
		const [ isLoggedIn, setLoggedIn] =  authState();
	return (<>	
		{
		isLoggedIn ? (
			<Suspense fallback={<>'Loader'</>}>
				<BrowserRouter history={createBrowserHistory()}>
					 <Header />
					 <LeftSideBar />
					 <RightSideBar />
					<Routes> 
						<Route exact ={ true } path='/' element={<Home />} />
						<Route exact={ true } path='/inventory' element={<Inventry />} />
						<Route exact={ true } path='/edit-inventory' element={<ManageInventory />} />
						<Route exact={ true } path='/generate-invoice' element={ <GenerateInvoice />} />
						<Route exact={ true } path='/print-invoice' element={ <PrintInvoice />} />
						<Route exact={ true } path='/track-invoice' element={ <TrackInvoice />} /> 
						<Route exact={ true } path='/sell-product' element={ <InvoiceManagment />} /> 
						//InvoiceManagment

					</Routes>
				</BrowserRouter>
				</Suspense>

			) : (
				<Login />
			)
		}
	</>)
}
export default App;
