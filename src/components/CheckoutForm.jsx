import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import {useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { clearCart, cartState, savePayment, processPayment} from "../redux/cartSlice";

import  FormInput  from "./FormInput";
import  Button  from "./Button";


import orderId from "order-id"

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";



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
  }}
));


const CheckoutForm = (props) => {
  const classes = useStyles()
  const stripe = useStripe();
  const {paySuccess, payError, loading} = useSelector(cartState)
  const dispatch = useDispatch()
  const history = useHistory()
  const elements = useElements();
  const [pmtErrors, setPmtErrors] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    orderNum: "",
  })


  const setOrderNum = () => {
    const oid = orderId("MY-SECRET").generate()
    setValues({...values, orderNum: oid})
    return oid
  }

  useEffect(() => {
    // setValues({...values, orderNum:  });
    setOrderNum()
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCloseErrors = () => {
    setPmtErrors("");
  };

  
  const saveOrder = async () => {
    const { total, items } = props;
    // const data = new FormData();
    // data.append("amount", amount);
    // data.append("itemsBought", JSON.stringify(items));
    // data.append("order", order);

    
    const data = {
      items: JSON.stringify(items),
      amount: total,
      order: values.order,
      customer: values.name
    }

    dispatch(savePayment(data))
    
    if (paySuccess) {
      dispatch(clearCart())
      history.push("/confirmation");
    } else {
     setPmtErrors(pmtErrors)
    }
  };

  const processPay = async (total, id) => {
    // const stripeData = new FormData();
    // stripeData.append("id", id);
    // stripeData.append("amount", formattedAmount(amount));
    // stripeData.append("order", orderNum);
    // stripeData.append("customer", name);


    const data = {
      id,
      amount: total * 100,
      order: values.orderNum,
      customer: values.name
    }

    dispatch(processPayment(data))

    if (paySuccess) {
      saveOrder();
    } else {
      setPmtErrors(payError);
    }
  };


  const handleSubmit = async (event) => {
    console.log(" inhandleSubmit");
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
      processPay(props.total, id, values.orderNum);
    } else {
      setPmtErrors(error)
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


export default CheckoutForm
