import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const alertSnackbar = ({open, id, handleSnackbarClose}: {open: boolean, id?: number, handleSnackbarClose: any}) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
            onClose={handleSnackbarClose}
            severity="error"
            variant="filled"
        >
            There is no post associated with id {id}!
        </Alert>
    </Snackbar>
  )
}

export default alertSnackbar