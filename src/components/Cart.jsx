import React, { Component } from "react";
import { connect } from "react-redux";
import MaterialTable from "material-table"

import {
  deleteFromCartAction,
  getItemsBoughtAction,
} from "../actions/actions";



export const currencyFormat = (amount) => {
  return new Intl.NumberFormat("decimal", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
};

const Cart = () => {
  
    return (
      <MaterialTable
      title="Simple Action Preview"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ]}
      data={[
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]}        
      actions={[
        {
          
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        }
      ]}
      localization={{
        header: {
          actions: ""
        }
      }}
    />
    )

  }


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
