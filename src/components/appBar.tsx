import { useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';

import { useSelector } from 'react-redux'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '45%',
      minWidth: 200,
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    // width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon

      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //   transition: theme.transitions.create('width'),
    //   [theme.breakpoints.up('sm')]: {
    //     width: '6ch',
    //     '&:focus': {
    //       width: '20ch',
    //     },
    //   },
    },
  }));

  import { useNavigate } from 'react-router-dom';
  import { useDispatch } from 'react-redux'
  import { setName, setProfile } from '../redux/userDataSlice'

const appBar = ({id, setId} : {id?: number, setId: (id?: number) => void}) => {

    const [_open, setOpen] = useState(false);

    const userData = useSelector((state: any) => state.userData)
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const numFilter = (input: string) => {
        return input.replace(/\D/g, '');
    }

    const logout = () => {
        dispatch(setName(""))
        dispatch(setProfile(""))
        navigate('/login')
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 , width: "100%"}}>
                <AppBar position="static" style={{backgroundColor: 'black'}}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <button style={{border: "none", background: "transparent", color: 'white', padding: 0}} onClick={logout}><LogoutIcon /></button>
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Welcome {userData.name}!
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search post by user id"
                                inputProps={{ 'aria-label': 'search' }}
                                value={id || ''} 
                                onChange={(e) => { 
                    
                                    if(numFilter(e.target.value) != '' ) { 
                                        setId(parseInt(numFilter(e.target.value)));
                                    }
                                    else {
                                        setId(undefined)
                                    }
                                }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default appBar