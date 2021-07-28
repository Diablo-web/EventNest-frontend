import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './../components/Copyright';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OrgSignup from '../components/OrgSignup';
import CustSignup from '../components/CustSignup';

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

export default function SignUp() {
	const classes = useStyles();
	const [ type, setType ] = useState('customer');

	const handleChange = (event) => {
		setType(event.target.value);
	};

	function CheckType() {
		if(type === 'customer')
			return < CustSignup /> ;
		if(type === 'organizer')
			return < OrgSignup />;
	}
	
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Select
					id="uer-type"
					onChange={handleChange}
					value={type}
				>
					<MenuItem value={'customer'}>Customer</MenuItem>
					<MenuItem value={'organizer'}>Organizer</MenuItem>
				</Select>
				< CheckType />
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}