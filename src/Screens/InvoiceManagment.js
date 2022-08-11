import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllInvoices } from '../store/Slices/getInvoice.slice';
import { updateInventory }  from '../store/Slices/updateInventory.slice'
import { useQuery } from '../Hooks'
import Table from '../Components/Table'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const InvoiceManage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const list = useSelector(s => s.getAllInvoiceReducer.list)
	React.useEffect(() => {
		dispatch(getAllInvoices())
	},[]) 

	const tableHeader = [
		"InvoiceId",
		"CunsumerName",	
		"CunsumerMobile",	
		"Sold Unite",	
		"Total Amount Paid",
		"Amount",
		"Status"];
	const render = () => list && Array.isArray(list) ? [...list].map((td,indX) => {

		return (<tr key={ td?.InvoiceId + indX } class={`${ indX%2 === 0 ? 'table-primary' : 'table-active'}`}>
				<th scope="row">{ indX + 1 }</th>
				<td>{ td?.InvoceID }</td>
				<td>{ td?.ConsumerName }</td>
				<td>{ td?.ConsumerMobile }</td>
				<td>{ td?.CunsumerAdd }</td>
				<td>{ td?.UniteSold }</td>
				<td>{ parseFloat(td['TotalAmountPaid']).toFixed(2) }</td>
				 <td ><span class="badge badge-success" style={{cursor:'pointer'}} >{ td['Status'] }</span></td>
				<td>{ td['Amount'] }</td>
			</tr>)
		}) : null
	
	
	return <div class="main-container"><Table header={ tableHeader } render = {render}/></div>
}
export default InvoiceManage