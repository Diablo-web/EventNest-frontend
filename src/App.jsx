import React, { useEffect, useContext } from 'react';
import Homepage from './pages/homepage';
import SignInSide from './pages/signin';
import SignUp from './pages/signup';
import Error from './pages/404';
import Events from './pages/eventsPage.jsx';
import Event from './pages/eventinfo.jsx';
import CreateEvent from './pages/createEvent.jsx';
import Dashboard from './pages/dashboard.jsx';
import AboutUs from './pages/about.jsx';
import ContactUs from './pages/contact.jsx';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { UserContext } from './userContext';
import Navbar from './components/Navbar';
import Invoices from './pages/invoices';
import Invoice from './components/Invoice';
import Wishlist from './pages/wishlist';
import MyAccount from './pages/myAccount';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#6C63FF',
			// main: '#FFB27E',
		},
		type: 'light',
	},
	typography: {
		fontFamily: '\'Josefin Sans\', sans-serif',
	}
});

function App() {
	const [user, setUser] = useContext(UserContext);

	useEffect(() => {
		async function fetchData() {
			let url = 'https://eventnest-server.herokuapp.com/users';
			//let url = 'http://localhost:4000/users'
			let response = await fetch(url,
				{
					method: 'get',
					headers: {
						'Content-type': 'application/json'
					},
					credentials: 'include'
				});
			if (response.ok) {
				let json = await response.json();
				if (user?.data?._id !== json.user._id) {
					setUser({ data: json.user, type: json.type, loggedIn: true });
				}
			}
			else {
				setUser({ data: null, type: null, loggedIn: false });
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		console.log(user);
	}, [user]);

	function checkLoggedIn(redirect) {
		if (user.loggedIn != undefined) {
			if (user.loggedIn) return redirect;
			return (
				<div>
					<Link to='/signin'>
						<h2>yo need to sign in first</h2>
					</Link>
				</div>
			);
		}
		return (
			<div>
				<h2>Loading ...</h2>
			</div>
		);
	}

	return (

		<ThemeProvider theme={theme}>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<Homepage />
					</Route>
					<Route exact path='/signin'>
						<SignInSide />
					</Route>
					<Route exact path='/signup'>
						<SignUp />
					</Route>
					<Route exact path='/events'>
						<Events />
					</Route>
					<Route exact path='/create-event'>
						<CreateEvent />
					</Route>
					<Route exact path='/dashboard'>
						{checkLoggedIn(<Dashboard />)}
					</Route>
					<Route exact path='/wishlist'>
						{checkLoggedIn(<Wishlist />)}
					</Route>
					<Route exact path='/invoices'>
						{checkLoggedIn(<Invoices />)}
					</Route>
					<Route component={Invoice} path='/invoices/:invoice_id' />
					<Route exact path='/aboutus'>
						<AboutUs />
					</Route>
					<Route exact path='/contactus'>
						<ContactUs />
					</Route>
					<Route exact path='/account'>
						{checkLoggedIn(<MyAccount />)}
					</Route>
					<Route component={Event} path='/events/:event_id' />
					<Route path="*">
						<Error />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
