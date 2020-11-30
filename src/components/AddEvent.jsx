import React from "react";
import Header from "./Header"

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";




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

const AddEvent = ({ dispatchLoading, handleVenueChange }) => {
  const classes = useStyles();

  // const del = document.getElementById("delete-event-btn")
  // const upt = document.getElementById("update-event-btn")
  // const add = document.getElementById("add-event-btn")
  // const hideButtons = () => {
  //   add.disabled = true
  //   del.disabled = true
  //   upt.disabled = true
  // }
  
  return (
    <>
    {/* {hideButtons()} */}
      <div className="add-event-header">
        {/* <h2 className="show-events-addPage" 
        onClick={dispatchLoading}>
          LOAD EVENTS
        </h2> */}
        <Header type="secondary" text="ADD EVENTS" />
      </div>
      <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select">Venue</InputLabel>
            <Select
              labelId="select"
              id="select"
              // value={values.venue}
              onChange={handleVenueChange}
              label="Venue"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="LE_FOU_FOU">LE FOU FOU</MenuItem>
              <MenuItem value="JOKES_BLAGUES">JOKES BLAGUES</MenuItem>
              <MenuItem value="RIRE_NOW">RIRE NOW</MenuItem>
            </Select>
          </FormControl>

    </>
  );
};


export default AddEvent;
