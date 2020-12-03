import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  cartState,
  createPurchase,
  processPayment,
} from "../redux/cartSlice";

import FormInput from "./FormInput";
import Button from "./Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";


import _ from "lodash";

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "black",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "18px",
      color: "#424770",
      "::placeholder": {
        color: "#37383b",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const useStyles = makeStyles((theme) => ({
  error: {
    verticalAlign: "middle",
  },
}));

const CheckoutForm = (props) => {
  const classes = useStyles();
  const stripe = useStripe();
  const { 
    paySuccess, 
    payErrorMsg, 
    loading, 
    orderNumber,
    purchaseCreated } = useSelector(cartState);
  const dispatch = useDispatch();
  const history = useHistory();
  const elements = useElements();
  const [pmtErrors, setPmtErrors] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    orderNum: "",
  });

  useEffect(() => {
    if (paySuccess) {
      saveOrder();
    }
  }, [paySuccess]);

  useEffect(() => {
    if (purchaseCreated) {
      history.push("/confirmation");
    }
  }, [purchaseCreated]);

  useEffect(() => {
    if (payErrorMsg) {
      setPmtErrors(payErrorMsg);
    }
  }, [payErrorMsg]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const getItemsIDs = () => {
    const ids = props.items.map((i) => {
      return _.pick(i, ["_id"]);
    });
    return ids;
  };

  const saveOrder = () => {
    console.log("in save order");
    const { total } = props;
    const data = {
      customer: values.name,
      items: JSON.stringify(getItemsIDs()),
      amount: total,
      orderNumber,
    };
    dispatch(createPurchase(data));
  };

  const processPay = async (total, id) => {
    const data = {
      id,
      amount: total * 100,
      order: values.orderNum,
      customer: values.name,
    };
    dispatch(processPayment(data));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: values.name,
        email: values.email,
      },
    });
    if (!error) {
      const { id } = paymentMethod;
      processPay(props.total, id, orderNumber);
    } else {
      setPmtErrors(error);
    }
  };

  return (
    <form className="form-group">
      <fieldset>
        <FormInput
          className=""
          type="text"
          name="name"
          onChange={(evt) => handleChange(evt)}
          placeholder="Name on Card"
          required
          value={values.name}
        />
      </fieldset>
      <fieldset id="stripe-input">
        <FormInput
          type="text"
          onChange={(evt) => handleChange(evt)}
          placeholder="Email"
          name="email"
          required
          value={values.email}
        />
      </fieldset>
      <fieldset className="form-control">
        {<CardElement options={CARD_OPTIONS} />}
      </fieldset>

      {pmtErrors && (
        <Box
          style={{ cursor: "pointer" }}
          className="bg-danger text-light text-center py-2"
          id="errors"
        >
          {pmtErrors}
        </Box>
      )}

      <Button
        color="secondary"
        size="large"
        text="PURCHASE"
        type="submit"
        disabled={!stripe || loading}
        loading={loading}
        onClick={(evt) => handleSubmit(evt)}
      ></Button>
    </form>
  );
};

export default CheckoutForm;
