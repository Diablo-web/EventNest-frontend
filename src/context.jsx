import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [globalEvents, setGlobalEvents] = useState([]);

	return (
		<AppContext.Provider
			value={{ globalEvents, setGlobalEvents }}
		>
			{children}
		</AppContext.Provider>
	);
};


export const useGlobalContext = () => {
	return useContext(AppContext);
};
  
export { AppContext, AppProvider };