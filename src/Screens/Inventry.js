import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllInventory } from '../store/Slices/Inventory.slice'

import Table from '../Components/Table'
const Inventry  = () => {
	const dispatch = useDispatch();
	const list = useSelector(s => s.InventryReducer.list)
	useEffect(() => {
		dispatch(getAllInventory())
	},[])
	const tableHeader = [	
		"ProductID",
		"ProductDescription",	
		"Quantity",	
		"Rate",	
		"GST_Rate(%)",	
		"per",	
		"Discount(%)",	
		"Amount"	]
	const tableUI = () => list && Array.isArray(list) ? list.map((td,indX) => {
		return (<tr key={ td.ProductSK+indX}class={`${ indX%2 === 0 ? 'table-primary' : 'table-active'}`}>
			<th scope="row">{ indX+1 }</th>
			<td>{td?.ProductSK}</td>
			<td>{td?.ProductDescription}</td>
			<td>{td?.Quantity}</td>
			<td>{td?.Rate}</td>
			<td>{td['GST_Rate']}</td>
			<td>{td['per']}</td>
			<td>{td['Discount']}</td>
			<td>{td['Amount']}</td>
		</tr>)
		}) : null
	return <div class="main-container"><Table header={ tableHeader } render = {tableUI}/></div>
}
export default Inventry