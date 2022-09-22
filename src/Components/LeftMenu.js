const menu = [
	{
		mainMenuText: "Home",
		link:"/home",
		isOpen: false,
		icon:'dw dw-house-1',
		Child:[
			{
				mainMenuText: "Home1",
				link:"/home1",
				key:"ILOK9099"
			}
		],
		key:"HJ9098KL",
		id:"home_1"
	},
	{
		mainMenuText: "Manage Category",
		link:"",
		isOpen: false,
		icon:'dw dw-truck',
		Child:[
			{
				mainMenuText: "Add Category",
				link:"/category",
				key:"IN-SUB987899"
			},
			{
				mainMenuText: "Category List",
				link:"/category-list",
				key:"IN-SUB2271331"
			}
		],
		key:"INV90908KL",
		id:"inven_1"
	},
	{
		mainMenuText: "Manage Product",
		link:"",
		isOpen: false,
		icon:'dw  dw-money',
		Child:[
			{
				mainMenuText: "Add Products",
				link:"/product-add",
				key:"PRO-SUB92239967"
			},
			
			{
				mainMenuText: "All Products",
				link:"/product-list",
				key:"PRO90I-SUB78434"
			}
		],
		key:"INVO0908KLI",
		id:"product_1"
	}
]
export default menu;

