import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { logIn } from "../redux/userSlice";


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
import api from "../api";


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
  signUp: {
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

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    password: "",
    errors: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append("username", values.username);
    form.append("password", values.password);
    setValues({
      ...values,
      username: "",
      password: "",
    });

    const data = await api.login("/login", form);
    if (data.success) {
      dispatch(logIn(data.hostId));
      history.push("/profile");
    } else {
      setValues({ ...values, errors: data.errors });
    }
  };

  const handleCloseErrors = () => {
    setValues({ ...values, errors: [] });
  };

  return (
    <form>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="h6">
            Sign In
          </Typography>

          {/* <Box onClick={handleCloseErrors} 
          style={{ cursor: "pointer" }}>
        {values && values.errors.map((err, idx) => {
          return (
            <div
              className="bg-danger text-light text-center py-2"
              key={idx}
              id="errors"
            >
              {err.msg}
            </div>
          );
        })}
      </Box> */}


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
            <Link className={classes.signUp} to="//register">
              Sign Up
            </Link>
          </span>
        </Typography>
      </Card>
    </form>
  );
};

export default Login;
