import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { cartState, createPurchase, processPayment } from "../redux/cartSlice";

import FormInput from "./FormInput";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import _ from "lodash";
import Loader from "react-loader-spinner";


const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "black",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "24px",
      color: "#391300",
      "::placeholder": {
        color: "#ffffff",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};


const useStyles = makeStyles((theme) => ({
  input: {
    color: "#fff",
    margin: "8px 0",
    fontSize: "24px",
  },
  error: {
    verticalAlign: "middle",
  },
  purchase: {
    padding: "8px 0",
    fontSize: "24px"
  },
  row: {
    margin: "50px 0",
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
    purchaseCreated,
  } = useSelector(cartState);
  const dispatch = useDispatch();
  const history = useHistory();
  const elements = useElements();
  const [pmtErrors, setPmtErrors] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
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
      order: orderNumber,
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
    <Grid
      container
      direction="column"
      // alignItems="center"
      // justify="center"
    >
      <form>
        <Grid item>
          <Box className={classes.row}>
            <TextField
              fullWidth
              name="name"
              onChange={(evt) => handleChange(evt)}
              placeholder="Name on card"
              required
              value={values.name}
              InputProps={{
                className: classes.input
              }}
            />
          </Box>
        </Grid>

        <Grid item>
          <Box className={classes.row}>
            <TextField
              fullWidth
              onChange={(evt) => handleChange(evt)}
              placeholder="Email"
              name="email"
              required
              value={values.email}
              InputProps={{
                className: classes.input
              }}
            />
          </Box>
        </Grid>

        {<CardElement options={CARD_OPTIONS} />}

        <Grid item>
          {pmtErrors && (
            <Box
              style={{ cursor: "pointer" }}
              className="bg-danger text-light text-center py-2"
              id="errors"
            >
              {pmtErrors}
            </Box>
          )}
        </Grid>

        <Grid item>
          <Box className={classes.row}>
            <Button
            className={classes.purchase}
              color="secondary"
              fullWidth
              text="PURCHASE"
              type="submit"
              disabled={!stripe || loading}
              onClick={(evt) => handleSubmit(evt)}
              variant="contained"
            >
              Purchase &nbsp;
              <span>
               
                {loading && (
                  <Loader
                    type="BallTriangle"
                    color="white"
                    height={40}
                    width={40}
                    visible={loading}
                  />
                )}
              </span>
            </Button>
          </Box>
        </Grid>
      </form>
    </Grid>
  );
};

export default CheckoutForm;
