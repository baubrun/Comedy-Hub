/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";

import MaterialTable, { MTableToolbar } from "material-table";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import Nav from "./Nav";

import {
  getTotal,
  removeItem,
  clearCart,
  toggleAmount,
  cartState
} from "../redux/cartSlice";

export const currencyFormat = (amount) => {
  return new Intl.NumberFormat("decimal", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    borderColor: theme.palette.secondary,
  },
  icons: {
    margin: "0 24px",
    width: 60,
    height: 60,
  },
  toolbar: {
    margin: "8px",
  },
  table: {
    margin: "0 8px",
  },
}));



const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector(cartState);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getTotal());
  });

  if (items && items.length < 1) {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h3"> Cart is Empty</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Nav text="MORE TICKETS" loc="events"></Nav>
      <Box className={classes.table}>
        <MaterialTable
          title=""
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <TotalRow classes={classes} total={total} />
              </div>
            ),
          }}
          options={{
            search: false,
            sorting: false,
            draggable: false,
            headerStyle: {
              backgroundColor: "#E09721",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bolder",
              letterSpacing: "2px",
            },
            rowStyle: {
              fontSize: "20px",
            },
          }}
          columns={[
            { title: "Event", field: "event" },
            { title: "Performer", field: "performer" },
            { title: "Price", field: "price", type: "numeric" },
            { title: "Qty", field: "qty", type: "numeric" },
            { title: "Venue", field: "venue" },
            { title: "_id", field: "_id", hidden: true },
          ]}
          data={
            items &&
            items.map((item) => {
              return {
                event: item.title,
                performer: item.performer,
                venue: item.venue,
                price: item.price,
                qty: item.amount,
                _id: item._id,
              };
            })
          }
          actions={[
            {
              icon: () => <DeleteForeverIcon color="secondary" />,
              tooltip: "Remove",
              onClick: (evt, rowData) =>
                dispatch(
                  removeItem({
                    _id: rowData._id,
                  })
                ),
            },
            {
              icon: () => <RemoveCircleOutlineIcon color="primary" />,
              tooltip: "",
              onClick: (evt, rowData) => {
                rowData.qty === 1
                  ? dispatch(
                      removeItem({
                        _id: rowData._id,
                      })
                    )
                  : dispatch(
                      toggleAmount({
                        toggle: "dec",
                        _id: rowData._id,
                      })
                    );
              },
            },
            {
              icon: () => <AddCircleOutlineIcon color="secondary" />,
              tooltip: "",
              onClick: (evt, rowData) => {
                dispatch(
                  toggleAmount({
                    toggle: "inc",
                    _id: rowData._id,
                  })
                );
              },
            },
          ]}
        />
      </Box>
    </>
  );
};

const TotalRow = ({total }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Grid
      className={classes.toolbar}
      container
      justify="space-evenly"
      direction="row"
      alignItems="center"
    >
      <Grid
        container
        justify="space-evenly"
        direction="row"
        alignItems="center"
        item
      >
        <Grid item>
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bolder",
            }}
            variant="contained"
            onClick={() => dispatch(clearCart())}
          >
            CLEAR CART
          </Button>
        </Grid>

        <Grid item>
          <Typography variant="h4">Total : $ {total}</Typography>
        </Grid>
      </Grid>


      <Grid item>
          <Button
            style={{
              backgroundColor: "primary",
              color: "white",
              fontWeight: "bolder",
            }}
            variant="contained"
            onClick={() => history.push("/checkout")}
          >
            CHECKOUT
          </Button>
        </Grid>

    </Grid>
  );
};


export default Cart;
