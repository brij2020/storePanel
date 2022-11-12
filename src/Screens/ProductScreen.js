import React, { useEffect, useState, useRef } from 'react';
import DefaultContainer from '../Components/DefaultContainer'
import { createProduct }  from '../store/Slices/productCreate.slice'
import { updateCategory } from '../store/Slices/updateCategory.slice'
import { getCategoryDetail } from '../store/Slices/categoryDetail.slice'
import { getProductDetail } from '../store/Slices/Product.slice';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllCategory } from '../store/Slices/categoryList.slice' 
import Modal from '../Components/SuccessModal'
import AlertModal from '../Components/AlertModal'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]



const Product = () => {
	const location = useLocation();
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [selectedCategoryList, setCategoryList ] = useState([]);
	const [selectedOption, setSelectedOption] = useState('');

	let queryParams = new URLSearchParams(location.search);
	let catID =  queryParams.get('edit-id');
	let isDetailPage =  queryParams.get('Add Product');

	const list = useSelector(s => s.getALlCategoryReducer.list);
	let detail = useSelector(s => s.productDetailReducer.data);
	
	const  naviGate = useNavigate()
	const navigation = [{id:"23",title:"Home", link:'/'},{id:"231",title:"Category", link:'/category'}];
	const dispatch = useDispatch()
	
	useEffect(() => {
		if(typeof list !== 'undefined' && Array.isArray(list) && list.length > 0) {
			 setCategoryOptions(list.map( op_ => ({ label: op_.name, value: op_._id}) ))

		}
	},[list])

	
	React.useEffect(() => {
		dispatch(getAllCategory())
	},[])
	if(typeof list !== 'undefined'  && Array.isArray(list) && list.length > 0 && typeof catID !== 'undefined') {
		// detail = list.find(_ => _._id === catID);
	} 
	

	useEffect(() => {
		if(typeof list !== 'undefined'  && Array.isArray(list) && list.length === 0 && typeof catID !== 'undefined') {
			dispatch(getProductDetail(catID))
		}
	},[]);
	if(catID === undefined) {
		detail = {}

	}

	const formUI = () => {

		const [categoryAttribute, setAttribute ]  = React.useState({name:'',brand:''});
		const [image, setImage] = useState('');
		const [brand, setBrand] = useState([]);
		const [isOpen, setOpen] = useState(false);
		const [alertError, setAlertError] = useState(false)
		const [buttonText, setButtonText] = React.useState('Add Product');
		const [ msg, setMsg ] = useState('')
		const myRef = useRef('')
		useEffect(() => {
			if(detail && Object.keys(detail).length > 0 ) {
				let keys = Object.keys(detail);
				let formObj = {};
				keys.map(key => {
					if(Array.isArray(detail[key])) {
						formObj[key] = detail[key].join(',')
					} else {
						formObj[key] = detail[key]
					}
				})
				setButtonText('Update Category')
				setAttribute(formObj)
				if(list && Array.isArray(list)) {
					const matchedCat = list.find( _ => _._id === detail.parentCategory);
					console.log("detail",matchedCat);
					setCategoryList(matchedCat)
					setSelectedOption({ value:matchedCat._id,label: matchedCat.name})
				}
				
			} else {
				setAttribute({})
			}
			
		},[detail])
		

		const handleChange = (ev,eve) => {
			setBrand(ev)
			let obj = {};
			console.log(ev,'tetstvalue')
			obj = { ...categoryAttribute,...{[`${eve.name}`]: ev.map(_ => _.value)  }}
			
			setAttribute(obj)

		}
		const handleChangeText = ({target:{ name, value}}) => {
			let obj = {};
			obj = { ...categoryAttribute,...{[`${name}`]:value }}
			setAttribute(obj)
		}
		const handleSubmitButton = async e => {
			e.preventDefault();

			if(typeof catID !== 'undefined' && catID !== null) {
				const p = await dispatch(updateCategory({catObject:categoryAttribute,id:catID}));
				if(typeof p.payload !== 'undefined' && p.payload.status) {
					naviGate('/category-list')
				} else {

				}
				return
			}
			if(  selectedCategoryList && selectedCategoryList._id ) {
				categoryAttribute['image'] = image;
				categoryAttribute['parentCategory'] = selectedCategoryList._id 
			}
			let formData = new FormData();
			
			for( const key in categoryAttribute) {

				formData.append(key, Array.isArray(categoryAttribute[key]) ? JSON.stringify(categoryAttribute[key]):categoryAttribute[key]) 
			}
			try {
				const response = await dispatch(createProduct(formData));
				console.log('product screen', response)
				if(response?.payload?.status) {
					setOpen(true)
				} else {
					setAlertError(true);
					setMsg(response.error.message)
				}
			} catch(e){
				setAlertError(false)
				setMsg('please try again')
			}
			

		}
		const handleListPage = () => {
			naviGate('/category-list')
		}
		
		const handleCategoryChange = ({ value,label}) => {

			setSelectedOption({ value,label})

			if( Array.isArray(list)) {
				const objectSelected = list.find(_ => _._id === value );
				setCategoryList(objectSelected)
			} 
			return true
			
		}
		
		const customStyles = {
			  option: (provided, state) => ({
			    ...provided,
			    borderBottom: '1px dotted pink',
			    color: state.isSelected ? 'red' : 'blue',
			    padding: 20,
			  }),
			  input:  (provided, state) => ({
			    ...provided,
			    margin: 10,
			  }),

			  
			}
		const handleImage = fileEvent => {
			// console.log('file event ', fileEvent)
			const FILE_REGX = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
			const { type } = fileEvent.target.files[0] ?? undefined ;
			if( typeof type !== 'undefined' ) {
				let fileExtension =  '.' + (type.split('/').pop());
				console.log('fileExtension', fileExtension)
				if(FILE_REGX.test(fileExtension)) {
					setImage(fileEvent.target.files[0])
				} else {
					alert('File format not allowed')
				}
			}
			console.log('file type', type)
		}

		 const changeModalState = async (deleteOrNot) => {
        setOpen(!isOpen);
        setAttribute({name:'',brand:''});
        setMsg('');
    }
    const changeModalStateAlert = () => {
    	setAlertError(false);
    	setMsg('')
    }
		return (
			<>

			<form>
			
				<div className="row">
				
					<div className="col-md-6 col-sm-12">
							<label>Select Category</label>
							<Select options={categoryOptions} value={selectedOption} isMulti={ false }  onChange={ handleCategoryChange }  style={customStyles}/>
						
						</div>
							<div className="col-md-6 col-sm-12">
								<label>Brand Name</label>
								<Select options={  selectedCategoryList['brand'] && selectedCategoryList['brand'].map(_ => ({ value: _, label: _ })) } isMulti={ true }  name="brand" onChange={handleChange} />
								
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<label>Select Product Type</label>
								
								<Select options={  selectedCategoryList['ptype'] && selectedCategoryList['ptype'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="ptype" onChange={handleChange} />
									
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Series</label>
									<Select options={  selectedCategoryList['series'] && selectedCategoryList['series'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="series" onChange={handleChange}/>

								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Chipset</label> 
									
									<Select options={  selectedCategoryList['chipset'] && selectedCategoryList['chipset'].map(_ => ({ value: _, label: _ })) } isMulti={ true }  onChange={handleChange}/>

								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Generation</label>
									<Select options={  selectedCategoryList['generation'] && selectedCategoryList['generation'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="generation" onChange={handleChange} />

								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Socket Type</label>
									<Select options={  selectedCategoryList['socketType'] && selectedCategoryList['socketType'].map(_ => ({ value: _, label: _ })) } isMulti={ true }  name="socketType" onChange={handleChange}/>
								</div>
							</div>

							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Screen Size</label>
									<Select options={  selectedCategoryList['screenSize'] && selectedCategoryList['screenSize'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="screenSize"  onChange={handleChange}/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Memory Supprot</label>
									<Select options={  selectedCategoryList['memorySupprot'] && selectedCategoryList['memorySupprot'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="memorySupprot" onChange={handleChange}/>
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Memory Type</label>
									<Select options={  selectedCategoryList['memoryType'] && selectedCategoryList['memoryType'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="memoryType" onChange={handleChange}/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Speed</label>
									 <Select options={  selectedCategoryList['speed'] && selectedCategoryList['speed'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="speed" onChange={handleChange}/>

								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Memory Capacity </label>
									 <Select options={  selectedCategoryList['capacity'] && selectedCategoryList['capacity'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="capacity" onChange={handleChange}/>

								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Form Factor</label>

									<Select options={  selectedCategoryList['formFactor'] && selectedCategoryList['formFactor'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="formFactor" onChange={handleChange} />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Rpm</label>
									<Select options={  selectedCategoryList['rpm'] && selectedCategoryList['rpm'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="rpm" onChange={handleChange} />

								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Watts</label>
									<Select options={  selectedCategoryList['watts'] && selectedCategoryList['watts'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="watts" onChange={handleChange} />

								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Voltage Range</label>
									<Select options={  selectedCategoryList['voltageRange'] && selectedCategoryList['voltageRange'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="voltageRange" onChange={handleChange}/>

								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Tracking Method</label>
									<Select options={  selectedCategoryList['trackinMethod'] && selectedCategoryList['trackinMethod'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="trackinMethod" onChange={handleChange}/>

								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Resolution</label>
									<Select options={  selectedCategoryList['resolution'] && selectedCategoryList['resolution'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="resolution" onChange={handleChange}/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Color</label>
									<Select options={  selectedCategoryList['color'] && selectedCategoryList['color'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="color" onChange={handleChange}/>

								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Style</label>
									<Select options={  selectedCategoryList['style'] && selectedCategoryList['style'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="style" onChange={handleChange}/>

								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Refresh Rate</label>
									<Select options={  selectedCategoryList['refreshRate'] && selectedCategoryList['refreshRate'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="refreshRate" onChange={handleChange}/>
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Channel</label>
									<Select options={  selectedCategoryList['channel'] && selectedCategoryList['channel'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="channel" onChange={handleChange}/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
									<div className="form-group">
										<label>Operating System</label>
										<Select options={  selectedCategoryList['operatingSystem'] && selectedCategoryList['operatingSystem'].map(_ => ({ value: _, label: _ })) } isMulti={ true } name="operatingSystem" onChange={handleChange}/>
									</div>
								</div>
						</div>
						<h2 style={{ "text-align": "center",
						    "width": "100%",
						    "color": "#aaa"}}> 
						   Commercial Information</h2>
						<div className="row" style={{
							borderTop: "3px dotted rgb(16 11 11 / 46%)",
    						margin: "10px"
						}}>
							

						</div>
						<div className="row">
								<div className="col-md-6 col-sm-12">
									<div className="form-group">
										<label>Title</label>
										<input type="text" name="title"  className="form-control" onChange={ handleChangeText }  />
									</div>
								</div>
								<div className="col-md-6 col-sm-12">
									<div className="form-group">
										<label>Description</label>
										<input type="text" name="description"  className="form-control" onChange={ handleChangeText } />

									</div>
								</div>
								<div className="col-md-6 col-sm-12">
									<div className="form-group">
										<label>Price</label>
										<input type="text" name="price"  className="form-control" onChange={ handleChangeText }  />
									</div>
								</div>
								<div className="col-md-6 col-sm-12">
									<div className="form-group">
										<label>In Stock</label>
										<input type="text" name="countInStock"  className="form-control" onChange={ handleChangeText }  />
									</div>
								</div>
								<div className="col-md-6 col-sm-12">
									<div className="form-group">
										<label>Product Image </label>
										<input type="file" name="image"   className="form-control"  onChange={ handleImage }/>
						
									</div>
								</div>
							</div>
						<div className="btn-list">
								{
									isDetailPage === 'true' ? ( 
										<button type="button"  className="btn btn-success btn-lg btn-block" onClick={ handleListPage }>Listing Page</button>
									) : (
										<button type="button" disabled={isDetailPage === 'true' ? true: false } className="btn btn-success btn-lg btn-block" onClick={handleSubmitButton}>{buttonText}</button>
									)
								}
								
								
						</div>
						{
							isOpen ? (<Modal isOpen={isOpen} changeModalState = { changeModalState }
            	message={msg} />) : null
						} 
						{ alertError ? 
							<AlertModal isOpen={alertError} changeModalState = { changeModalStateAlert }
            	message={msg} /> : null
						} 
						
			</form></>)
	}
	return (<DefaultContainer navigation={navigation} render={formUI} />)

}
export default Product;