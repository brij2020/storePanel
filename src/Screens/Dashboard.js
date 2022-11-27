import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDashboard }  from '../store/Slices/dashboard.slice'
import  { useToken } from '../Hooks'
import CountUp from 'react-countup';
const Home = () => {
	const dispatch = useDispatch();
	const [ token, setToken] =  useToken();
	const [ tiles, setTiles] = useState([]);
	const [ vertical, setVertical ] = useState([])
	const dashboardData =  useSelector(s=>s.dashboardReducer);
	useEffect(() => {
		dispatch(getDashboard(token));
	},[]);
	// console.log("dashboardData",dashboardData)
	useEffect(() => {
		setTiles(dashboardData?.data?.order);
		setVertical(dashboardData?.data?.vList)
	},[dashboardData])
	const makeTiles = () => {
		return tiles && tiles.map(t => {
		return (<div class="col-lg-3 col-md-6 col-sm-12 mb-30" key={t?.rank}>
			<div class="card-box pd-30 height-100-p">
				<div class={`progress-box text-center ${t?.classText}`}>
					<CountUp end={t?.score} />
					<h5 class={`${t?.classText } padding-top-10 h5`}>{t?.label}</h5>
					<label class="d-block">80% Average <i class="fa fa-line-chart text-blue"></i></label>
				</div>
			</div>
			</div>)
		})
		
	}
	const makeVerticalList = () => {
		return vertical && vertical.map((v) => {
			return (<li class="d-flex flex-wrap align-items-center">
				<div class="icon"><img src="vendors/images/chrome.png" alt="" /></div>
				<div class="browser-name">{v?.label}</div>
				<div class="visit"><span class={`badge badge-pill ${v?.classText}`}>{v?.score}</span></div>
			</li>)
		})
		
	}
	return (<>
	<div class="mobile-menu-overlay"></div>

	<div class="main-container">
		<div class="xs-pd-20-10 pd-ltr-20">
			<div class="page-header">
				<div class="row">
					<div class="col-md-6 col-sm-12">
						<div class="title">
							<h4>Dashboard</h4>
						</div>
						<nav aria-label="breadcrumb" role="navigation">
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a href="index.html">Home</a></li>
								<li class="breadcrumb-item active" aria-current="page">Dashboard</li>
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
			<div class="row clearfix progress-box">
				{
					makeTiles()
				}
			</div>
			<div class="row">
				<div class="col-lg-4 col-md-6 col-sm-12 mb-30">
					<div class="card-box pd-30 pt-10 height-100-p">
						<h2 class="mb-30 h4">Browser Visit</h2>
						<div class="browser-visits">
							<ul>
							 {
							 	makeVerticalList()
							 }
								
							</ul>
						</div>
					</div>
				</div>
				<div class="col-lg-8 col-md-6 col-sm-12 mb-30">
					<div class="card-box pd-30 pt-10 height-100-p">
						<h2 class="mb-30 h4">World Map</h2>
						<div id="browservisit" style={{ "width":"100%!important", height:"380px"}}></div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-7 col-md-12 col-sm-12 mb-30">
					<div class="card-box pd-30 height-100-p">
						<h4 class="mb-30 h4">Compliance Trend</h4>
						<div id="compliance-trend" class="compliance-trend"></div>
					</div>
				</div>
				<div class="col-lg-5 col-md-12 col-sm-12 mb-30">
					<div class="card-box pd-30 height-100-p">
						<h4 class="mb-30 h4">Records</h4>
						<div id="chart" class="chart"></div>
					</div>
				</div>
			</div>
			<div class="footer-wrap pd-20 mb-20 card-box">
				DeskApp - Bootstrap 4 Admin Template By <a href="https://github.com/dropways" target="_blank">Ankit Hingarajiya</a>
			</div>
		</div>
	</div>
		
		</>)
}
export default Home;