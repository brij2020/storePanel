import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sayHello } from '../store/Slices/auth.slice';
import { plus,min, mul } from '../store/Slices/counter.slice';
import { loginAction } from '../store/Slices/login.slice'
import Loader from '../Components/Loader'

import  history  from '../history'

const Login = () => {
	const dispatch = useDispatch();

	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const loader = useSelector(store => store.userReducer?.loader) ?? false;
	const handleLogin = async (e) => {
		e.preventDefault()
		const userResponse  = await dispatch(loginAction({ 
		    "username":username,
		    "password": password
		}));
		if(userResponse.data.status) {
			history.push('/')
		}
	}
	const handleUserName = e => setUserName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)
console.log('loader',loader)
	return(<>
			<div class="login-header box-shadow">
			{ loader ? <Loader /> : null }
			<div class="container-fluid d-flex justify-content-between align-items-center">
			<div class="brand-logo">
				<a href="login.html">
					<img src="assets/vendors/images/deskapp-logo.svg" alt="" />
				</a>
			</div>
			<div class="login-menu">
				<ul>
					<li><a href="register.html">Register</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="login-wrap d-flex align-items-center flex-wrap justify-content-center">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-md-6 col-lg-7">
					<img src="assets/vendors/images/login-page-img.png" alt="" />
				</div>
				<div class="col-md-6 col-lg-5">
					<div class="login-box bg-white box-shadow border-radius-10">
						<div class="login-title">
							<h2 class="text-center text-primary">Login To DeskApp</h2>
						</div>
						<form>
							<div class="select-role" style={{ display:"none"}}> 
								<div class="btn-group btn-group-toggle" data-toggle="buttons">
									<label class="btn active">
										<input type="radio" name="options" id="admin" />
										<div class="icon"><img src="assets/vendors/images/briefcase.svg" class="svg" alt="" /></div>
										<span>I'm</span>
										Manager
									</label>
									<label class="btn">
										<input type="radio" name="options" id="user" />
										<div class="icon"><img src="assets/vendors/images/person.svg" class="svg" alt="" /></div>
										<span>I'm</span>
										Employee
									</label>
								</div>
							</div>
							<div class="input-group custom">
								<input type="text" class="form-control form-control-lg" placeholder="Username"  onChange={ handleUserName } />
								<div class="input-group-append custom">
									<span class="input-group-text"><i class="icon-copy dw dw-user1"></i></span>
								</div>
							</div>
							<div class="input-group custom">
								<input type="password" class="form-control form-control-lg" placeholder="**********" onChange={ handlePassword } />
								<div class="input-group-append custom">
									<span class="input-group-text"><i class="dw dw-padlock1"></i></span>
								</div>
							</div>
							<div class="row pb-30">
								<div class="col-6">
									<div class="custom-control custom-checkbox">
										<input type="checkbox" class="custom-control-input" id="customCheck1" />
										<label class="custom-control-label" for="customCheck1">Remember</label>
									</div>
								</div>
								<div class="col-6">
									<div class="forgot-password"><a href="forgot-password.html">Forgot Password</a></div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<div class="input-group mb-0">
										{/*
											use code for form submit
											<input class="btn btn-primary btn-lg btn-block" type="submit" value="Sign In" />
										*/}
										<button class="btn btn-primary btn-lg btn-block" onClick={ handleLogin }>Sign In</button>
									</div>
									<div class="font-16 weight-600 pt-10 pb-10 text-center" data-color="#707373">OR</div>
									<div class="input-group mb-0">
										<a class="btn btn-outline-primary btn-lg btn-block" href="register.html">Register To Create Account</a>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</>)
}
export default Login;