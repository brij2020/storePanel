import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sayHello } from '../store/Slices/auth.slice';
import { plus,min, mul } from '../store/Slices/counter.slice';
import { loginAction } from '../store/Slices/login.slice'
import Loader from '../Components/Loader'
import { FormValidation } from '../utill/FormValidation'
import  history  from '../history'

const Login = () => {
	const dispatch = useDispatch();

	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	
	const loader = useSelector(store => store.userReducer?.loader) ?? false;
	const handleLogin = async (e) => {
		e.preventDefault()
		
		const errorState = FormValidation({email: username, password:password});
		console.log('hit web services', errorState)
		if(Object.values(errorState).filter(_=>_.msg !== '').length > 0) {
			setError(errorState);
			return
		}
console.log('hit web services')
		const userResponse  = await dispatch(loginAction({ 
		    "email":username,
		    "password": password
		}));
		history.push('/')
		if(userResponse.data.status) {
			history.push('/')
		}
	}
	const handleUserName = e => setUserName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)
	
	return(<>
			<div className="login-header box-shadow">
			{ loader ? <Loader /> : null }
			<div className="container-fluid d-flex justify-content-between align-items-center">
			<div className="brand-logo">
				<a href="login.html">
					<img src="assets/vendors/images/deskapp-logo.svg" alt="" />
				</a>
			</div>
			<div className="login-menu">
				<ul>
					<li><a href="register.html">Register</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
		<div className="container">
			<div className="row align-items-center">
				<div className="col-md-6 col-lg-7">
					<img src="assets/vendors/images/login-page-img.png" alt="" />
				</div>
				<div className="col-md-6 col-lg-5">
					<div className="login-box bg-white box-shadow border-radius-10">
						<div className="login-title">
							<h2 className="text-center text-primary">Login To DeskApp</h2>
						</div>
						<form>
							<div className="select-role" style={{ display:"none"}}> 
								<div className="btn-group btn-group-toggle" data-toggle="buttons">
									<label className="btn active">
										<input type="radio" name="options" id="admin" />
										<div className="icon"><img src="assets/vendors/images/briefcase.svg" className="svg" alt="" /></div>
										<span>I'm</span>
										Manager
									</label>
									<label className="btn">
										<input type="radio" name="options" id="user" />
										<div className="icon"><img src="assets/vendors/images/person.svg" className="svg" alt="" /></div>
										<span>I'm</span>
										Employee
									</label>
								</div>
							</div>
							<div className="input-group custom">
								<input type="text" className="form-control form-control-lg" data-testid='user' value={username} placeholder="Username"  onChange={ handleUserName } />
								<div className="input-group-append custom">
									<span className="input-group-text"><i className="icon-copy dw dw-user1"></i></span>
									
								</div>
								<br />{ error && error?.email?.msg ? (<span data-testid='user-error'>{ error.email.msg} </span>) : ('') }
							</div>
							<div className="input-group custom">
								<input type="password" className="form-control form-control-lg" data-testid='pass'  value={password}placeholder="**********" onChange={ handlePassword } />
								<div className="input-group-append custom">
									<span className="input-group-text"><i className="dw dw-padlock1"></i></span>
						
								</div>
								<br />{ error && error?.password?.msg ? (<span data-testid='pass-error'>{ error.password.msg} </span>) : ('') }
							</div>
							<div className="row pb-30">
								<div className="col-6">
									<div className="custom-control custom-checkbox">
										<input type="checkbox" className="custom-control-input" id="customCheck1" value={password} />
										<label className="custom-control-label" htmlFor="customCheck1">Remember</label>
									</div>
								</div>
								<div className="col-6">
									<div className="forgot-password"><a href="forgot-password.html">Forgot Password</a></div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12">
									<div className="input-group mb-0">
										{/*
											use code for form submit
											<input className="btn btn-primary btn-lg btn-block" type="submit" value="Sign In" />
										*/}
										<button className="btn btn-primary btn-lg btn-block" data-testid='submitbtn' onClick={ handleLogin }>Sign In</button>
									</div>
									<div className="font-16 weight-600 pt-10 pb-10 text-center" data-color="#707373">OR</div>
									<div className="input-group mb-0">
										<a className="btn btn-outline-primary btn-lg btn-block" href="register.html">Register To Create Account</a>
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