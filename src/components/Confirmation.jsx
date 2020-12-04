import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

import { cartState } from "../redux/cartSlice";
import PrintIcon from "@material-ui/icons/Print";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Confirmation = () => {
  const { receipt } = useSelector(cartState);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header text="CONFIRMATION" type="secondary" />
      <Box onClick={() => handlePrint()}>
        <PrintIcon style={{ fontSize: "50px", cursor: "pointer" }} />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>Performer</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell># of tickets</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipt.items.map((item, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.performer}</TableCell>
                  <TableCell>{item.venue}</TableCell>
                  <TableCell>{item.startDate}</TableCell>
                  <TableCell>{item.startTime}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Typography variant="h6">Confirmation #:&nbsp; {receipt.orderNumber} </Typography>{" "}
      </Box>
      <Box>
        <Typography variant="h6">Total Paid:&nbsp;${receipt.total} </Typography>
      </Box>
    </>
  );
};

export default Confirmation;
