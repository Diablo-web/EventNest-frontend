import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Copyright from './../components/Copyright';
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom';
import { useUserContext, UserContext } from '../userContext';
import Alert from '@material-ui/lab/Alert';
import '../sass/signin.scss';

const useStyles = makeStyles((theme) => ({
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function OrgSignin() {

	const [user, setUser] = useContext(UserContext);
	const [error, setError] = useState(false);
	const classes = useStyles();
	const [details, setDetails] = useState({ username: '', password: '' });
	let history = useHistory();
	
	const handleSubmit = (e) => {
		async function submitData() {
			setError(false);
			let httpHeaders = { 'Content-Type': 'application/json' };
			let url = process.env.REACT_APP_SERVER_URL + '/organizer/login';
			//let url = 'http://localhost:4000/customer/login';
			let myHeaders = new Headers(httpHeaders);
			let response = await fetch(url, {
				method: 'POST',
				headers: myHeaders,
				credentials: 'include',
				body: JSON.stringify(details),
			});
			
			if (response.ok) {
				// alert('Signin successfull ');
				let json = await response.json();
				setUser({ data: json, type: 'organizer', loggedIn: true });
				history.push('/');
			}
			else {
				setError(true);
			}
		}
		e.preventDefault();
		submitData();

	};


	function handleChange(event) {
		const inputname = event.target.name;
		const inputvalue = event.target.value;
		const newDetails = { ...details, [inputname]: inputvalue };
		setDetails(newDetails);
	}

	return (
		<form className="form" noValidate onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12} >
					<TextField
						autoFocus
						fullWidth
						id="username"
						label="Username"
						name="username"
						onChange={handleChange}
						required
						value={details.username}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} >
					<TextField
						autoComplete="current-password"
						fullWidth
						id="password"
						label="Password"
						name="password"
						onChange={handleChange}
						required
						type="password"
						value={details.password}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} >
					<Button
						className="submit"
						color="primary"
						fullWidth
						type="submit"
						variant="outlined"
					>
                        Sign In
					</Button>
					{
						error ?
							<Alert severity="error">
								Wrong Username or Password.
							</Alert>
							: null
					}
				</Grid>
			</Grid>
			<Grid container>
				<Grid item sm={6} xs={12}>
					<Link href="#" variant="body2">
                        Forgot password?
					</Link>
				</Grid>
				<Grid item sm={6} xs={12}>
					<Link to='/signup' variant="body2">
						{'Don\'t have an account? Sign Up'}
					</Link>
				</Grid>
			</Grid>
			<Box mt={5}>
				<Copyright />
			</Box>
		</form>	
	);
}