import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as yup from 'yup';
import { Redirect, useHistory } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useContext } from 'react';
import { FetchContext } from '../../context/FetchContext';
import AdminContext from '../../context/admin/AdminContext';
import ItemCreator from './create_activities/ItemCreator';
import ExpenseCreator from './create_activities/ExpenseCreator';
import ClassroomCreator from './create_activities/ClassroomCreator';
import BillReportCreator from './create_activities/BillReportCreator';
import SubjectCreator from './create_activities/SubjectCreator';





export default function CreateActivityDrawer() {
 

  const descriptionElementRef = React.useRef(null);
  const history = useHistory()
  const [loading, setLoading] = React.useState(false)
  const {drawerOpen, setDrawerOpen, setDrawerChildType, drawerChildType} = useContext(AdminContext)


 

  React.useEffect(() => {
    if (drawerOpen) {
    
     
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }else{
        //setDrawerChildType('')
    }
  }, [drawerOpen]);



  return (
    <div>
      
      <Dialog
        open={drawerOpen}
       
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{borderRadius: "30px"}} 
        
        
      >
       
        
        <DialogContent dividers={'paper'}>
            
            {
                drawerChildType === 'item' ? <ItemCreator /> : drawerChildType === 'expense' ? <ExpenseCreator /> : drawerChildType === 'classroom' ? <ClassroomCreator />
                : drawerChildType === 'bill' ? <BillReportCreator /> : drawerChildType === "subject" ? <SubjectCreator /> : null
            }
            
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDrawerOpen(false)} >Cancel</Button>
       
        </DialogActions>

      </Dialog>
    </div>
  );
}
