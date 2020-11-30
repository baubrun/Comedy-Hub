import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeEvent } from "../redux/eventsSlice";

import moment from "moment";

import { loadingState } from "../redux/loadingSlice";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from "react-loader-spinner";
import Header from "./Header";

import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";


const loadingSize = 200;

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

export const EventsHistory = (props) => {
  const { loading } = useSelector(loadingState);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className="container-fluid">
      <Header text="EVENTS HISTORY" type="secondary" />

      <div>
        <div className="d-flex justify-content-center">
          <Loader
            type="Rings"
            color="rgba(224, 151, 33, 0.7)"
            height={loadingSize}
            width={loadingSize}
            visible={loading}
          />
        </div>

        <>
          {!loading &&
        <MaterialTable
        title=""
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        options={{
          search: false,
          sorting: false,
          draggable: false,
          headerStyle: {
            backgroundColor: "#663a2b",
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
          props.userEvents.map((item) => {
            return {
              event: item.title,
              performer: item.performer,
              venue: item.venue.split("_").join(" "),
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
                removeEvent({
                  _id: rowData._id,
                })
              ),
          },
     
        ]}
      />
}
        </>
      </div>
    
    </div>
  );
};

export default EventsHistory;


/*
              <div className="row">
                <div className="col text-center">
                  <h3>NO EVENTS</h3>
                </div>
              </div>
*/