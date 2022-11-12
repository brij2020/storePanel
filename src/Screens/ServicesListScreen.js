import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory, removeCategoryList } from '../store/Slices/categoryList.slice';
import { fetchAllServicesRequest, changeServicesStatus } from '../store/Slices/Services.Slice';
import { deleteCategoryAction } from '../store/Slices/categoryDelete.slice'
import { useNavigate } from "react-router-dom";
import Table from '../Components/Table'
import Modal from '../Components/Modal'
import ModalXhr from '../Components/XhrModal'


const ServiceList  = () => {
	const dispatch = useDispatch();
	const list = useSelector(s => s.serviceListReducer.list);
    const [isOpen, setOpen] = useState(false);
    const [isOpenServiceState, setOpenServiceState] = useState(false);
    const [ messageModal, setMessageModal] = useState({id:"", msg:""})

    const [catId, setCatID] = useState('');
    
	useEffect(() => {
		dispatch(fetchAllServicesRequest())
	},[])
    useEffect(() => {
        window.scrollTo(0, 0);
    },[isOpen])
    const navigate = useNavigate()
	const tableHeader = [	
		"First Name",
        'Last Name','Email','Phone Number',
        'Address','City','State','Country','Service','Client Type','Nature Of Bussiness','','','',
        "Action"
    ]
    const editCategory = e => {
        navigate(`/product-add?edit-id=${e.target.id}`)
    }
    const deleteCategory = e => {   
        setCatID(e.target.getAttribute('data-id'));
        setMessageModal({...messageModal,...{msg: 'Are you sure, want to delete service request?', id: 'del'}})
          // {'Are you sure, want to delete service request?')
        setOpen(true)
    }

    const changeServiceRequestStatus = e => {   
        setCatID(e.target.getAttribute('data-id'))
        setMessageModal({...messageModal,...{msg: 'Are you sure, want to change service request status?', id: 'change-state'}})
        setOpen(true)
    }
    const changeModalState = async (deleteOrNot,chk) => {
        setOpen(!isOpen);
        if(deleteOrNot) {
           let reducedList  = list.filter(_ => _._id !== catId);
           if(chk === 'change-state') {
                let response = await dispatch(changeServicesStatus({id: catId,list:reducedList}));
               // if(response && typeof response.data !== 'undefined' && response.data.status) {
               //      dispatch(removeCategoryList(catId))
               // }
           } else {
                let response = await dispatch(deleteCategoryAction({id: catId,list:reducedList}));
               if(response && typeof response.data !== 'undefined' && response.data.status) {
                    dispatch(removeCategoryList(catId))
               } 
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
			<td>{td?.FirstName}</td>
            <td>{td?.LastName}</td>
            <td>{td?.Email}</td>
            <td>{td?.Phone}</td>
            <td>{td?.Address}</td>
            <td>{td?.City}</td>
            <td>{td?.State}</td>
            <td>{td?.Country}</td>
            <td>{td?.Service}</td>
            <td>{td?.Client}</td>
            <td>{td?.NOBussiness}</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
            <td>&nbsp;&nbsp;&nbsp;</td>
			<td>
				 <td ><span class="badge badge-success" style={{cursor:'pointer'}} onClick={ changeServiceRequestStatus } id={td['_id']}>Chane Status</span></td>
                 <td ><span class="badge badge-success" style={{cursor:'pointer'}} data-id={td['_id']} onClick={ detailCategory }>Detail</span></td>
                 <td ><span class="badge badge-success bg-danger" style={{cursor:'pointer'}} data-id={td['_id']} onClick={  deleteCategory }>Delete</span></td>
			</td>
		</tr>)
		}) : null
	return <div class="main-container"><Table header={ tableHeader } render = {tableUI}/>
        <Modal 
            // isOpen={isOpen} 
            changeModalState = { changeModalState }
            message={messageModal?.msg}
            key={messageModal.id}
            identifier={messageModal.id}
        />
        {
            isOpen ? (<ModalXhr 
            isOpen={isOpen} 
            changeModalState = { changeModalState }
            message={messageModal?.msg}
            key={messageModal.id}
            identifier={messageModal.id}

       />): null
        }
       
    </div>
}
export default ServiceList
