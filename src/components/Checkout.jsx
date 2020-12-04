import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import _ from "lodash";
import clsx from "clsx";
import { cartState } from "../redux/cartSlice";
import Header from "./Header";

export const PK_STRIPE = "pk_test_1jcRkbFeUYqVsCGYpNX51Ggv00oyStF042";
const stripePromise = loadStripe(PK_STRIPE);

const useStyles = makeStyles((theme) => ({
  cards: { height: "100vh" },
  purchaseCard: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    margin: "0 16px",
    height: "100vh",
  },
  info: {
    color: "white",
    fontFamily: "Courier Prime",
  },
  summaryCard: {
    borderRadius: "5px",
    backgroundColor: theme.palette.secondary.main,
    fontFamily: "Courier Prime",
    color: "white",
    letterSpacing: "3px",
    padding: "16px",
    textAlign: "center",
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
      <Grid container direction="row" alignItems="center" justify="center" wrap="wrap">
        <Grid item xs={6}>
          <Card className={clsx([classes.purchaseCard, classes.cards])}>
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
          <Card className={clsx([classes.cards])}>
            <CardContent style={{ textAlign: "center" }}>
              <Box>
                <Typography
                  className={classes.summaryCard}
                  color="secondary"
                  variant="h4"
                >
                  SUMMARY
                </Typography>
                <Typography variant="h5">
                  {`${numTickets()} ticket${numTickets() > 1 ? "s" : ""} for:`}
                </Typography>
                {items.map((item, idx) => (
                  <List key={idx}>
                    <ListItemText>
                      <Typography color="primary" variant="h5">
                        {item.title}
                      </Typography>
                    </ListItemText>
                  </List>
                ))}
                <br />

                <Box className={classes.summaryCard}>
                  <Typography style={{ color: "white" }} variant="h4">
                    TOTAL
                  </Typography>
                  <Typography variant="h5">$ {total}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Checkout;
