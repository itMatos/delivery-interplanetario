import React, { useContext, useState, useEffect } from 'react';
import {
	Container,
	TextField,
	Button,
	Typography,
	Box,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from '@mui/material';
import { AddressContext } from './App';
import { useParams, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import StoreIcon from '@mui/icons-material/Store';
import PushPinIcon from '@mui/icons-material/PushPin';
import SchoolIcon from '@mui/icons-material/School';

const icons = {
	Casa: <HomeIcon />,
	Trabalho: <WorkIcon />,
	Escola: <SchoolIcon />,
	Loja: <StoreIcon />,
	Outros: <PushPinIcon />,
};

const EditAddressForm = () => {
	const { index } = useParams();
	const navigate = useNavigate();
	const { addresses, updateAddress } = useContext(AddressContext);
	const [localName, setLocalName] = useState('');
	const [localAddress, setLocalAddress] = useState('');
	const [localIcon, setLocalIcon] = useState('Casa');
	const [error, setError] = useState({ name: false, address: false });

	useEffect(() => {
		if (addresses[index]) {
			setLocalName(addresses[index].name);
			setLocalAddress(addresses[index].address);
			setLocalIcon(addresses[index].icon);
		}
	}, [addresses, index]);

	const handleChangeName = (event) => {
		setLocalName(event.target.value);
		if (event.target.value.trim() !== '') {
			setError((prev) => ({ ...prev, name: false }));
		} else {
			setError((prev) => ({ ...prev, name: true }));
		}
	};

	const handleChangeAddress = (event) => {
		setLocalAddress(event.target.value);
		if (event.target.value.length === 4 && /^\d+$/.test(event.target.value)) {
			setError((prev) => ({ ...prev, address: false }));
		} else {
			setError((prev) => ({ ...prev, address: true }));
		}
	};

	const handleChangeIcon = (event) => {
		setLocalIcon(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (
			localName.trim() !== '' &&
			localAddress.length === 4 &&
			/^\d+$/.test(localAddress)
		) {
			updateAddress(index, {
				name: localName,
				address: localAddress,
				icon: localIcon,
			});
			alert(`Endereço ${localAddress} atualizado com sucesso!`);
			navigate('/');
		} else {
			setError({
				name: localName.trim() === '',
				address: !(localAddress.length === 4 && /^\d+$/.test(localAddress)),
			});
		}
	};

	return (
		<Container maxWidth="sm">
			<Box mt={5} p={3} boxShadow={3}>
				<Typography variant="h5" component="h2" gutterBottom>
					Editar Endereço
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label="Nome"
						variant="outlined"
						fullWidth
						margin="normal"
						value={localName}
						onChange={handleChangeName}
						error={error.name}
						helperText={error.name ? 'O nome não pode estar vazio.' : ''}
					/>
					<TextField
						label="Endereço de 4 dígitos"
						variant="outlined"
						fullWidth
						margin="normal"
						value={localAddress}
						onChange={handleChangeAddress}
						error={error.address}
						helperText={
							error.address
								? 'O endereço deve conter exatamente 4 dígitos numéricos.'
								: ''
						}
					/>
					<FormControl fullWidth margin="dense">
						<InputLabel>Ícone</InputLabel>
						<Select value={localIcon} onChange={handleChangeIcon} label="Ícone">
							<MenuItem value="Casa">{icons['Casa']}</MenuItem>
							<MenuItem value="Trabalho">{icons['Trabalho']}</MenuItem>
							<MenuItem value="Escola">{icons['Escola']}</MenuItem>
							<MenuItem value="Loja">{icons['Loja']}</MenuItem>
							<MenuItem value="Outros">{icons['Outros']}</MenuItem>
						</Select>
					</FormControl>
					<Button variant="contained" color="primary" type="submit" fullWidth>
						Atualizar
					</Button>
				</form>
			</Box>
		</Container>
	);
};

export default EditAddressForm;
