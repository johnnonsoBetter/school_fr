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
import {DateTime} from 'luxon'


function Row(props) {
  const { sale, admin  } = props;
  const {item_solds} = sale
  const [open, setOpen] = React.useState(false);
  const time =  DateTime.fromISO(sale.created_at).toLocaleString(DateTime.TIME_SIMPLE)
            

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {admin.first_name}
        </TableCell>
        <TableCell  align="center">₦{AmountFormatter(sale.total).amount()}</TableCell>
        <TableCell sx={{textTransform: "capitalize"}} align="center">{time}</TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell align="center" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Items Sold
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>

                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item_solds.map((item_sold) => (
                    <TableRow key={item_sold.id}>
                      
                      <TableCell align="center">{item_sold.name}</TableCell>
                      <TableCell align="center">
                        {item_sold.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function SaleReportTable(props) {
  const {sales} = props
  return (
    <TableContainer sx={{ maxHeight: "calc(90vh - 200px)" }}  component={Paper}>
      <Table stickyHeader just aria-label="collapsible table">
        <TableHead  >
          <TableRow>
            <TableCell />
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Admin</TableCell>
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Total</TableCell>
            <TableCell sx={{fontWeight: "bolder", fontSize: "1em"}} align="center">Time</TableCell>
            {/* <TableCell align="center">Carbs&nbsp;(g)</TableCell>
            <TableCell align="center">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((sale) => (
            <Row key={sale.id} sale={sale} admin={sale.admin}  />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
