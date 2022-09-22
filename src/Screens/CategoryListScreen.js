import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory, removeCategoryList } from '../store/Slices/categoryList.slice' 
import { deleteCategoryAction } from '../store/Slices/categoryDelete.slice'
import { useNavigate } from "react-router-dom";
import Table from '../Components/Table'
import Modal from '../Components/Modal'


const CategoryList  = () => {
	const dispatch = useDispatch();
	const list = useSelector(s => s.getALlCategoryReducer.list);
    const [isOpen, setOpen] = useState(false);
    const [catId, setCatID] = useState('')
	useEffect(() => {
		dispatch(getAllCategory())
	},[])
    useEffect(() => {
        window.scrollTo(0, 0);
    },[isOpen])
    const navigate = useNavigate()
	const tableHeader = [	
		"Category Name",
        '','','',
        '','','','','','','','','','',
        "Action"
    ]
    const editCategory = e => {
        navigate(`/category?edit-id=${e.target.id}`)
    }
    const deleteCategory = e => {   
       
        setCatID(e.target.getAttribute('data-id'))
        setOpen(true)
    }
    const changeModalState = async (deleteOrNot) => {
        setOpen(!isOpen);
        if(deleteOrNot) {
           let reducedList  = list.filter(_ => _._id !== catId)
           let deleteResponse = await dispatch(deleteCategoryAction({id: catId,list:reducedList}));
        
           if(deleteResponse && typeof deleteResponse.data !== 'undefined' && deleteResponse.data.status) {
                dispatch(removeCategoryList(catId))
           }

        }
    }
    const detailCategory = e => {
       let __ID =  e.target.getAttribute('data-id');
       navigate(`/category?edit-id=${__ID}&detailpage=${true}`)
    }
	const tableUI = () => list && Array.isArray(list) ? list.map((td,indX) => {
		return (<tr key={ td.ProductSK+indX}class={`${ indX%2 === 0 ? 'table-primary' : 'table-active'}`}>
			<th scope="row">{ indX+1 }</th>
			<td>{td?.name}</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
			<td>
				 <td ><span class="badge badge-success" style={{cursor:'pointer'}} onClick={ editCategory } id={td['_id']}>Edit</span></td>
                 <td ><span class="badge badge-success" style={{cursor:'pointer'}} data-id={td['_id']} onClick={ detailCategory }>Detail</span></td>
                 <td ><span class="badge badge-success bg-danger" style={{cursor:'pointer'}} data-id={td['_id']} onClick={  deleteCategory }>Delete</span></td>
			</td>
		</tr>)
		}) : null
	return <div class="main-container"><Table header={ tableHeader } render = {tableUI}/>
        <Modal isOpen={isOpen} changeModalState = { changeModalState }
            message={'Are you sure, want to delete category?'}
        />
    </div>
}
export default CategoryList