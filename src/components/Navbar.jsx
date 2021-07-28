import React, { useState, useEffect, useContext, useRef } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import classNames from 'classnames';
import { Avatar, Button, Grid, Paper, StylesProvider } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { useUserContext, UserContext } from '../userContext';
import axios from 'axios';
import '../sass/navbar.scss';

const useStyles = makeStyles((theme) => ({
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

function displayResult(events) {
	return display(events);
}

function display(event, i) {
	console.log(event);
	return (
		<Link className="card-link" key={i} to={`/events/${event._id}`}>
			<Button
				className="search-button"
				fullWidth
			>
				<Grid container>
					<Grid item xs={2}>
						<Avatar alt="imgage url" src={event.image_url} variant="rounded" />
					</Grid>
					<Grid item xs={10}>
						<Typography className="search-title">
							{event.title}
						</Typography>
						<Typography className="search-details">
							{event.category}, {event.city || 'Online'}
						</Typography>
					</Grid>
				</Grid>
			</Button>
		</Link>
	);
}

function NavLinks() {
	return (
		<Toolbar className="no-min-height">
			<Link className="nav-links" to='/' variant="contained">
				Music
			</Link>
			<Link className="nav-links" to='/' variant="contained">
				Comedy
			</Link>
			<Link className="nav-links" to='/' variant="contained">
				Arts
			</Link>
			<Link className="nav-links" to='/' variant="contained">
				Fitness
			</Link>
		</Toolbar>
	);
}

function Search() {
	const [anchorEl, setAnchorEl] = useState(null);
	const isSearchOpen = Boolean(anchorEl);

	const handleSearchOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleSearchClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const [input, setInput] = useState('');
	const [results, setResults] = useState([]);
	const [notfound, setNotfound] = useState(false);

	const handleSearch = async (event) => {
		const input = event.target.value;
		setResults([]);
		setInput(input);

		if (input) {
			axios
				.get(process.env.REACT_APP_SERVER_URL + '/events/search/' + input)
				.then(res => {
					const data = res.data;
					let newDetails = [];
					let events = [];
					for (const type of data) {
						for (const event of type) {
							if (events.includes(event._id) == false) {
								events.push(event._id);
								newDetails.push(event);
							}
						}
					}
					if (newDetails.length != 0) {
						setNotfound(false);
						setResults(newDetails);
					} else {
						setNotfound(true);
					}
				}, err => console.log(err));

		} else {
			setNotfound(false);
			setResults([]);
		}
	};

	return (
		<div className='search-bar'>
			<div className='search-icon'>
				<SearchIcon />
			</div>
			<InputBase
				className='input-root input-input'
				inputProps={{ 'aria-label': 'search' }}
				onChange={handleSearch}
				placeholder="Search…"
				value={input}
			/>
			{
				input ?
					<Paper className="search-result">
						{
							notfound ?
								<Button className="search-button" fullWidth>Not Found</Button>
								:
								<div>
									{results.map(displayResult)}
								</div>
						}
					</Paper>
					: null
			}
		</div>
	);
}

export default function Navbar() {
	let [user, setUser] = useContext(UserContext);
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		axios
			.get(process.env.REACT_APP_SERVER_URL + '/logout', { withCredentials: true })
			.then(res => {
				console.log(res.data);
				setUser({ loggedIn: false });
				setAnchorEl(null);
				handleMobileMenuClose();
			})
			.catch(err => {
				console.log(err);
			});
	};

	const org = (
		<Link className='no-underline' to='/dashboard'>
			<MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
		</Link>
	);

	const cust = (
		<div>
			<Link className='no-underline' to='/wishlist'>
				<MenuItem onClick={handleMenuClose}>Wishlist</MenuItem>
			</Link>
			<Link className='no-underline' to='/invoices'>
				<MenuItem onClick={handleMenuClose}>Tickets</MenuItem>
			</Link>
		</div>
	);

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			onClose={handleMenuClose}
			open={isMenuOpen}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			{
				user.type == 'customer' ?
					cust
					: org
			}
			<Link className='no-underline' to='/account'>
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			</Link>
			<MenuItem onClick={handleLogout}>Logout</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';

	let renderMobileMenu;
	if (user.loggedIn) {
		renderMobileMenu = (
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				id={mobileMenuId}
				keepMounted
				onClose={handleMobileMenuClose}
				open={isMobileMenuOpen}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				{
					user.type == 'customer' ?
						cust
						: org
				}
				<Link className='no-underline' to='/account'>
					<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
				</Link>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		);
	} else {
		renderMobileMenu = (
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				id={mobileMenuId}
				keepMounted
				onClose={handleMobileMenuClose}
				open={isMobileMenuOpen}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Link className='no-underline' to='/signin'>
					<MenuItem onClick={handleMenuClose}>Sign in</MenuItem>
				</Link>
			</Menu>
		);
	}


	return (
		<StylesProvider injectFirst>
			<div className='grow navbar'>
				<AppBar className="no-shadow" color="primary" position="static">
					<Toolbar>
						<div className="title-search-container">
							<Search />
							<Typography className={classNames(classes.title, 'title')} variant="h5">
								<Link className="logo" to="/">EventNest</Link>
							</Typography>
						</div>
						<div className='grow' />
						<div className={classes.sectionDesktop}>
							{user.loggedIn ?
								<Button
									color="inherit"
									onClick={handleProfileMenuOpen}
									startIcon={<Avatar alt="avatar" className="avatar-img" src={user.data.imageUrl} variant="circle" />}
								>
									<Typography className='display-name'>
										{user.data.display_name || user.data.username}
									</Typography>
								</Button>
								:
								<Link
									className='no-underline'
									to='/signin'
								>
									<Button
										className="login-button"
										variant="outlined"
									>
										Log in
									</Button>
								</Link>
							}
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								aria-label="show more"
								color="inherit"
								onClick={handleMobileMenuOpen}
							>
								<AccountCircle />
							</IconButton>
						</div>
					</Toolbar>
					{/* <NavLinks /> */}
				</AppBar>
				{renderMobileMenu}
				{renderMenu}
			</div>
		</StylesProvider >
	);
}
