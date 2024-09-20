import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const backdrop = ({open}: {open: boolean}) => {
  return (
    <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default backdrop