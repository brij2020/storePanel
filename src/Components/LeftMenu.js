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
		mainMenuText: "Inventory",
		link:"",
		isOpen: false,
		icon:'dw dw-truck',
		Child:[
			{
				mainMenuText: "Manage Inventory",
				link:"/edit-inventory",
				key:"IN-SUB987899"
			},
			{
				mainMenuText: "Inventory",
				link:"/inventory",
				key:"IN-SUB2271331"
			}
		],
		key:"INV90908KL",
		id:"inven_1"
	},
	{
		mainMenuText: "Invoice",
		link:"",
		isOpen: false,
		icon:'dw  dw-money',
		Child:[
			{
				mainMenuText: "Generate Invoice",
				link:"/generate-invoice",
				key:"INVOI-SUB9879967"
			},
			
			{
				mainMenuText: "Sell Products",
				link:"/sell-product",
				key:"INVOI-SUB78434"
			}
		],
		key:"INVO0908KLI",
		id:"invoice_1"
	}
]
export default menu;

