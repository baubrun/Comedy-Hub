import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { confirmCheckoutAction, clearCartAction } from "../actions/actions";
// import "./Confirmation.css"
import Header from "./Header";
import api from "../api";

const Confirmation = () => {
  const [state, setState] = useState({
    orderNum: "",
    total: "",
  });


  useEffect(() => {
    confirm();
  }, []);

  const confirm = async () => {
    const data = await api.read("/orderNum");
    if (data.success) {
      setState({
        orderNum: data.order,
        total: data.amount,
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header text="CONFIRMATION" type="dark" />
      <div className="text-right m-1" id="print" onClick={handlePrint}>
        <img src="print-40.png" alt="" />
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
            {this.props.checkout.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.title}</td>
                  <td>{item.performer}</td>
                  <td>{item.venue.split("_").join(" ")}</td>
                  <td>{item.startDate}</td>
                  <td>{item.startTime}</td>
                  <td>{item.qty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-center my-3">
          <h4>Confirmation #: </h4> {this.state.orderNum}
        </div>
        <div className="text-center my-3">
          <h4>Total Paid: </h4> ${(parseInt(this.state.total) / 100).toFixed(2)}
        </div>
      </div>
    </>
  );
};


export default Confirmation;
