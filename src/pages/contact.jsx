import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
	image: {
		backgroundImage: 'url(https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)',
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
		margin: theme.spacing(3),
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
}));

export default function ContactUs() {
	const classes = useStyles();
	// const [details, setDetails] = useState({});

	// function handleChange(event) {
	// 	const inputname = event.target.name;
	// 	let inputvalue = event.target.value;
	// 	inputvalue = inputvalue.replace(/ /g, '%20');
	// 	const newDetails = { ...details, [inputname]: inputvalue };
	// 	setDetails(newDetails);
	// 	console.log(details);
	// }

	return (
		<Grid className={classes.root} component="main" container>
			<CssBaseline />
			<Grid className={classes.image} item md={7} sm={4} xs={false} />
			<Grid component={Paper} elevation={6} item md={5} sm={8} square xs={12}>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<EmailIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						CONTACT US
					</Typography>
					<form action={"mailto:" + process.env.REACT_APP_CONTACT_EMAIL} className={classes.form} method="GET" encType="multipart/form-data" >
						<TextField
							autoComplete="fname"
							autoFocus
							fullWidth
							id="name"
							label="Name"
							margin="normal"
							name="name"
							variant="outlined"
						/>
						<TextField

							autoComplete="email"
							fullWidth
							id="email"
							label="Email Address"
							margin="normal"
							name="email"
							variant="outlined"

						/>
						<TextField
							fullWidth
							id="subject"
							label="Subject"
							margin="normal"
							name="subject"
							// onChange={handleChange}
							// value={details.subject}
							variant="outlined"
						/>
						<TextareaAutosize
							aria-label="minimum height"
							fullwidth
							margin="normal"
							name="body"
							// onChange={handleChange}
							// value={details.body}
							placeholder="Leave a Message" rowsMin={10} variant="outlined"
						/>
						<Button
							className={classes.submit}
							color="lightgray"
							fullWidth
							type="submit"
							variant="contained"
						>
							SEND MESSAGE
						</Button>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}


