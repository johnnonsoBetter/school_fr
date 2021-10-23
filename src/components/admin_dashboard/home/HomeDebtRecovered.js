


import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AmountFormatter from '../../utilities/AmountFormatter'
import { CancelRounded, CheckRounded } from '@mui/icons-material';
import { blue, green, red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { makeStyles, styled } from '@mui/styles';


const useStyles = makeStyles((theme) => ({

    link: {
        textDecoration: "none",
        color: blue[600]
    }
}))




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


function Row(props) {
  const { debt_recovered, admin  } = props;
  const {full_name, id} = props.student
  const {title, amount} = props.bill_report
  const {payment_completed, balance, paid} = props.bill  
  const classes = useStyles()

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
       
        <StyledTableCell align="center" sx={{textTransform: "capitalize"}} component="th" scope="row">
          {admin.first_name}
        </StyledTableCell>
        <StyledTableCell  align="center">{title}</StyledTableCell>
        <StyledTableCell  align="center"> ₦{AmountFormatter(amount).amount()}</StyledTableCell>
        <StyledTableCell  align="center">₦{AmountFormatter(debt_recovered.amount).amount()}</StyledTableCell>
        <StyledTableCell  align="center"> {payment_completed ? <CheckRounded sx={{color: green[500]}} /> : <CancelRounded sx={{color: red[500]}} /> } </StyledTableCell>
        <StyledTableCell sx={{textTransform: "capitalize"}} align="center">
            <Link className={classes.link} to={`/debtors/${id}/bills?`} > {full_name} </Link>
        </StyledTableCell>
        <StyledTableCell sx={{textTransform: "capitalize"}} align="center">6:45pm</StyledTableCell>
        
      </StyledTableRow>
     
    </React.Fragment>
  );
}


export default function HomeDebtRecovered(props) {
  const {debts_recovered} = props
  return (
    <TableContainer sx={{ maxHeight: "calc(90vh - 200px)" }}  component={Paper}>
      <Table stickyHeader just aria-label="collapsible table">
        <TableHead  >
          <StyledTableRow>
         
            <StyledTableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Admin</StyledTableCell>
            <StyledTableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Bill Title</StyledTableCell>
            <StyledTableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Bill Amount</StyledTableCell>
            <StyledTableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Amount Recovered</StyledTableCell>
            <StyledTableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Bill Status</StyledTableCell>
            <StyledTableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Student</StyledTableCell>
            <StyledTableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Time</StyledTableCell>
          
          </StyledTableRow>
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




  
//   function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
//   }
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//   ];
  
//    function CustomizedTables() {
//     return (
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//               <StyledTableCell align="right">Calories</StyledTableCell>
//               <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
//               <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
//               <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <StyledTableRow key={row.name}>
//                 <StyledTableCell component="th" scope="row">
//                   {row.name}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.calories}</StyledTableCell>
//                 <StyledTableCell align="right">{row.fat}</StyledTableCell>
//                 <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//                 <StyledTableCell align="right">{row.protein}</StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }
  
  
