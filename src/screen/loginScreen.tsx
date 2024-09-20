'use client';

import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setName, setProfile } from '../features/userData/userDataSlice'

const LoginScreen = () => {
	const [user, setUser] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [showPassword, setShowPassword] = useState(false);
	
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
		if(user == "admin" || user == "user") {
			dispatch(setName(user))
			dispatch(setProfile(user))
			navigate('/')
		}
		else {
			alert("Invalid user or password")
		}
	}

	return (
		<div style={{background: 'lightGray', width: 400, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', marginTop: "2%", borderRadius: 15, boxShadow: "3px 5px 10px 5px rgba(0, 0, 0, 0.35)",}}>
			<PersonIcon style={{fontSize: 70, margin: '10px 0px'}}/>
			<div style={{flex: 1}}>
				<p>Login</p>
			</div>
			<div style={{display: 'flex', flexDirection: 'column', flex: 3}}>
				<TextField 
					variant="outlined" 
					label="User" 
					style={{margin: '5px 0px'}} 
					value={user} 
					onChange={(e) => setUser(e.target.value)}
				/>

				<FormControl style={{margin: '10px 0px'}} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
					<OutlinedInput
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
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormControl>

				<Button variant="contained" onClick={login} style={{margin: '10px 0px', backgroundColor: 'black'}}>LOGIN</Button>
			</div>
		</div>
	)
}

export default LoginScreen