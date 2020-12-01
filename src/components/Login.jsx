/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

import { Link, useHistory } from "react-router-dom";
import { logIn, userState } from "../redux/userSlice";
import { readEvents } from "../redux/eventsSlice";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
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

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loggedIn, error } = useSelector(userState);
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    password: "",
    errorMsg: "",
  });

  useEffect(() => {
    dispatch(readEvents());
  }, []);



  useEffect(() => {
    if (loggedIn) {
      history.push("/profile");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (error) {
      setValues({...values, errorMsg: error})
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
    };

    dispatch(logIn(data));
  };

  return (
    <form>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="h6">
            LogIn
          </Typography>

          {values.errorMsg && (
            <Box
              style={{ cursor: "pointer" }}
              className="bg-danger text-light text-center py-2"
              id="errors"
            >
              {values.errorMsg}
            </Box>
          )}

          <TextField
            className={classes.textField}
            id="username"
            label="Username"
            name="username"
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            type="username"
            value={values.username}
          ></TextField>
          <br />
          <TextField
            className={classes.textField}
            id="password"
            label="Password"
            name="password"
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            type="password"
            value={values.password}
          />
          {values.error && (
            <Typography color="error" component="p">
              <Icon className={classes.error} color="error">
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            className={classes.submit}
            color="primary"
            onClick={(evt) => handleSubmit(evt)}
            variant="contained"
          >
            submit
          </Button>
        </CardActions>
        <br />

        <Typography variant="body2" component="p">
          Not registered? &nbsp;
          <span>
            <Link className={classes.logIn} to="/register">
              Register
            </Link>
          </span>
        </Typography>
      </Card>
    </form>
  );
};

export default Login;
