import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import EventImage from '../assets/blocks.jpg';
import { Button, Grid, Link, StylesProvider, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useUserContext, UserContext } from '../userContext';

import '../sass/homepage.scss';
import EventPanel from '../components/EventPanel';

export default function Homepage() {
	const [user, setUser] = useContext(UserContext);
	const handleLogout = (e) => {
		e.preventDefault();
		axios
			.get(process.env.REACT_APP_SERVER_URL + '/logout', { withCredentials: true })
			.then(res => {
				console.log(res.data);
				setUser({ loggedIn: false });
			})
			.catch(err => {
				console.log(err);
			});
	};
	const handleUser = (e) => {
		e.preventDefault();
		console.log(user);
	};
	return (
		<StylesProvider injectFirst>
			<Grid className="welcome-container" container>
				<Grid className="title-container" container direction="column" item lg={6} xs={12}>
					<Typography className="homepage-title" justify="center" variant="h3">
						Welcome to EventNest
					</Typography>
					<Typography className="subtitle" justify="center" variant="subtitle1">
						Your online destination for hosting and exploring events across the globe, at your fingertips.
					</Typography>
					<Link href="#events" className="button-link">
						<Button className="button button-shadow" color="primary" variant="contained">
							Explore Events
						</Button>
					</Link>
					{/* <RouterLink to='/create-event'>
						<Button className="button" color="primary" hidden variant="contained">
							Create Event
						</Button>
					</RouterLink> */}
				</Grid> 
				<Grid alignItems="center" container item justify="center" lg={6} xs={12}>
					<img alt="Festival Image" className={'event-image'} src={EventImage} />
				</Grid>
			</Grid>
			<div className="events" id="events">
				<EventPanel />
			</div>
		</StylesProvider>
	);
}