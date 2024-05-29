import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddressList from './AddressList';
import EditAddressForm from './EditAddressForm';

export const AddressContext = createContext();

const App = () => {
	const [addresses, setAddresses] = useState([]);

	const addAddress = (newAddress) => {
		setAddresses([...addresses, newAddress]);
	};

	const updateAddress = (index, updatedAddress) => {
		const newAddresses = [...addresses];
		newAddresses[index] = updatedAddress;
		setAddresses(newAddresses);
	};

	return (
		<AddressContext.Provider value={{ addresses, addAddress, updateAddress }}>
			<Router>
				<Routes>
					<Route path="/" element={<AddressList />} />
					<Route path="/edit/:index" element={<EditAddressForm />} />
				</Routes>
			</Router>
		</AddressContext.Provider>
	);
};

export default App;
