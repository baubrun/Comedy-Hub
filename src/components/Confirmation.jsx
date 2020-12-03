import React, { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import Header from "./Header";

import {
  clearCart,
  cartState,
} from "../redux/cartSlice";
import PrintIcon from '@material-ui/icons/Print';


const Confirmation = () => {
  const dispatch = useDispatch()
  const {items, total, orderNumber} = useSelector(cartState)


 useEffect(() => {
    // set
 }, [])


  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header text="CONFIRMATION" type="secondary" />
      <div className="text-right m-1" id="print" onClick={() => handlePrint()}>
        <PrintIcon />
      </div>

      <div className="container-fluid">
        <table className="table my-2">
          <thead>
            <tr>
              <th>Event</th>
              <th>Performer</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Time</th>
              <th># of tickets</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.title}</td>
                  <td>{item.performer}</td>
                  <td>{item.venue}</td>
                  <td>{item.startDate}</td>
                  <td>{item.startTime}</td>
                  <td>{item.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-center my-3">
          <h4>Confirmation #: </h4> {orderNumber}
        </div>
        <div className="text-center my-3">
          <h4>Total Paid: </h4> ${total}
        </div>
      </div>
    </>
  );
};


export default Confirmation;
