import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Card, Grid, StylesProvider, Button, CardHeader, FormControl } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Select } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { useUserContext, UserContext } from '../userContext';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { MenuItem, InputLabel } from '@material-ui/core';
import '../sass/eventinfo.scss';
import { classNames } from 'classnames';

const url = process.env.REACT_APP_SERVER_URL + '/';
//const url = 'http://localhost:4000/'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script');
		script.src = src;
		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
		document.body.appendChild(script);
	});
}

function EventInfo(props) {
	const [details, setDetails] = useState([]);
	const [orderData, setOrder] = useState();
	const [loadRazor, setLoadRazor] = useState(true);
	const [number, setNumber] = useState(1);
	const [user, setUser] = useContext(UserContext);
	const [load, setLoad] = useState(false);
	const [over, setOver] = useState(false);
	const { match: { params } } = props;
	let history = useHistory();

	async function displayRazorpay() {
		if(Object.keys(user).length == 0){
			history.push('/signin');
			return;
		}
		if(user.type === 'organizer'){
			alert('Only for customers');
			return;
		}
		if(loadRazor) {
			const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
			if (!res) {
				alert('Razorpay SDK failed to load. Are you online?');
				return;
			}
			setLoadRazor(false);
		}
		const options = {
			key:'rzp_test_Cly42HaznEIi1i',
			currency: 'INR',
			amount: orderData.amount,
			order_id: orderData.id,
			name: 'EventNest',
			description: 'EventNest',
			
			handler:function (response) {
				let values = {
					razorpay_signature : response.razorpay_signature,
					razorpay_order_id : response.razorpay_order_id,
					transactionid : response.razorpay_payment_id,
					transactionamount :  orderData.amount,
					eventId: params.event_id,
					tickets: number
				};
				let httpHeaders = { 'Content-Type': 'application/json' };
				let myurl = url + 'razorpay/payment';
				let myHeaders = new Headers(httpHeaders);
				fetch(myurl, {
					method: 'POST',
					headers: myHeaders,
					credentials: 'include',
					body: JSON.stringify(values),
				})
					.then(res=> res.json())
					.then(data => {
						history.push('/invoices/' + response.razorpay_payment_id);
					})
					.catch(e=>console.log(e));
			}
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}
	
	const handleNumber = (event) => {
		const number = event.target.value;
		setNumber(number);
		setLoad(false);
	};	

	useEffect(() => {
		let myurl = url + 'events?_id=' + params.event_id;
		axios
			.get(myurl)
			.then(res => {
				console.log(res);
				setDetails(res.data[0]);
			});
	}, [props]);

	useEffect(() => {
		const postBody = {
			amount: details.price,
			tickets: number
		};
		if(details.price)
		{ 
			axios
				.post(url + 'razorpay', postBody)
				.then(res => {
					console.log(res.data);
					setOrder(res.data);
					if(details.max_attendees - details.attendees < 1)
						setLoad(false);
					else
						setLoad(true);						
				});
		}
	}, [details, number]);


	return (
		<StylesProvider injectFirst>
			<Grid container>
				<div className="background-event-img" style={{
					backgroundImage: 'url(' + details.image_url + ')',
				}}
				>
					<div className='blur'></div>
				</div>
				<Grid item lg={2}></Grid>
				<Grid container item lg={8} spacing={2} xs={12}>
					<Grid className="event-page-container" item xs={12}>
						<Card className="event-page-card shadow-large">
							<CardMedia
								alt={details.title}
								className="event-banner-image"
								component="img"
								image={details.image_url}
								title={details.title}
							/>
							<CardContent className="event-page-content-container">
								<Grid container direction="row" item xs={12}>
									<Grid container direction="column" item sm={6} xs={12}>
										<Typography className="event-title" component="h4" variant="h5">
											{details.title}
										</Typography>
										<Typography component="h2" variant="subtitle1">
											{details.category} | {details.city || details.venue_addr} | ₹{details.price}
										</Typography>
										<Typography className="event-title" component="h4" variant="h5">
											Only {details.max_attendees - details.attendees} left !!!
										</Typography>
									</Grid>
									<Grid className="event-button-container" container item sm={6} xs={12}>
										<Grid>

											<FormControl className="form-select">
												<InputLabel>Tickets</InputLabel>
												<Select
													className="ticket-select"
													inputProps={{
														name: 'Tickets'
													}}
													onChange={handleNumber}
													value={number}
												// variant="outlined"
												>
													<MenuItem value={1}>1</MenuItem>
													<MenuItem value={2}>2</MenuItem>
													<MenuItem value={3}>3</MenuItem>
													<MenuItem value={4}>4</MenuItem>
													<MenuItem value={5}>5</MenuItem>
													<MenuItem value={6}>6</MenuItem>
												</Select>
											</FormControl>
										</Grid>
										<Grid>
											<Button
												className="event-register-button button-shadow"
												color="primary"
												disabled={!load}
												onClick={displayRazorpay}
												variant="contained"
											>
											Register
											</Button>
										</Grid>
									</Grid>
								</Grid>
							</CardContent>
							{/* <CardActions>
							<Button 
								size="small" 
								color="primary"
								startIcon={<ShareIcon/>}
							>
								Share
							</Button>
						</CardActions> */}
						</Card>
					</Grid>
					<Grid item sm={4} xs={12}>
						<Card className="shadow-large">
							<CardHeader
								title="Share"
							/>
							<CardContent>
								<FacebookShareButton 
									hashtag={'#'+ details.title}
									quote={'Your online destination for hosting'}
									url={process.env.REACT_APP_FB_PAGE}
								>
									<FacebookIcon />
								</FacebookShareButton>
								<TwitterShareButton 
									hashtag={['#'+ details.title, '#eventnest']}
									title={'Hey checkout this event on EventNest ' + '"' + details.title + '"'}
									url={window.location.href}
								>
									<TwitterIcon />
								</TwitterShareButton>
							</CardContent>
						</Card>
					</Grid>
					<Grid item sm={8} xs={12}>
						<Card className="shadow-large">
							<CardHeader
								title="Description"
							/>
							<CardContent>
								{details.description}
							</CardContent>
						</Card>
					</Grid>
				</Grid>
				<Grid item lg={2}></Grid>
			</Grid>
		</StylesProvider>
	);
}

export default EventInfo;
