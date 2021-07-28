import { Typography } from '@material-ui/core';
import React, { useState, useContext, useEffect} from 'react';
import { useUserContext, UserContext } from '../userContext';
import Drawer from './../components/Drawer';
import Card from '../components/Card';

const url = process.env.REACT_APP_SERVER_URL + '/';

function createCard(event, i) {
	if(event)
		return (
			<div className='event-card' key={i}>
				<Card
					city={event.city || event.venue_addr}
					description={event.description}
					event_id={event._id}
					img_url={event.image_url}
					price={event.price}
					title={event.title}
				/>
			</div>
		);
}

function WishlistPage() {
	const [events, setEvents] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [error, setErrror] = useState(); 
	useEffect(() => {
		async function fetchData() {
			let wurl = url + 'customer/wishlist';
			//let url = 'http://localhost:4000/users'

			let response = await fetch(wurl,
				{
					method: 'get',
					headers: {
						'Content-type': 'application/json'
					},
					credentials: 'include'
				});

			if (response.ok) {
				let json = await response.json();
				setEvents(json);
			}
			else {
				let json = await response.json();
				setErrror(json);
			}
			setLoaded(true);
		}
		fetchData();
	}, []);

	function Wishlist() {

		if(!loaded) {
			return 'Loading ...';
		}
		if(error) {
			return 'Some error occured while getting your purchases';
		}
		return (
			events.map(createCard)
		);
	}

	return (
		<div>
			<Drawer>
				<div>
					<Typography className="dashboard-title" variant="h3">
						Here are your Wishlisted Events
					</Typography>
					<div className='events-row events-row-wishlist' >
						<Wishlist />
					</div>
				</div>
			</Drawer>
		</div>
	);
}

export default WishlistPage;
