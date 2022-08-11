import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateInventory }  from '../store/Slices/updateInventory.slice'
const ManageInventory = (props) => {
	const [file, setFile] = useState('');
	const [rowData, setRow] = useState([]);
	const dispatch = useDispatch();

	const handleFile = (e) => {
		const file = e.target.files[0];
		setFile(file)
		let fileReader = new FileReader();
	
		if(file) {
			fileReader.onload = e => {
				let data = csvToArray(e.target.result);
			}
		
			fileReader.readAsText(file);
		}
	}
	const csvToArray = str => {
		if(typeof str === 'string' && str !== '') {
			const header = str.slice(0,str.indexOf("\n")).split(',');
			const csvRows = str.slice(str.indexOf("\n") + 1 ).split("\n")
			.map(element => element.split(',').map(ele => isNaN(parseFloat(ele)) ? ele : parseFloat(ele) ) )
			csvRows.pop()
			setRow(csvRows)
			return csvRows;
		}
	}
	const onSubmit = e => {
		e.preventDefault()
		dispatch(updateInventory({ data: rowData}));		
	}
	return (
		<div class="main-container">
			<div class="form-group">
				<label>Choose CSV type file for update inventory.</label>
				<div class="custom-file col-md-4" style={{"margin-bottom": "21px"}}>
					<input type="file" class="custom-file-input" onChange={ handleFile }/>
					<label class="custom-file-label" >Choose file</label>
				</div>
				<div className="pd-20 card-box height-100-p">
				<button type="button" onClick={ onSubmit } class="btn btn-success btn-lg btn-block">Update Inventory</button>
				</div>
			</div>
		</div>)
}
export default ManageInventory;