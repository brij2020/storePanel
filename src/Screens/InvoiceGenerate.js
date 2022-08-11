import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { searchProduct } from '../store/Slices/search.slice'
import { useDispatch, useSelector } from 'react-redux';
const GenerateInvoice = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch()
	let invoice = new Map();
	const products = useSelector(s => s.SearchReducer.list) ?? [];
	const [invoiceList, SetinvoiceList] = useState([{ id :'' ,count: 0}]);
	const [ cart, setCart ] = useState([])
	

	React.useEffect(() => {
		dispatch(searchProduct(''))
		.then(res => console.log(''))
		.catch(e=> console.log(e))

	},[]) 



	const addProduct = p => {
			
			if(cart.find(pr => pr.id === p.ProductSK)) {
			setCart(invoiceList.map( prod => prod.id === p.ProductSK ? Object.assign({}, prod, { count: prod.count}) : prod  ))

			} else {
				setCart([...cart,invoiceList.find(pr => pr.id === p.ProductSK)])

			}
	}
	const handleProductQuantity = (e,pro) => {
		const itemCount = e.target.value;
		const cart = { id :pro.ProductSK ,count: itemCount};
	
		if(invoiceList.find(ipro => ipro.id === pro.ProductSK)) {
			SetinvoiceList(invoiceList.map( prod => prod.id === pro.ProductSK ? Object.assign({}, prod, { count: itemCount}) : prod  ))
		} else {
			SetinvoiceList([...invoiceList,Object.assign({},cart,pro)])
		}
		

	}
	const generateInvoice = () => {
		localStorage.setItem('toPrintproducts', JSON.stringify(invoiceList.slice(1,invoiceList.length+2)));
		navigate('/print-invoice',)
		console.log(`products`)
	}
	console.log('pro=int', cart, invoiceList)

	return(<>
			<div class="mobile-menu-overlay"></div>

		<div class="main-container">
		<div class="pd-ltr-20 xs-pd-20-10">
			<div class="min-height-200px">
				<div class="page-header">
					<div class="row">
						<div class="col-md-12 col-sm-12">
							<div class="title">
								<h4>Search product to generate Invoice from search box above</h4>
							</div>
							<nav aria-label="breadcrumb" role="navigation">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="index.html">Home</a></li>
									<li class="breadcrumb-item active" aria-current="page">Generate-Invoice</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>

				<div class="container px-0">
					<h4 class="mb-30 text-blue h4">Add product for sell and generate Invoice </h4> 
					<div class="btn-list">
						<button type="button" class="btn btn-success btn-lg btn-block" onClick={ generateInvoice }>Generate Invoice</button>
					
					</div>
					
					<div class="row">
						{
							products && products.map((product,indeX) => {
								return (
								<div class="col-md-4 mb-30">
									<div class="card-box pricing-card mt-30 mb-30">
										<div class="pricing-icon">
											<input type="number" 
											onChange= { e => handleProductQuantity(e,product)  }
											style={{
												    "text-align": "center",
												    fontWeight: 700,
												    height: "70px",
												    width: "80px",
												    marginTop: "-35%",
												    borderRadius: "9px",
												    border: "none",
												    boxShadow: 'rgb(0 0 0 / 16%) 0px 10px 36px 0px, rgb(0 0 0 / 6%) 0px 0px 0px 1px'
											}} />
										</div>
										<div class="price-title">
											{ product?.ProductDescription }
										</div>
										<div class="pricing-price">
										<sub><img src="https://img.icons8.com/glyph-neue/64/000000/rupee.png"/></sub>
											{parseFloat(product?.Rate).toFixed(2) }<sub>/{product?.per}pcs.</sub>
										</div>
										{/*<div class="text">
											Card servicing<br /> for 6month
										</div>*/}
										<div class="cta" style={{display:"none"}}>
											<a href="#" class="btn btn-primary btn-rounded btn-lg" onClick={ e => addProduct(product)  }>Add</a>
										</div>
									</div>
								</div>)
							})
						}
						
						{/* <div class="col-md-4 mb-30">
							<div class="card-box pricing-card mt-30 mb-30">
								<div class="pricing-icon">
									<img src="vendors/images/icon-debit.png" alt="" />
								</div>
								<div class="price-title">
									expert
								</div>
								<div class="pricing-price">
									<sup>$</sup>199<sub>/mo</sub>
								</div>
								<div class="text">
									Card servicing<br /> for 6month
								</div>
								<div class="cta">
									<a href="#" class="btn btn-primary btn-rounded btn-lg">Add</a>
								</div>
							</div>
						</div>
						<div class="col-md-4 mb-30">
							<div class="card-box pricing-card mt-30 mb-30">
								<div class="pricing-icon">
									<img src="vendors/images/icon-online-wallet.png" alt="" />
								</div>
								<div class="price-title">
									experience
								</div>
								<div class="pricing-price">
									<sup>$</sup>599<sub>/yr</sub>
								</div>
								<div class="text">
									Card servicing<br /> for 1year
								</div>
								<div class="cta">
									<a href="#" class="btn btn-primary btn-rounded btn-lg">Add</a>
								</div>
							</div>
						</div>
						<div class="col-md-4 mb-30">
							<div class="card-box pricing-card mt-30 mb-30">
								<div class="pricing-icon">
									<img src="vendors/images/icon-online-wallet.png" alt="" />
								</div>
								<div class="price-title">
									experience
								</div>
								<div class="pricing-price">
									<sup>$</sup>599<sub>/yr</sub>
								</div>
								<div class="text">
									Card servicing<br /> for 1year
								</div>
								<div class="cta">
									<a href="#" class="btn btn-primary btn-rounded btn-lg">Add</a>
								</div>
							</div>
						</div> */}
					</div>
				</div>
				
			</div>
		</div>
	</div>
		</>)
}
export default GenerateInvoice