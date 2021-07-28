import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, makeStyles, StylesProvider, TextField, Typography } from '@material-ui/core';
import {DropzoneDialog} from 'material-ui-dropzone';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import '../sass/createEvent.scss';
import { red } from '@material-ui/core/colors';
import ImgUpload from '../components/ImgUpload';
import Copyright from './../components/Copyright';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050)',
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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	submit: { 
		padding: '10px',
		margin: theme.spacing(3, 0, 2),
	},
}));

function CreatEvent() {
	const classes = useStyles();
	const [details, setDetails] = useState({});
	const [ open, setOpen] = useState(false);
	const [ files, setFiles ] = useState();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(process.env.REACT_APP_SERVER_URL + '/events', details, { withCredentials: true })
			.then(res => {
				alert('Event created redirecting to dashboard ');
				history.push('/dashboard');
			})
			.catch(err => {
				alert(err);
			});
	};

	const preventSubmit = (e) => {
		e.preventDefault();
	};
	
	function handleChange(event) {
		const inputname = event.target.name;
		const inputvalue = event.target.value;
		const newDetails = { ...details, [inputname]: inputvalue};
		setDetails(newDetails);
	}

	return (
		<StylesProvider injectFirst>
			<Grid className={classes.root} component="main" container>
				<Grid className={classes.image} item md={8} sm={4} xs={false} />
				<Grid component={Paper} elevation={6} item md={4} sm={8} square xs={12}>
					<div className={classes.paper}>
						<Typography component="h1" variant="h5">
							Create Event
						</Typography>
						<form className={classes.form} noValidate onSubmit={preventSubmit}>
							<TextField
								className="event-input"
								id="title"
								label="Event Title"
								margin="normal"
								name="title"
								onChange={handleChange}
								value={details.title}
								variant="outlined"
							/>
							<TextField
								className="event-input"
								label="Event Category"
								margin="normal"
								name="category"
								onChange={handleChange}
								value={details.category}
								variant="outlined"
							/>
							<TextField
								className="event-input"
								id="city"
								label="Event Location"
								margin="normal"
								name="city"
								onChange={handleChange}
								value={details.city}
								variant="outlined"
							/>
							<TextField
								className="event-input"
								id="price"
								label="Ticket Price"
								margin="normal"
								name="price"
								onChange={handleChange}
								type="number"
								value={details.price}
								variant="outlined"
							/>
							<TextField
								// className="event-input"
								fullWidth
								id="max_attendees"
								label="Max max_attendees"
								margin="normal"
								name="max_attendees"
								onChange={handleChange}
								type="number"
								value={details.max_attendees}
								variant="outlined"
							/>
							<ImgUpload 
								details={details}
								files={files}
								filesLimit={1}
								handleChange={handleChange}
								open={open}
								setDetails={setDetails}
								setFiles={setFiles}
								setOpen={setOpen}	
							/>
							<TextField
								fullWidth
								id="description"
								label="Description"
								margin="normal"
								multiline
								name="description"
								onChange={handleChange}
								placeholder="Event Description"
								rows={4}
								value={details.description}
								variant="outlined"
							/>
							<Button 
								className="submit-button"
								color="primary"
								fullWidth
								onClick={handleSubmit}
								type="submit"
								variant="contained"
							>
								Create Event
							</Button>
							<Box mt={5}>
								<Copyright />
							</Box>
						</form>
					</div>
				</Grid>
			</Grid>
		</StylesProvider>
	);
}

export default CreatEvent;
