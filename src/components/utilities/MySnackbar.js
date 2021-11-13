import * as React from 'react';
import {Snackbar, Alert} from '@mui/material';


export default function MySnackbar({openSnack, setOpenSnack, snackInfo}) {

  const {message, severity} = snackInfo
  // const {openSnack, setOpenSnack} = React.useContext(TeacherContext)
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  return (
     
      <Snackbar open={openSnack} autoHideDuration={3000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}  sx={{ width: '100%' }}>
          {message}
          
        </Alert>
      </Snackbar>
     
  
  );
}
