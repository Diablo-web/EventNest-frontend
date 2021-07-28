import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useUserContext, UserContext } from '../userContext';

import DashboardIcon from '@material-ui/icons/Dashboard';
import '../sass/dashboard.scss';
import '../sass/drawer.scss';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: 'auto',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		
	},
}));

export default function ClippedDrawer({children}) {
	let [user, setUser] = useContext(UserContext);


	const org = (
		<Link className='list-link' to='/dashboard'>
			<ListItem button className='list-button'> 
				<ListItemIcon><DashboardIcon /></ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItem>
		</Link>
	);
	
	const cust = (
		<div>
			<Link className='list-link' to='/wishlist'>
				<ListItem button className='list-button'> 
					<ListItemIcon><FavoriteBorderIcon /></ListItemIcon>
					<ListItemText primary="Wishlist" />
				</ListItem>
			</Link>
			<Link className='list-link' to='/invoices'>
				<ListItem button className='list-button'>
					<ListItemIcon><ReceiptOutlinedIcon /></ListItemIcon>
					<ListItemText primary="Tickets" />
				</ListItem>
			</Link>
		</div>
	);

	return (
		<div className='drawer-root'>
			<CssBaseline />
			<Drawer
				className='drawer'
				classes={{
					paper: 'drawer-paper',
				}}
				variant="permanent"
			>
				<div className='drawer-container'>
					<Divider />
					<List>
						{
							user.type == 'customer' ? 
								cust
								: org
						}
					</List>
					<Divider />
					<List>
						<Link className='list-link' to='/account'>
							<ListItem button className='list-button'> 
								<ListItemIcon><PersonOutlineIcon /></ListItemIcon>
								<ListItemText primary="Profile" />
							</ListItem>
						</Link>
					</List>
					<Divider />
				</div>
			</Drawer>
			<main className='drawer-content'>
				{children}
			</main>
		</div>
	);
}
