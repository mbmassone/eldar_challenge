import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const alertSnackbar = ({open, handleSnackbarClose, message}: {open: boolean, handleSnackbarClose: any, message: string}) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
            onClose={handleSnackbarClose}
            severity="error"
            variant="filled"
        >
            {message}
        </Alert>
    </Snackbar>
  )
}

export default alertSnackbar