import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import _ from "lodash";

import { cartState } from "../redux/cartSlice";
import Header from "./Header";

export const PK_STRIPE = "pk_test_1jcRkbFeUYqVsCGYpNX51Ggv00oyStF042";
const stripePromise = loadStripe(PK_STRIPE);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    margin: "0 16px",
  },
  info: {
    color: "white",
    fontFamily: "Courier Prime",
  },
}));


const Checkout = () => {
  const classes = useStyles();
  const { items, total } = useSelector(cartState);


  const numTickets = () => {
    return items.map((t) => t.amount).reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <>
      <Header text="CHECKOUT" type="secondary" />
      <Grid container direction="row" alignItems="center" justify="center">
        <Grid item xs={6}>
          <Card className={classes.root}>
            <CardHeader className={classes.info}>
              <Typography className={classes.info} variant="h4">
                CARD DETAIL
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography className={classes.info} variant="h6">
                <Elements stripe={stripePromise}>
                  <CheckoutForm total={total} items={items} />
                </Elements>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardHeader title="SUMMARY"></CardHeader>
            <CardContent>
              <Typography variant="h4">
                {`${numTickets()} ticket${numTickets() > 1 ? "s" : ""} for:`}
                {items.map((item, idx) => (
                  <List key={idx}>
                    <ListItemText>{item.title}</ListItemText>
                  </List>
                ))}
              </Typography>
            </CardContent>
            <Typography variant="h4">TOTAL</Typography>
            <Typography variant="h4">$ {total}</Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};


export default Checkout;
