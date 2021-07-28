import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../userContext';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function OrgSignup() {
	const classes = useStyles();
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [details, setDetails] = useState({ username: '',password: '', email: ''});
	const [user, setUser] = useContext(UserContext);
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm({
		mode: 'onChange'
	});
    
	const onSubmit = (e) => {
		async function submitData() {
			setError(false);
			let httpHeaders = { 'Content-Type': 'application/json' };
			let url = process.env.REACT_APP_SERVER_URL + '/organizer';
			let myHeaders = new Headers(httpHeaders);
			let response = await fetch(url, {
				method: 'POST',
				headers: myHeaders,
				credentials: 'include',
				body: JSON.stringify(details),
			});
			let json = await response.json();
			if (response.ok) {
				setUser({ data: json, type: 'organizer', loggedIn: true });
				history.push('/');
			}
			else {
				setError(true);
				setErrorMsg(json.err.message);
				// alert(json.err.message);
			}
		}
		// e.preventDefault();
		submitData();
	};

	function handleChange(event) {
		const inputname = event.target.name;
		const inputvalue = event.target.value;
		const newDetails = { ...details, [inputname]: inputvalue};
		setDetails(newDetails);
	}
	return (
		<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
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
				<Grid item xs={12}>
					<TextField
						autoComplete="email"
						fullWidth
						id="email"
						inputRef={register({
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: 'Please enter a valid Email address.'
							}
						})}
						label="Email Address"
						name="email"
						onChange={handleChange}
						// value={details.email}
						variant="outlined"
					/>
					{
						errors.email ?
							<Alert className="validation-error" severity="error">
								{errors.email.message}
							</Alert>
							: null
					}
				</Grid>
				<Grid item xs={12}>
					<TextField
						autoComplete="current-password"
						fullWidth
						id="password"
						inputRef={register({
							required: 'Required',
							minLength: {
								value: 8,
								message: 'Password must have at least 8 characters'
							},
							maxLength: {
								value: 20,
								message: 'Password can have maximum 20 characters'
							},
							pattern: {
								value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
								message: 'Password must contain atleast 1 special character and 1 number'
							}
						})}
						label="Password"
						name="password"
						onChange={handleChange}
						required
						type="password"
						// value={details.password}
						variant="outlined"
					/>
					{
						errors.password ?
							<Alert className="validation-error" severity="error">
								{errors.password.message}
							</Alert>
							: null
					}
				</Grid>
				<Grid className="" item xs={12}>
					<Button
						className="submit signup-input"
						color="primary"
						fullWidth
						type="submit"
						variant="outlined"
					>
                Sign Up
					</Button>
					{
						error ?
							<Alert severity="error">
								{errorMsg}
							</Alert>
							: null
					}

				</Grid>
			</Grid>
			<Grid container justify="flex-end">
				<Grid item>
					<Link to='/signin' variant="body2">
                        Already have an account? Sign in
					</Link>
				</Grid>
			</Grid>
		</form>
			
	);
}