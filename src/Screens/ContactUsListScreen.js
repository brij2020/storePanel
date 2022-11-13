import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory, removeCategoryList } from '../store/Slices/categoryList.slice';
import { fetchAllContactUsRequest, changeServicesStatus } from '../store/Slices/Contact.Slice';
import { deleteCategoryAction } from '../store/Slices/categoryDelete.slice'
import { useNavigate } from "react-router-dom";
import Table from '../Components/Table'
import Modal from '../Components/Modal'
import ModalXhr from '../Components/XhrModal'


const ContactUsList  = () => {
	const dispatch = useDispatch();
	const { list=[], pages = 1 } = useSelector(s => s.contactUsListReducer) ?? {list:[], pages : 1};
    const [isOpen, setOpen] = useState(false);
    const [isOpenServiceState, setOpenServiceState] = useState(false);
    const [ messageModal, setMessageModal] = useState({id:"", msg:""})
    const [pageNo, setPageNo ] = useState(1);
    const [perPage, setPerPage] = useState(10)
    const [catId, setCatID] = useState('');
    
	// useEffect(() => {
	// 	dispatch(fetchAllContactUsRequest({ pageno: pageNo, perpage:perPage}))
	// },[])
    useEffect(() => {
        window.scrollTo(0, 0);
    },[isOpen])

    const onClickPage = (pageNo) => {
            setPageNo(pageNo)
        }

    React.useEffect(() => {
        dispatch(fetchAllContactUsRequest({ pageno: pageNo, perpage:perPage}));
         window.scrollTo(0, 0);

    },[pageNo])


    const navigate = useNavigate()
	const tableHeader = [	
		"First Name",
        'Last Name','Email','Phone Number',
        'City','State','','','',
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
            <td>{td?.City}</td>
            <td>{td?.State}</td>
            <td>{ td?.message }</td>
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
	return <div class="main-container"><Table header={ tableHeader } render = {tableUI}

        pages={pages} onClick={onClickPage} currentPage={pageNo} 

    />
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
export default ContactUsList
