import React from 'react';
import { Typography } from '@material-ui/core';
import { Link }from 'react-router-dom';

export default function Copyright() {
	return (
		<Typography align="center" color="textSecondary" variant="body2">
			{'Copyright © '}
			<Link color="inherit" to='/'>
                EventNest
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}