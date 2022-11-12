import React from 'react';


const AlertModal  = (props) => {
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
   const  handleYesButton = () => {
        changeModalState(true)
    }
    return(<>
       <div class="col-md-4 col-sm-12 mb-30">
		<div class="pd-20 card-box height-100-p">
			<h5 class="h4">{ modalTitle }</h5>
			<a href="#" ref={openButtonRef} class="btn-block" data-toggle="modal" data-target="#alert-modal" type="button">
				<img src="vendors/images/modal-img3.jpg" alt="modal" />
			</a>
			<div class="modal fade" id="alert-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-sm modal-dialog-centered">
					<div class="modal-content bg-danger text-white">
						<div class="modal-body text-center">
							<h3 class="text-white mb-15"><i class="fa fa-exclamation-triangle"></i> Alert</h3>
							<p>{message}</p>
							<button type="button" class="btn btn-light" data-dismiss="modal" onClick={ handleNoButton }>Ok</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
 		
 	</>)
}
export default AlertModal;





