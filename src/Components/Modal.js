import React from 'react';


const Modal  = (props) => {
    const {
        modalTitle = 'Confirmation modal',
        message= 'Are you sure you want to continue?',
        options=[{value:"YES"},{value:"NO"}],
        isOpen,
        changeModalState,
        identifier=null
    } = props;

    const openButtonRef = React.useRef(null);
    React.useEffect(() => {
        if(isOpen) {
            openButtonRef.current.click()
        }
        window.scrollTo(0, 0);
    },[isOpen])
    const handleNoButton = () => {
        changeModalState(false,identifier)
    }
   const  handleYesButton = () => {
        changeModalState(true,identifier)
    }
    return(<>
        <div class="col-md-4 col-sm-12 mb-30" style={{ opacity:  -1}}>
        <div class="pd-20 card-box height-100-p">
            <h5 class="h4">{modalTitle}</h5>
            <a href="#" ref={openButtonRef}class="btn-block" data-toggle="modal" data-target="#confirmation-modal" type="button">
                <img src="vendors/images/modal-img3.jpg" alt="modal" />
            </a>
           
        </div>
    </div>
     <div class="modal fade" id="confirmation-modal" tabindex="-1" role="dialog" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered" role="document">
         <div class="modal-content">
             <div class="modal-body text-center font-18">
                 <h4 class="padding-top-30 mb-30 weight-500"> {message}</h4>
                 <div class="padding-bottom-30 row" style={{ "max-width": "170px", margin:"0 auto"}}>
                     <div class="col-6">
                         <button type="button" onClick={ handleNoButton } class="btn btn-secondary border-radius-100 btn-block confirmation-btn" data-dismiss="modal"><i class="fa fa-times"></i></button>
                         { options[1].value }
                     </div>
                     <div class="col-6">
                         <button type="button" onClick={ handleYesButton } class="btn btn-primary border-radius-100 btn-block confirmation-btn" data-dismiss="modal"><i class="fa fa-check"></i></button>
                         {options[0].value}
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div></>
    )
}
export default Modal;