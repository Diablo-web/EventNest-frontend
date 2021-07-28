import React from 'react';
import Avatar from '@material-ui/core/Avatar';
//import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
//import TextField from '@material-ui/core/TextField';

//import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { blue, indigo, green, pink } from '@material-ui/core/colors';




function Copyright() {
	return (
		<Typography align="center" color="textSecondary" variant="body2">
			{'Copyright © '}
			<Link to="/">
				Procyon
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},

	root1: {

		display: 'flex',
		'& > *': {
			margin: theme.spacing(4),
		},
	},
	image: {
		backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=60)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(5),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '90%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		padding: '20px',
		margin: theme.spacing(3, 0, 2),
	},
	blue: {
		color: theme.palette.getContrastText(blue[500]),
		backgroundColor: blue[500],
	},
	indigo: {
		color: '#fff',
		backgroundColor: indigo[500],
	},
	green: {
		color: '#fff',
		backgroundColor: green[500]
	},
	pink: {
		color: theme.palette.getContrastText(pink[500]),
		backgroundColor: pink[500],
	},
}));


export default function AboutUs() {
	const classes = useStyles();

	return (
		<Grid className={classes.root} component="main" container>
			<CssBaseline />
			<Grid className={classes.image} item md={7} sm={4} xs={false} />
			<Grid component={Paper} elevation={6} item md={5} sm={8} square xs={12}>
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						ABOUT US
					</Typography>
					<form className={classes.form} noValidate>
						<h3>Our philosophy</h3>
						<p>This website is an event logistics and marketing company. It offers A-Z event planning services from a team of experienced and energetic event planners, suppliers, venues and more. One of the main reasons behind the success of Event Planner is the fact that the team does not charge fees to its clients! With the number of events we organise, Procyon does not need to add exorbitant fees and mark-ups to make its profit margins. This ensures that our clients list, which is constantly growing, make regular use of our services.</p>
						<h3>The Team</h3>
						<p>The Event Planner team is made up of a mix of people. James and Ilona take care of corporate events. Josette is the wedding guru. Nicole is the creative one. Sergio is the merchandise expert. In addition to this group of people, a large support team helps out in everything the company does, in office work to on-site logistics planning. One thing we can truly say about our team is that we are very passionate about our job!</p>
						<h3>How can we help you organise a successful event?</h3>
						<p>1.      A-Z event planning. We shall work on your event from beginning to end. You may relax and leave all the logistics to us.</p>
						<p>2.      Venue Consultancy. Finding a venue in Malta is not as easy as people make it sound. While offering an extensive list of venues on our website, we know and have contact with hundreds of venues around the Maltese Islands, one of which will most definitely fit into your event scenario.</p>
						<p>3.      We organise: product launches, gala receptions, seminars and conferences, staff events, awards nights, team building events, B2B and B2C networking events, weddings and more.</p>
						<p>4.      We give you more: transport services, photography, videography, furniture rental, entertainment, sound and lighting, branding, security, RSVP communication and follow up, staff, sms/email marketing, handle VIPs, catering and any event-related consultancy.</p>
						<Typography className={classes.root1} component="h3" variant="h4">
							Share Us
						</Typography>
						<div className={classes.root1}>
							<Avatar className={classes.blue}>
								<TwitterIcon />
							</Avatar>
							<Avatar className={classes.indigo}>
								<FacebookIcon />
							</Avatar>
							<Avatar className={classes.green}>
								<WhatsAppIcon />
							</Avatar>
							<Avatar className={classes.pink}>
								<InstagramIcon />
							</Avatar>
						</div>

						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
