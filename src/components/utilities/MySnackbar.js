import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TeacherContext from '../../context/teacher/TeacherContext';
import { Paper } from '@mui/material';
import { GppGoodRounded } from '@mui/icons-material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
     
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}  sx={{ width: '100%' }}>
          {message}
          
        </Alert>
      </Snackbar>
     
  
  );
}
