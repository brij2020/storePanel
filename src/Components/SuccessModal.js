import React from 'react';


const Modal  = (props) => {
    const {
        modalTitle = 'Confirmation modal',
        message= 'Are you sure you want to continue?',
        options=[{value:"YES"},{value:"NO"}],
        isOpen,
        changeModalState

    } = props;
    console.log('pors',props)
    const openButtonRef = React.useRef(null);
    React.useEffect(() => {
        if(isOpen) {
            openButtonRef.current.click()
        }
        window.scrollTo(0, 0);
    },[isOpen])
    const handleNoButton = () => {
        changeModalState(false)
    }
   
    return(<>
        <div class="col-md-4 col-sm-12 mb-30" >
    
			<div class="pd-20 card-box height-100-p">
				<h5 class="h4">Success modal</h5>
				<a href="#" ref={openButtonRef} class="btn-block" data-toggle="modal" data-target="#success-modal" type="button">
					<img src="vendors/images/modal-img3.jpg" alt="modal" />
				</a>
				<div class="modal fade" id="success-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-body text-center font-18">
								<h3 class="mb-20">Product added successfully!</h3>
								<div class="mb-30 text-center"><img src="vendors/images/success.png" /></div>
								{ message  }
							</div>
							<div class="modal-footer justify-content-center">
								<button type="button" class="btn btn-primary" data-dismiss="modal" onClick={handleNoButton}>Done</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		
 		</div>

 	</>)
}
export default Modal;

