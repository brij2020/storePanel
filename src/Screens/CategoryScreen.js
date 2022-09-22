import React, { useEffect } from 'react';
import DefaultContainer from '../Components/DefaultContainer'
import { createCategory }  from '../store/Slices/createCategory.slice'
import { updateCategory } from '../store/Slices/updateCategory.slice'
import { getCategoryDetail } from '../store/Slices/categoryDetail.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
const Category = () => {
	const location = useLocation();
	let queryParams = new URLSearchParams(location.search);
	let catID =  queryParams.get('edit-id');
	let isDetailPage =  queryParams.get('detailpage');
	const list = useSelector(s => s.getALlCategoryReducer.list);
	let detail = useSelector(s => s.CategoryDetailSlice.detail);
	const  naviGate = useNavigate()
	const navigation = [{id:"23",title:"Home", link:'/'},{id:"231",title:"Category", link:'/category'}];
	const dispatch = useDispatch()
	

	if(typeof list !== 'undefined'  && Array.isArray(list) && list.length > 0 && typeof catID !== 'undefined') {
		detail = list.find(_ => _._id === catID);
	} 
	

	useEffect(() => {
		if(typeof list !== 'undefined'  && Array.isArray(list) && list.length === 0 && typeof catID !== 'undefined') {
			dispatch(getCategoryDetail(catID))
		}
	},[]);
	if(catID === undefined) {
		detail = {}

	}

	const formUI = () => {

		useEffect(() => {
			if(detail && Object.keys(detail).length > 0 ) {
				let keys = Object.keys(detail);
				let formObj = {};
				keys.map(key => {
					if(Array.isArray(key)) {
						formObj[key] = detail[key].join(',')
					} else {
						formObj[key] = detail[key]
					}
				})
				setButtonText('Update Category')
				setAttribute(formObj)
			} else {
				setAttribute({})
			}
			
		},[detail])
		const [categoryAttribute, setAttribute ]  = React.useState({name:'',brand:''});
		const [buttonText, setButtonText] = React.useState('Create Category')
		const handleChange = ({target:{ name, value}}) => {
			let obj = {};
			if(name === 'name') {
				obj = { ...categoryAttribute,...{[`${name}`]:value }}
			} else {
				obj = { ...categoryAttribute,...{[`${name}`]: value.split(',') }}
			}
			
			setAttribute(obj)

		}
		const handleSubmitButton = async e => {
			e.preventDefault()
			if(typeof catID !== 'undefined' && catID !== null) {
				const p = await dispatch(updateCategory({catObject:categoryAttribute,id:catID}));
				if(typeof p.payload !== 'undefined' && p.payload.status) {
					naviGate('/category-list')
				} else {

				}
				return
			}
			dispatch(createCategory(categoryAttribute))
		}
		const handleListPage = () => {
			naviGate('/category-list')
		}
		
		return (<form>
				<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Category Name</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false }  className="form-control" value={categoryAttribute?.name} name="name" onChange={ handleChange }/>
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Brand Name</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="brand" value={categoryAttribute?.brand}  onChange={ handleChange }/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Product Type</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="ptype" value={categoryAttribute?.ptype}  onChange={ handleChange }  data-role="tagsinput" placeholder="add tags"/>
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Series</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="series" value={categoryAttribute?.series}  onChange={ handleChange } />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Chipset</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false }  className="form-control" name="chipset" value={categoryAttribute?.chipset}  onChange={ handleChange } />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Generation</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="generation" value={categoryAttribute?.generation}  onChange={ handleChange } />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Socket Type</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="socketType" value={categoryAttribute?.socketType}  onChange={ handleChange } />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Screen Size</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="screenSize" value={categoryAttribute?.screenSize}  onChange={ handleChange } />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Memory Supprot</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false }  className="form-control" name="memorySupprot" value={categoryAttribute?.memorySupprot}  onChange={ handleChange } />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Memory Type</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="memoryType" value={categoryAttribute?.memoryType}  onChange={ handleChange } />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Speed</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="speed" value={categoryAttribute?.speed}  onChange={ handleChange } />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Capacity</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false }  className="form-control" name="capacity" value={categoryAttribute?.capacity}  onChange={ handleChange } />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Form Factor</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="formFactor" value={categoryAttribute?.formFactor}  onChange={ handleChange } />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Rpm</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="rpm" value={categoryAttribute?.rpm}  onChange={ handleChange } />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Watts</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false }  className="form-control" name="watts" value={categoryAttribute?.watts}  onChange={ handleChange } />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Voltage Range</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="voltageRange" value={categoryAttribute?.voltageRange}  onChange={ handleChange } />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Tracking Method</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="trackinMethod" value={categoryAttribute?.trackinMethod}  onChange={ handleChange } />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Resolution</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="resolution" value={categoryAttribute?.resolution}  onChange={ handleChange } />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Color</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false }  className="form-control" name="color" value={categoryAttribute?.color}  onChange={ handleChange } />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Style</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="style" value={categoryAttribute?.style}  onChange={ handleChange } />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Refresh Rate</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false } className="form-control" name="refreshRate" value={categoryAttribute?.refreshRate}  onChange={ handleChange } />
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label>Channel</label>
									<input type="text" disabled={isDetailPage === 'true' ? true: false }  className="form-control" name="channel" value={categoryAttribute?.channel}  onChange={ handleChange } />
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
			</form>)
	}
	return (<DefaultContainer navigation={navigation} render={formUI} key={detail}/>)

}
export default Category;