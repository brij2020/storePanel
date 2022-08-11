import React, { useState }from 'react';
import menu from './LeftMenu';
import history  from '../history'
import { useInRouterContext, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


const LeftSideBar = () => {

	const [mainMenuList, setMainMenu ] = 	useState(menu);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onMainLinkClick = (mnObj) => {
		setMainMenu(mainMenuList.map(m => m.id === mnObj.id ? Object.assign({},m,{isOpen:!mnObj.isOpen}) :  Object.assign({},m,{isOpen:false}) ))
	}
	const handleChnageMenu = (link) => {
		navigate(link)
	}

	return (

	<div class="left-side-bar">
		<div class="brand-logo">
			<a href="index.html">
				<img src="assets/vendors/images/deskapp-logo.svg" alt="" class="dark-logo" />
				<img src="assets/vendors/images/deskapp-logo-white.svg" alt="" class="light-logo" />
			</a>
			<div class="close-sidebar" data-toggle="left-sidebar-close">
				<i class="ion-close-round"></i>
			</div>
		</div>
		<div class="menu-block customscroll">
			<div class="sidebar-menu">
				<ul id="accordion-menu">
				{
					mainMenuList.map( menuObj => (
						<li class={`dropdown ${menuObj.isOpen ? 'show':""}`} key={menuObj.key} onClick={ _ => onMainLinkClick(menuObj) }>
						<a href="javascript:;" class="dropdown-toggle">
							<span class={`micon ${menuObj.icon}`}></span><span class="mtext">{menuObj.mainMenuText}</span>
						</a>
						{
							menuObj.Child && menuObj.Child.length > 0 ? (<ul class="submenu" style={{ display: menuObj.isOpen ? 'block' :'none'}}>
							{
								menuObj.Child.map(child => (
									<li key ={child.key}><a href='javascript:void(0)' onClick={ e => handleChnageMenu(child.link) }>{ child.mainMenuText}</a></li>

								))
							}
							</ul>): null
						}
						
							
						
					</li>
					))
				}
				

				</ul>
			</div>
		</div>
	</div>
		)
}
export default LeftSideBar;