import React, { Component } from "react";
import { connect } from "react-redux";
import MaterialTable, {MTableToolbar,} from "material-table";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { deleteFromCartAction, getItemsBoughtAction } from "../actions/actions";

export const currencyFormat = (amount) => {
  return new Intl.NumberFormat("decimal", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
};

const totalRow = () => {
  return (
    <Grid container justify="space-evenly" direction="row" alignItems="center">
    <Grid item>
      <Typography variant="h4">Total : $ 456</Typography>
    </Grid>
   </Grid>

  )
}

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
}));


const Cart = () => {
  return (
    <MaterialTable
    components={{
      Toolbar: props => (
        <div>
          <MTableToolbar {...props} />
          {totalRow()}
        </div>
      ),
    }}
      options={{
        search: false,
        sorting: false,
        draggable: false
       
      }}
      title="Simple Action Preview"
      columns={[
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname" },
        { title: "Birth Year", field: "birthYear", type: "numeric" },
        {
          title: "Birth Place",
          field: "birthCity",
          lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
        },
      ]}
      data={[
        { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
        {
          name: "Zerya Betül",
          surname: "Baran",
          birthYear: 2017,
          birthCity: 34,
        },
      ]}
      actions={[
        {
          icon: () => <DeleteForeverIcon />,
          tooltip: "Remove",
          onClick: (event, rowData) => alert("You saved " + rowData.name),
        },
      ]}
      localization={{
        header: {
          actions: "",
        },
      }}
    />
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
