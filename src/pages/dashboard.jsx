import { Button, Typography } from '@material-ui/core';
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Wishlist from '../components/Wishlist';
import { useUserContext, UserContext } from '../userContext';
import Drawer from './../components/Drawer';
import Card from '../components/Card';
import axios from 'axios';

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


function DashboardContent () {
	
	return (

		<Link className='no-underline' to='/create-event'>
			<Button
				className='create-event-btn'
				color='primary'
				variant='outlined'
			>
				Create Event
			</Button>
		</Link>
	);
}

function Dashboard() {
	const [events, setEvents] = useState([]);
	const [user, setUser] = useContext(UserContext);

	useEffect(() => {
		axios
			.get(url + 'organizer/events', { withCredentials: true})
			.then(res => {
				setEvents(res.data);
			})
			.catch(err => alert(err));
	});

	return (
		<div>
			<Drawer>
				<div>
					{/* <h2>{user.data._id}</h2>
					<h2>{user.data.username}</h2>
					<h2>{user.data.display_name}</h2> */}
					{/* <h2>wishlist</h2> */}
					<Typography className="dashboard-title" variant="h3">
						Dashboard
					</Typography>
					<div>
						<DashboardContent />
					</div>
					<Typography className="dashboard-title" variant="h3">
						Here are your Events
					</Typography>
					<div className='events-row events-row-wishlist' >
						{events.map(createCard)}
					</div>
				</div>
			</Drawer>
		</div>
	);
}

export default Dashboard;
