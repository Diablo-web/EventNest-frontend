import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OrgSignin from '../components/OrgSignin';
import CustSignin from '../components/CustSignin';

export default function SignInSide() {
	const [ type, setType ] = useState('customer');

	const handleChange = (event) => {
		setType(event.target.value);
	};

	function CheckType() {
		if(type === 'customer')
			return < CustSignin /> ;
		if(type === 'organizer')
			return < OrgSignin />;
	}
	
	return (
		<StylesProvider injectFirst>
			<Grid className="signin-root" component="main" container>
				<CssBaseline />
				<Grid className="signin-image" item md={8} sm={3} xs={false} />
				<Grid component={Paper} elevation={6} item md={4} sm={9} square xs={12}>
					<div className="signin-paper">

						<Avatar className="avatar">
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<Select
							id="uer-type"
							onChange={handleChange}
							value={type}
						>
							<MenuItem value={'customer'}>Customer</MenuItem>
							<MenuItem value={'organizer'}>Organizer</MenuItem>
						</Select>
						<CheckType />
					</div>
				</Grid>
			</Grid>

		</StylesProvider>
	);
}