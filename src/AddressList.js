import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Typography,
	List,
	ListItem,
	ListItemText,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Grid,
	ListItemIcon,
} from '@mui/material';
import { AddressContext } from './App';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import StoreIcon from '@mui/icons-material/Store';
import PushPinIcon from '@mui/icons-material/PushPin';
import SchoolIcon from '@mui/icons-material/School';
import PlaceIcon from '@mui/icons-material/Place';

const icons = {
	Casa: <HomeIcon />,
	Trabalho: <WorkIcon />,
	Escola: <SchoolIcon />,
	Loja: <StoreIcon />,
	Outros: <PushPinIcon />,
};

const AddressList = () => {
	const { addresses, addAddress } = useContext(AddressContext);
	const [open, setOpen] = useState(false);
	const [newName, setNewName] = useState('');
	const [newAddress, setNewAddress] = useState('');
	const [newIcon, setNewIcon] = useState('Casa');
	const [error, setError] = useState({ name: false, address: false });

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setNewName('');
		setNewAddress('');
		setNewIcon('Casa');
		setError({ name: false, address: false });
	};

	const handleChangeName = (event) => {
		setNewName(event.target.value);
		if (event.target.value.trim() !== '') {
			setError((prev) => ({ ...prev, name: false }));
		} else {
			setError((prev) => ({ ...prev, name: true }));
		}
	};

	const handleChangeAddress = (event) => {
		setNewAddress(event.target.value);
		if (event.target.value.length === 4 && /^\d+$/.test(event.target.value)) {
			setError((prev) => ({ ...prev, address: false }));
		} else {
			setError((prev) => ({ ...prev, address: true }));
		}
	};

	const handleChangeIcon = (event) => {
		setNewIcon(event.target.value);
	};

	const handleAddAddress = () => {
		if (
			newName.trim() !== '' &&
			newAddress.length === 4 &&
			/^\d+$/.test(newAddress)
		) {
			addAddress({ name: newName, address: newAddress, icon: newIcon });
			handleClose();
		} else {
			setError({
				name: newName.trim() === '',
				address: !(newAddress.length === 4 && /^\d+$/.test(newAddress)),
			});
		}
	};

	return (
		<Container maxWidth="sm">
			<Box
				mt={5}
				p={3}
				boxShadow={3}
				sx={{
					border: '1px solid #ccc',
					borderRadius: '8px',
				}}
			>
				<Typography variant="h4" component="h1" gutterBottom>
					Lista de Endereços
				</Typography>
				{addresses.length === 0 ? (
					<Typography gutterBottom>
						Você ainda não possui endereços cadastrados!
					</Typography>
				) : null}
				<List>
					{addresses.map((entry, index) => (
						<React.Fragment key={index}>
							<Box
								component="li"
								sx={{
									border: '1px solid #ccc',
									borderRadius: '8px',
									marginBottom: '8px',
									padding: '8px',
								}}
							>
								<ListItem
									secondaryAction={
										<Button component={Link} to={`/edit/${index}`}>
											<EditIcon />
										</Button>
									}
								>
									<ListItemIcon>{icons[entry.icon]}</ListItemIcon>
									<ListItemText>
										{`${entry.name}`}
										<br />
										{`Endereço: ${entry.address}`}
									</ListItemText>
								</ListItem>
							</Box>
						</React.Fragment>
					))}
				</List>
				<Box mt={2} style={{ textAlign: 'center' }}>
					<Button
						variant="contained"
						color="primary"
						onClick={handleClickOpen}
						startIcon={<PlaceIcon />}
					>
						Adicionar Novo Endereço
					</Button>
				</Box>
			</Box>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Adicionar Novo Endereço</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Por favor, insira um nome, um endereço de 4 dígitos numéricos e
						selecione um ícone.
					</DialogContentText>
					<Grid container spacing={2}>
						<Grid item xs={4} sm={4}>
							<FormControl fullWidth margin="dense">
								<InputLabel>Ícone</InputLabel>
								<Select
									value={newIcon}
									onChange={handleChangeIcon}
									label="Ícone"
								>
									<MenuItem value="Casa">{icons['Casa']}</MenuItem>
									<MenuItem value="Trabalho">{icons['Trabalho']}</MenuItem>
									<MenuItem value="Escola">{icons['Escola']}</MenuItem>
									<MenuItem value="Loja">{icons['Loja']}</MenuItem>
									<MenuItem value="Outros">{icons['Outros']}</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={8} sm={8}>
							<TextField
								fullWidth
								margin="dense"
								label="Nome"
								value={newName}
								onChange={handleChangeName}
								error={error.name}
								helperText={error.name ? 'O nome não pode estar vazio.' : ''}
								inputProps={{ maxLength: 15 }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								margin="dense"
								label="Endereço de 4 dígitos"
								value={newAddress}
								onChange={handleChangeAddress}
								error={error.address}
								helperText={
									error.address
										? 'O endereço deve conter exatamente 4 dígitos numéricos.'
										: ''
								}
								inputProps={{ maxLength: 4 }}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancelar
					</Button>
					<Button
						onClick={handleAddAddress}
						color="primary"
						disabled={error.name || error.address}
					>
						Adicionar
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default AddressList;
