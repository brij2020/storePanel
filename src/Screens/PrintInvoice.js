import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { searchProduct } from '../store/Slices/search.slice';
import { getAllInvoices } from '../store/Slices/getInvoice.slice';



import { useDispatch, useSelector } from 'react-redux';
const PrintInvoice = (props) => {

	let toPrintProducts = [];

	let grantTotal = 0;
	let soldUnit = 0;
	const navigate = useNavigate()
	const dispatch =  useDispatch()
	const [ customerName, setCustomerName ] = useState('');
	const [ updateInventory, setUpdateInventroy ] = useState(false);
	const [ mobile, setMobile ] = useState('');
	const [address, setAddress] =  useState('')

	const calculateSubTotal = (rate,unite,gst) => {
		let pricipaleAmt = parseFloat(rate * unite);
		let gstAdded = (pricipaleAmt*gst) /100;
		const t = parseFloat(pricipaleAmt + gstAdded).toFixed(2)
		return t;
	}
	
	
	if(localStorage && localStorage.getItem('toPrintproducts')) {
		let toProuctPrint = 
		toPrintProducts = JSON.parse(localStorage.getItem('toPrintproducts'));
		soldUnit = toProuctPrint.reduce((acc,item) => +item.count + acc,0)
		grantTotal =  toProuctPrint.reduce((acc,item) => acc + parseFloat(calculateSubTotal(item.Rate,item.count,item.GST_Rate)),0)
		console.log('grantTotal', grantTotal)
	}
	 const printInvoiceDoc = () => {
	 	const  invoiceList = { 
	 	products: toPrintProducts,
	 	list:[
	 	{ "InvoiceId": '',
		"CunsumerName": customerName,	
		"CunsumerMobile": mobile,
		"CunsumerAdd": address,	
		"UniteSold":soldUnit,	
		"TotalAmountPaid": grantTotal,
		"Status": "pending"
		}]}
	//  	let printDiv = document.getElementById('invoice-print').innerHTML;
	//  	let originalContent = document.body.innerHTML;
	//  	document.body.innerHTML = printDiv;
	//  	document.title = `${customerName}-${new Date()}`;
	//  	document.getElementById('print-invoce').style.opacity = -1
	//  	setUpdateInventroy(true);
	//  	const  invoiceList = { 
	//  	products: toPrintProducts,
	//  	list:[
	//  	{ "InvoiceId": '',
	// 	"CunsumerName": customerName,	
	// 	"CunsumerMobile": mobile,
	// 	"CunsumerAdd": address,	
	// 	"UniteSold":soldUnit,	
	// 	"TotalAmountPaid": grantTotal,
	// 	"Status": "pending"
	// 	}]
	// }
	 	window.print();
	 	 navigate(`/track-invoice?invoiceinfo=${btoa(JSON.stringify(invoiceList))}`)
	  	// useNavigate(`/track-invoice?invoiceinfo=${btoa(invoiceList)}`)

	 	//document.body.innerHTML = originalContent;
	 	

	 	
	 }
	//console.log('GST_Rate', grantTotal)
	return(<>
			<div class="mobile-menu-overlay"></div>

			<div class="main-container">
			<div class="pd-ltr-20 xs-pd-20-10">
				<div class="min-height-200px">
					<div class="page-header">
						<div class="row">
							<div class="col-md-6 col-sm-12">
								<div class="title">
									<h4>Form</h4>
								</div>
								<nav aria-label="breadcrumb" role="navigation">
									<ol class="breadcrumb">
										<li class="breadcrumb-item"><a href="index.html">Home</a></li>
										<li class="breadcrumb-item active" aria-current="page">Form</li>
									</ol>
								</nav>
							</div>
							<div class="col-md-6 col-sm-12 text-right">

							
								<div class="dropdown">
									<a class="btn btn-primary dropdown-toggle" href="#" role="button" data-toggle="dropdown">
										January 2018
									</a>
									<div class="dropdown-menu dropdown-menu-right">
										<a class="dropdown-item" href="#">Export List</a>
										<a class="dropdown-item" href="#">Policies</a>
										<a class="dropdown-item" href="#">View Assets</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="invoice-wrap" id="invoice-print">
						<div class="invoice-box">
							<div class="invoice-header">
								<div class="logo text-center">
									<img src="vendors/images/deskapp-logo.png" alt="" />
								</div>
							</div>
							<h4 class="text-center mb-30 weight-600">INVOICE</h4>
							<div id="print-invoce" style={{
								fontSize: "45px",
							    position: "absolute",
							    left: "77%",
							    top: "38%",
							    color: "#100f0f",
							    zIndex: 2,
							    cursor: "pointer"

							}}>
								{ !updateInventory ? <i class="icon-copy fi-print" style={{position:"fixed"}} onClick ={ printInvoiceDoc }></i> : (
									<button type="button" class="btn btn-success">update inventory</button>)}
							</div>
							<div class="row pb-30">
								<div class="col-md-6">
									<h5 class="mb-15">Client Name</h5>
									<p class="font-14 mb-5">Date Issued: <strong class="weight-600">{ (new Date()).toLocaleDateString() }</strong></p>
									<p class="font-14 mb-5">Invoice No: <strong class="weight-600">4556</strong></p>
								</div>
								<div class="col-md-6">
									<div class="text-right">
										<p class="font-14 mb-5"> <input type="text" placeholder="consumer name" className="invoice-in" onChange={ e => setCustomerName(e.target.value)} /> </p>
										<p class="font-14 mb-5">
										<input type="text" placeholder="consumer address" className="invoice-in"  onChange={e => setAddress(e.target.value) }/>
										</p>
										<p class="font-14 mb-5"><input type="text" placeholder="consumer mobile" className="invoice-in" onChange={e => setMobile(e.target.value)} /></p>
										
									</div>
								</div>
							</div>
							<div class="invoice-desc pb-30">
								<div class="invoice-desc-head clearfix">
									<div class="invoice-sub" style={{width: "30%"}}>Product Description</div>
									<div class="invoice-rate">Rate(per pcs.)</div>
									<div class="invoice-hours" style={{width: "15%"}}>Units</div>
									<div class="invoice-gst" style={{width: "15%"}}>GTS(%)</div>
									<div class="invoice-subtotal" style={{width: "17%"}}>Subtotal</div>
								</div>
								<div class="invoice-desc-body">
									<ul>
									{ toPrintProducts && Array.isArray(toPrintProducts) ? toPrintProducts.map(pri => { return (
										<li class="clearfix" key={pri?.id}>
											<div class="invoice-sub" style={{width: "35%"}}>{pri['ProductDescription']}</div>
											<div class="invoice-rate" style={{width: "15%"}} >{ pri['Rate']}</div>
											<div class="invoice-hours" style={{width: "15%"}}>{ pri['count']}</div>
											<div class="invoice-gst" style={{width: "15%"}}>{ pri['GST_Rate']}</div>
											<div class="invoice-subtotal" style={{width: "15%"}}><span class="weight-600">{ calculateSubTotal(pri['Rate'],pri['count'],pri['GST_Rate'])}</span></div>
										</li>
										)
									 }) : null
									}
										
										
									</ul>
								</div>
								<div class="invoice-desc-footer">
									<div class="invoice-desc-head clearfix">
										<div class="invoice-sub">Customer Name</div>
										<div class="invoice-rate">Paid on</div>
										<div class="invoice-subtotal">Total </div>
									</div>
									<div class="invoice-desc-body">
										<ul>
											<li class="clearfix">
												<div class="invoice-sub">
													<p class="font-14 mb-5">ABCV</p>
													<p class="font-14 mb-5"></p>
												</div>
												<div class="invoice-rate font-20 weight-600"> { (new Date()).toLocaleDateString() } </div>
												<div class="invoice-subtotal"><span class="weight-600 font-24 " style={{
													color:"#100f0f"
												}}>Rs. {parseFloat(grantTotal).toFixed(2)}</span></div>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<h4 class="text-center pb-20">Thank You!!</h4>
						</div>
					</div>
				</div>
				
			</div>
		</div>
		</>)
}
export default PrintInvoice;
