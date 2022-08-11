import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import { setUser } from '../store/Slices/login.slice'
import { useLocation } from 'react-router-dom'


const authState = (flag) => {
	let isLogin = flag;
	const storeUser = useSelector(state => state.userReducer);
	const dispatch =  useDispatch()
	const token = localStorage.getItem('token');
	let  decodedUser = {};
	try {
		if(token) {
		  decodedUser = jwt_decode(token);
		  dispatch(setUser({ token: token }))
		}
	} catch (e) {

	}
	console.log("decodedUser",decodedUser)

	if(storeUser && Object.keys(storeUser.user).length > 0 || Object.keys(decodedUser).length > 0 ) {
		isLogin  =  true
	}
	return [isLogin, () =>  {} ]
}
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export { authState, useQuery };