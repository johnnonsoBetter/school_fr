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



function Row(props) {
  const { expense, admin  } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        
        <TableCell sx={{textTransform: "capitalize"}} align="center" component="th" scope="row">
          {admin.first_name}
        </TableCell>
        <TableCell sx={{textTransform: "capitalize"}}  align="center">{expense.title}</TableCell>
        <TableCell sx={{textTransform: "capitalize"}}  align="center">₦{AmountFormatter(expense.amount).amount()}</TableCell>
        <TableCell sx={{textTransform: "capitalize"}} align="center">{expense.created_at}</TableCell>
        
      </TableRow>
      
    </React.Fragment>
  );
}


export default function ExpenseReportTable(props) {
  const {expenses} = props
  return (
    <TableContainer sx={{ maxHeight: "calc(90vh - 200px)" }}  component={Paper}>
      <Table stickyHeader just aria-label="collapsible table">
        <TableHead  >
          <TableRow>
         
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Admin</TableCell>
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Title</TableCell>
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Amount</TableCell>
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Time</TableCell>
            {/* <TableCell align="center">Carbs&nbsp;(g)</TableCell>
            <TableCell align="center">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <Row key={expense.id} expense={expense} admin={expense.admin}  />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
