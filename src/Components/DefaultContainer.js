import React from 'react';

const DefaultContainer = (props) => {
	const {pageTitle,navigation,render} = props;
	
	return (<>
		<div class="mobile-menu-overlay"></div>

		<div class="main-container">
			<div class="pd-ltr-20 xs-pd-20-10">
				<div class="min-height-200px">
					<div class="page-header">
						<div class="row">
							<div class="col-md-6 col-sm-12">
								<div class="title">
									<h4>Form</h4>
								</div>
								<nav aria-label="breadcrumb" role="navigation">
									<ol class="breadcrumb">
										{
											navigation && Array.isArray(navigation) && navigation.map((nav , i,{length}) => {
												return i === length-1   ?(<li class="breadcrumb-item active" aria-current="page"  key={nav.id}>{nav.title}</li>): <li class="breadcrumb-item" key={nav.id}><a href={nav.link} >{nav.title}</a></li>
											})
										}
										
									</ol>
								</nav>
							</div>
							<div class="col-md-6 col-sm-12 text-right">
								<div class="dropdown">
									<a class="btn btn-primary dropdown-toggle" href="#" role="button" data-toggle="dropdown">
										January 2018
									</a>
									<div class="dropdown-menu dropdown-menu-right">
										<a class="dropdown-item" href="#">Export List</a>
										<a class="dropdown-item" href="#">Policies</a>
										<a class="dropdown-item" href="#">View Assets</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					{
						typeof render === 'function' ? render() : null
					}
				</div>

			</div>
		</div>
	</>)
}
export default DefaultContainer