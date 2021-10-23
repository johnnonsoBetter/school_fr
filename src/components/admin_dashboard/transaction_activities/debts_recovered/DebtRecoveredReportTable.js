import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AmountFormatter from '../../../utilities/AmountFormatter'
import { CancelRounded, CheckRounded } from '@mui/icons-material';
import { blue, green, red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {DateTime} from 'luxon'

const useStyles = makeStyles((theme) => ({

    link: {
        textDecoration: "none",
        color: blue[600]
    }
}))


function Row(props) {
  const { debt_recovered, admin  } = props;
  const {full_name, id} = props.student
  const {title, amount} = props.bill_report
  const {payment_completed, balance, paid} = props.bill  
  const [open, setOpen] = React.useState(false);
  const classes = useStyles()
  const time =  DateTime.fromISO(debt_recovered.created_at).toLocaleString(DateTime.TIME_SIMPLE)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
       
        <TableCell align="center" sx={{textTransform: "capitalize"}} component="th" scope="row">
          {admin.first_name}
        </TableCell>
        <TableCell  align="center">{title}</TableCell>
        <TableCell  align="center"> ₦{AmountFormatter(amount).amount()}</TableCell>
        <TableCell  align="center">₦{AmountFormatter(debt_recovered.amount).amount()}</TableCell>
        <TableCell  align="center"> {payment_completed ? <CheckRounded sx={{color: green[500]}} /> : <CancelRounded sx={{color: red[500]}} /> } </TableCell>
        <TableCell sx={{textTransform: "capitalize"}} align="center">
            <Link className={classes.link} to={`/debtors/${id}/bills?`} > {full_name} </Link>
        </TableCell>
        <TableCell sx={{textTransform: "capitalize"}} align="center">{time}</TableCell>
        
      </TableRow>
     
    </React.Fragment>
  );
}


export default function DebtRecoveredReportTable(props) {
  const {debts_recovered} = props
  return (
    <TableContainer sx={{ maxHeight: "calc(90vh - 200px)" }}  component={Paper}>
      <Table stickyHeader just aria-label="collapsible table">
        <TableHead  >
          <TableRow>
         
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Admin</TableCell>
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Bill Title</TableCell>
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Bill Amount</TableCell>
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Amount Recovered</TableCell>
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Bill Status</TableCell>
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Student</TableCell>
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Time</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {debts_recovered.map((debt_recovered) => (
             <Row key={debt_recovered.id} debt_recovered={debt_recovered} student={debt_recovered.student} bill={debt_recovered.bill} bill_report={debt_recovered.bill_report} admin={debt_recovered.admin}  />
     
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
