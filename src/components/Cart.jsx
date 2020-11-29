import React, { Component } from "react";
import { connect } from "react-redux";


import MaterialTable, { MTableToolbar } from "material-table";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import Nav from "./Nav";
import { deleteFromCartAction, getItemsBoughtAction } from "../actions/actions";

export const currencyFormat = (amount) => {
  return new Intl.NumberFormat("decimal", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
};

const totalRow = (classes) => {
  return (
    <Grid
      className={classes.toolbar}
      container
      justify="space-evenly"
      direction="row"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h4">Total : $ 456</Typography>
      </Grid>
    </Grid>
  );
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
    margin : "0 8px"
  }
}));

const Cart = () => {
  const classes = useStyles();
  return (
    <>
      <Nav text="Cart" type="dark"></Nav>
      <Box className={classes.table}>
        

      
      <MaterialTable
      title=""
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              {totalRow(classes)}
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
          }
        }}
        columns={[
          { title: "Event", field: "event" },
          { title: "Venue", field: "venue" },
          { title: "Price", field: "price", type: "numeric" },
          { title: "Qty", field: "qty", type: "numeric" },
        ]}
        data={[
          { event: "Mehmet", venue: "Baran", price: 1987, qty: 63 },
        ]}
        actions={[
          {
            icon: () => <DeleteForeverIcon color="secondary"/>,
            tooltip: "Remove",
            onClick: (event, rowData) => alert("You saved " + rowData.name),
          },
          {
            icon: () => <RemoveCircleOutlineIcon color="primary"/>,
            tooltip: "",
            onClick: (event, rowData) => alert("You saved " + rowData.name),
          },
          {
            icon: () => <AddCircleOutlineIcon color="secondary"/>,
            tooltip: "",
            onClick: (event, rowData) => alert("You saved " + rowData.name),
          },
        ]}
        // localization={{
        //   header: {
        //     actions: "",
        //   },
        // }}
      />
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delItem: (item) => dispatch(deleteFromCartAction(item)),
    getBoughtItems: (items) => dispatch(getItemsBoughtAction(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
