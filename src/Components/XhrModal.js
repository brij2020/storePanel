
import React from 'react';


const ModalXhr  = (props) => {
    const {
        modalTitle = 'Confirmation modal',
        message= 'Are you sure you want to continue?',
        options=[{value:"YES"},{value:"NO"}],
        isOpen:isOpen_,
        changeModalState,
        identifier=null
    } = props;
    const [isOpen, setOpen_] = React.useState(isOpen_)
    const openButtonRef = React.useRef(null);
    React.useEffect(() => {
        if(isOpen) {
            openButtonRef.current.click()
        }
        window.scrollTo(0, 0);
    },[isOpen])
    const handleNoButton = () => {
    	setOpen_(false)
    	openButtonRef.current.click()
        changeModalState(false,identifier)
    }
   const  handleYesButton = () => {
	   	setOpen_(false)
	   	openButtonRef.current.click()
        changeModalState(true,identifier)
    }
    return(<>
       <div class="col-md-4 col-sm-12 mb-30"  >
			<div class="pd-20 card-box height-100-p">
				<h5 class="h4">Login modal</h5>
				<a href="#" class="btn-block" ref={openButtonRef} data-backdrop="static" data-toggle="modal" data-target="#confirmation-modal2" type="button">
					<img src="vendors/images/modal-img2.jpg" alt="modal" />
				</a>

				<div class="modal fade" id="confirmation-modal2" tabindex="1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style={{ display: isOpen ? 'block' :'none', flexDirection: "row-reverse"}}>
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="login-box bg-white box-shadow border-radius-10">
								<div class="login-title">
									<h2 class="text-center text-primary">{modalTitle}</h2>
								</div>
								<form>
									
	
									<div class="input-group custom">
										<input type="text" class="form-control form-control-lg" placeholder="please enter response" />
										
									</div>
									
									<div class="row">
										<div class="col-sm-12" style={{display: "flex"}}>
											<div class="input-group mb-0">
												
												<a class="btn btn-primary btn-lg btn-block" href="#" style={{ width:"97%"}} onClick={ handleYesButton } data-dismiss="confirmation-modal2">Submit</a>
											</div>
											<div class="input-group mb-0">
												
												<a class="btn btn-primary btn-lg btn-block" href="#" style={{ width:"97%"}} onClick={ handleNoButton } data-dismiss="confirmation-modal2">No</a>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
       </>
    )
}
export default ModalXhr;


						