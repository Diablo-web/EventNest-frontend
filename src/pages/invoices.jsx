import React, { useState, useContext, useEffect} from 'react';
import { Divider, List, Typography } from '@material-ui/core';
import { useUserContext, UserContext } from '../userContext';
import Drawer from './../components/Drawer';
import { Link } from 'react-router-dom';
import { ListItem } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import '../sass/dashboard.scss';

function Ticket(purchase, i) {
	if(purchase.event) {
		return (
			<Link className='list-link' key={i} to={'/invoices/' + purchase.transactionid}>
				<ListItem button key={purchase.event._id}>
					<ListItemIcon><ReceiptOutlinedIcon /></ListItemIcon>
					<ListItemText primary={purchase.event.title + '\t' + 'Tickets: ' + purchase.tickets} />
				</ListItem>
				<Divider />
			</Link>
		);
	}
	
}


function TicketsPage() {
	const url = process.env.REACT_APP_SERVER_URL + '/';
	const [user, setUser] = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [error, setErrror] = useState(); 
	const [purchases, setPurchases] = useState([]);

	function Tickets() {
		console.log(purchases);
		if(loading) {
			return 'Loading ...';
		}
		if(error) {
			return 'Some error occured while getting your purchases';
		}
		console.log(purchases);
		return (
			<List>
				{purchases.map(Ticket)}
			</List>
		);
	}

	useEffect(()=>{
		console.log(user);
		async function fetchData() {
			let purl = url + 'customer/purchases';
			let response = await fetch(purl,
				{
					method: 'get',
					headers: {
						'Content-type': 'application/json'
					},
					credentials: 'include'
				});
			console.log(response);
			if (response.ok) {
				let json = await response.json();
				setPurchases(json);
			}
			else {
				let json = await response.json();
				setErrror(json);
			}
			setLoading(false);
		}
		fetchData();
	},[]);

	return (
		<div>
			<Drawer>
				<div>
					<Typography className="dashboard-title" variant="h3">
						Tickets
					</Typography>
					<div>
						<Tickets />
					</div>
				</div>
			</Drawer>
		</div>
	);
}

export default TicketsPage;