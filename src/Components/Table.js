import React from 'react';

const Table = (props) => {
	let headers = props.header;
	let head = props.head ?? 'Listing ';
	let subHead = props.subHead ?? 'all listing of all data'
	return (<>
		<div class="pd-20 card-box mb-30">
					<div class="clearfix mb-20">
						<div class="pull-left">
							<h4 class="text-blue h4">{head}</h4>
							<p>{subHead}</p>
						</div>
						<div class="pull-right">
							<a href="#contextual-table" class="btn btn-primary btn-sm scroll-click" rel="content-y"  data-toggle="collapse" role="button"><i class="fa fa-code"></i> Source Code</a>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									{
										headers && Array.isArray(headers) ? headers.map((h,i) => (<th scope="col" key={h+i}>{h}</th>) ) : null
									}
								</tr>
							</thead>
							<tbody>
							{
								typeof props.render === 'function' ? props.render() : null
							}
							</tbody>
						</table>
					</div>
					<div class="collapse collapse-box" id="contextual-table1">
						<div class="code-box">
							<div class="clearfix">
								<a href="javascript:;" class="btn btn-primary btn-sm code-copy pull-left"  data-clipboard-target="#contextual-table-code"><i class="fa fa-clipboard"></i> Copy Code</a>
								<a href="#contextual-table" class="btn btn-primary btn-sm pull-right" rel="content-y"  data-toggle="collapse" role="button"><i class="fa fa-eye-slash"></i> Hide Code</a>
							</div>
							<pre><code class="xml copy-pre" id="contextual-table-code">
							<div class="table-responsive">
								<table class="table table-striped">
								  <tbody>
								    <tr class="table-active"><td></td></tr>
									<tr class="table-primary"><td></td></tr>
									<tr class="table-secondary"><td></td></tr>
									<tr class="table-success"><td></td></tr>
									<tr class="table-danger"><td></td></tr>
									<tr class="table-warning"><td></td></tr>
									<tr class="table-info"><td></td></tr>
									<tr class="table-light"><td></td></tr>
									<tr class="table-dark"><td></td></tr>
								  </tbody>
								</table>
							</div>
							</code></pre>
						</div>
					</div>
				</div>
				</>)
}
export default Table