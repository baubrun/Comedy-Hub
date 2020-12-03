import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import {useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { formattedAmount } from "../Utils";
import { clearCart, cartState, savePayment, processPayment} from "../redux/cartSlice";

import  FormInput  from "./FormInput";
import  Button  from "./Button";

import api from "../api";
import { charge } from "../../controllers/purchase";



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


const CheckoutForm = (props) => {
  const stripe = useStripe();
  const {paySuccess, payError} = useSelector(cartState)
  const dispatch = useDispatch()
  const history = useHistory()
  const elements = useElements();
  const [pmtErrors, setPmtErrors] = useState([]);
  const [values, setValues] = useState()


  // useEffect(() => {
  //   setOrder(orderNumber());
  // }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCloseErrors = () => {
    setPmtErrors([]);
  };

  
  const saveOrder = async (order) => {
    const { amount, items } = props;
    // const data = new FormData();
    // data.append("amount", amount);
    // data.append("itemsBought", JSON.stringify(items));
    // data.append("order", order);

    
    const data = {
      items: JSON.stringify(items),
      amount,
      order: values.order,
      customer: values.name
    }


    dispatch(savePayment(data))
    
    if (paySuccess) {
      dispatch(clearCart())
      history.push("/confirmation");
    } else {
     setPmtErrors([pmtErrors])
    }
  };

  const processPay = async (amount, id, orderNum) => {
    // const stripeData = new FormData();
    // stripeData.append("id", id);
    // stripeData.append("amount", formattedAmount(amount));
    // stripeData.append("order", orderNum);
    // stripeData.append("customer", name);


    const data = {
      id: values.id,
      amount: formattedAmount(amount),
      order: values.orderNum,
      customer: values.name
    }

    dispatch(charge(data))

    if (!paySuccess) {
      setPmtErrors([payError]);
    } else {
      saveOrder(values.order);
    }
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
      processPay(props.amount, id, order);
    } else {
      console.log(error);
    }
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
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

      <div className="stripe-error-msg bg-danger text-light my-2 text-center">
        {pmtErrors.map((err, idx) => {
          return (
            <div
              key={idx}
              className="errors"
              onClick={handleCloseErrors}
              style={{ cursor: "pointer" }}
            >
              {err}
            </div>
          );
        })}
      </div>
      <Button
        color="dark text-white my-3"
        size="block"
        text="PURCHASE"
        type="submit"
        disabled={!stripe || props.loading}
        loading={props.loading}
      ></Button>
    </form>
  );
};


export default CheckoutForm
