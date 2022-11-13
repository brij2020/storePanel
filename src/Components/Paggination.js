import React from 'react';

const Paggination = (props)  => {
	let pagesList  = [];
	let { page=1, onClick= ()=>{} } = props; 
	if(typeof props.totalPage !== 'undefined' && props.totalPage > 0) {
			pagesList =  Array.from({ length: props.totalPage}, (_,i) => i + 1 );
	}
	return(<div class="blog-pagination">
			<div class="btn-toolbar justify-content-center mb-15">
				<div class="btn-group">
					<a href="#" class="btn btn-outline-primary prev" onClick={ e => props.onClick(page-1 ? page-1 : 1)}><i class="fa fa-angle-double-left"></i></a>
					{
						pagesList && pagesList.map((pageNo,i) => {
							return <a href="#" class={`btn  ${page == pageNo ?'btn-primary current' :'btn-outline-primary'}`}  key={ page + i} onClick={ e => props.onClick(pageNo) }>{pageNo}</a>
						}) 
					}
					
					{/* <span class="btn btn-primary current">3</span> */}
					
					<a href="#" class="btn btn-outline-primary next" onClick={ e => props.onClick(page+1)}><i class="fa fa-angle-double-right" onClick={ e => props.onClick(page+1)}></i></a>
				</div>
			</div>
		</div>)
}
export default Paggination;