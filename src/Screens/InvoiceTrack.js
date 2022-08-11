import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllInvoices } from '../store/Slices/getInvoice.slice';
import { updateInventory }  from '../store/Slices/updateInventory.slice'
import { useQuery } from '../Hooks'
import Table from '../Components/Table'
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../REST_API_END_POINT';

import axios from 'axios'
const InvoiceTrack  = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const list = useSelector(s => s.getAllInvoiceReducer.list)
	
	const query = useQuery()
	const keyP = query.get('invoiceinfo')
	const invoiveOb =  JSON.parse(atob(keyP));
	React.useEffect(() => {
		dispatch(getAllInvoices())
	},[]) 
	const handleChangeStatus = () => {
	
		const serverData =  invoiveOb.products.map(p => {  
			let sellAmount = parseInt(p.count) * parseFloat(p.Rate);
			let gst = (sellAmount * p['GST_Rate']) / 100
			delete p.id;
			p['Quantity'] = parseInt(p['Quantity']) - parseInt(p.count);
			p['Amount'] = parseFloat(parseFloat(p['Amount']) - (parseFloat(sellAmount) + parseFloat(gst))).toFixed(2)
			delete p.count
			return p 
			 })
	
		let serverDataX = { data: serverData, isV2: true};
		dispatch(updateInventory(serverDataX))
		.then(response => {
			
			axios.post(`${API_BASE_URL}/store/store-update-invoice`,{ invoiceData: invoiveOb.list })
			.then(res => {console.log('updated');
				navigate('/inventory')
			})
			.catch(er => console.log(er))
		})
		.catch()
	}

	const tableHeader = [
		"InvoiceId",
		"CunsumerName",	
		"CunsumerMobile",	
		"Sold Unite",	
		"Total Amount Paid",
		"Amount",
		"Status"];
	const render = () => list && Array.isArray(list) ? [...invoiveOb.list,...list].map((td,indX) => {

		return (<tr key={ td?.InvoiceId + indX } class={`${ indX%2 === 0 ? 'table-primary' : 'table-active'}`}>
				<th scope="row">{ indX + 1 }</th>
				<td>{ td?.InvoceID }</td>
				<td>{ td?.CunsumerName }</td>
				<td>{ td?.CunsumerMobile }</td>
				<td>{ td?.CunsumerAdd }</td>
				<td>{ td?.UniteSold }</td>
				<td>{ parseFloat(td['TotalAmountPaid']).toFixed(2) }</td>
				 <td ><span class="badge badge-success" style={{cursor:'pointer'}} onClick={e => handleChangeStatus(td)} >{ td['Status'] }</span></td>
				<td>{ td['Amount'] }</td>
			</tr>)
		}) : null
	
	
	return <div class="main-container"><Table header={ tableHeader } render = {render}/></div>
}
export default InvoiceTrack