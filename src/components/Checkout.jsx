import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

import {
  clearCart,
  cartState,
} from "../redux/cartSlice";
import Header from "./Header";


export const PK_STRIPE = "pk_test_1jcRkbFeUYqVsCGYpNX51Ggv00oyStF042";
const stripePromise = loadStripe(PK_STRIPE);

const useStyles = makeStyles((theme) => ({}));

const Checkout = () => {
  const history = useHistory();

  const { items, total } = useSelector(cartState);
  const [state, setState] = useState({
    itemsBought: []
  })



  const filterItemsBought = () => {
    return items.map((i) => {
      return _.pick(i, [
        "title",
        "venue",
        "startDate",
        "startTime",
        "performer",
        "price",
        "amount",
      ]);
    });
  }
    
  useEffect(() => {
    setState(filterItemsBought())
  }, []);



  return (
    <div id="checkout" className="container-fluid bg-dark">
      <Header text="CHECKOUT" type="secondary text-light text-center mb-3" />
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card bg-white">
            <div className="div card-header text-dark bg-white">
              <h3 className="text-center">SUMMARY</h3>
            </div>
            <div className="card-body bg-primary"></div>
            <div className="card-text text-center my-2">
              <h3>TOTAL</h3>
            </div>
            <div className="card-text text-center">
                  <h3>$ {total}</h3>
                </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="card bg-primary">
          <div className="div card-header text-white bg-secondary mb-3">
            <h3 className="text-center">CARD DETAIL</h3>
          </div>
          <div className="card-body">
            <div className="card-text">
              <Elements stripe={stripePromise}>
                <CheckoutForm amount={total} items={state.itemsBought} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
