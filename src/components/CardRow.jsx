/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import { useGlobalContext } from '../context';
import { useUserContext, UserContext } from '../userContext';
import '../sass/cardrow.scss';

function createCard(event, i) {
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

function CardRow(props) {
	// eslint-disable-next-line
	const [events, setEvents] = useState([]);
	const [loaded, setLoaded] = useState(false);
	// let [user, setUser] = useContext(UserContext);
	// const { setGlobalEvents } = useGlobalContext();
	// const { globalEvents } = useGlobalContext();

	const listRef = useRef(null);

	useEffect(() => {
		var category = props.category;
		let url;
		if (category)
			url = process.env.REACT_APP_SERVER_URL + '/events?category=' + category;
		else {
			url = process.env.REACT_APP_SERVER_URL + '/events';
		}
		axios
			.get(url)
			.then(res => {
				if (category)
					setEvents(res.data);
				else {
					setEvents(res.data);
					// setGlobalEvents(res.data);
				}
				setLoaded(true);
			});
	}, []);

	const handleScrollLeft = () => {
		if (listRef.current) {
			listRef.current.scrollBy({
				left: -500,
				behavior: 'smooth',
			});
		}
	};

	const handleScrollRight = () => {
		if (listRef.current) {
			listRef.current.scrollBy({
				left: 500,
				behavior: 'smooth',
			});
		}
	};

	return (
		<div className='cards-container'>
			<div className='events-row' ref={listRef}>
				{events.map(createCard)}
			</div>
			{ loaded ?
				listRef.current.clientWidth == listRef.current.scrollWidth ?
					undefined
					:
					<div className='scroll-buttons'>
						<IconButton className='left-button' onClick={handleScrollLeft}>
							<ChevronLeftIcon />
						</IconButton>
						<IconButton className='right-button' onClick={handleScrollRight}>
							<ChevronRightIcon />
						</IconButton>
					</div>
				: undefined
			}
		</div>

	);
}

export default CardRow;
