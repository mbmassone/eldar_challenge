'use client';

import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, SnackbarCloseReason } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setName, setProfile } from '../redux/userDataSlice'
import AlertSnackbar from '../components/alertSnackbar';

const LoginScreen = () => {
	const [user, setUser] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [userError, setUserError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const navigate = useNavigate();

	const dispatch = useDispatch()

	
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const login = () => {
		if(password == "") {
			setPasswordError(true)
		}
		else if(user == "") {
			setUserError(true)
		}
		else if(user == "admin" || user == "user") {
			dispatch(setName(user))
			dispatch(setProfile(user))
			navigate('/')
		}
		else {
			setSnackbarOpen(true)
		}
	}

	const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason !== 'clickaway') {
            setSnackbarOpen(false);
        }
    };

	return (
		<div style={{background: 'lightGray', width: 400, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', marginTop: "2%", borderRadius: 15, boxShadow: "3px 5px 10px 5px rgba(0, 0, 0, 0.35)",}}>
			<AlertSnackbar open={snackbarOpen} handleSnackbarClose={handleSnackbarClose} message={"Invalid user or password"}/>
			
			<PersonIcon style={{fontSize: 50, margin: '10px 0px'}}/>
			<div style={{flex: 1}}>
				<h2>Login</h2>
			</div>
			<div style={{display: 'flex', flexDirection: 'column', flex: 3}}>
				<TextField 
					error={userError}
					variant="outlined" 
					label="User" 
					style={{margin: '5px 0px'}} 
					value={user} 
					onChange={(e) => {
						setUser(e.target.value.toLowerCase());
						setUserError(false);
					}}
					sx={{
						'& .MuiInputLabel-root.Mui-focused': {
						  color: 'black',
						},
						'& .MuiOutlinedInput-root': {
							'&.Mui-focused fieldset': {
							  borderColor: 'black',
							},
						},
					}}	
				/>

				<FormControl style={{margin: '10px 0px'}} variant="outlined">
					<InputLabel 
						error={passwordError}
						htmlFor="outlined-adornment-password"
						sx={{
							'&.Mui-focused': {
								color: 'black'
							},
						}}>Password</InputLabel>
					<OutlinedInput
						error={passwordError}
						id="outlined-adornment-password"
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									onMouseUp={handleMouseUpPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
						value={password} 
						onChange={(e) => {
							setPassword(e.target.value);
							setPasswordError(false);
						}}
						sx={{
							'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							  borderColor: 'black',
							},
						}}
					/>
				</FormControl>

				<Button variant="contained" onClick={login} style={{margin: '10px 0px', backgroundColor: 'black'}}>LOGIN</Button>
			</div>
		</div>
	)
}

export default LoginScreen