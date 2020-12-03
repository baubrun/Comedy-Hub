/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { register, userState } from "../redux/userSlice";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    backgroundColor: "#ff3333",
    color: "white",
    cursor: "pointer",
    verticalAlign: "middle",
    padding: "10px",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  logIn: {
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      fontSize: "16px",
    },
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loggedIn, error } = useSelector(userState);
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    password: "",
    hostId: "",
    errorMsg: "",
  });

  useEffect(() => {
    if (loggedIn) {
      history.push("/profile");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (error) {
      setValues({ ...values, errorMsg: error });
    }
  }, [error]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: values.username,
      password: values.password,
      hostId: values.hostId,
    };

    dispatch(register(data));
  };

  const closeErrors = () => {
    setValues({ ...values, errorMsg: "" });
  };

  return (
    <form onSubmit={(evt) => handleSubmit(evt)}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="h6">
            Register
          </Typography>

          {values.errorMsg && (
               <Box 
               onClick={() => closeErrors()}
               >
                 <Typography className={classes.error} component="p">
                   {values.errorMsg}
                 </Typography>
               </Box>
          )}

          <TextField
            className={classes.textField}
            id="username"
            label="Username"
            name="username"
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            value={values.username}
            required
          />

          <TextField
            className={classes.textField}
            id="password"
            label="Password"
            name="password"
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            type="password"
            value={values.password}
            required
          />

          <TextField
            className={classes.textField}
            id="hostId"
            label="Enter a host name"
            name="hostId"
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            value={values.hostId}
            required
          />
        </CardContent>
        <CardActions>
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item xs={4}>
              <Button
                className={classes.submit}
                color="primary"
                onClick={(evt) => handleSubmit(evt)}
                variant="contained"
                type="submit"
              >
                SUBMIT
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                className={classes.submit}
                color="secondary"
                onClick={() => history.push("/")}
                variant="contained"
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </form>
  );
};

export default Register;
