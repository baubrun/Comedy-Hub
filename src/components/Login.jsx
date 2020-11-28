import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInAction } from "../actions/actions";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

// import "./Login.css";
import { Link } from "react-router-dom";
import { dataRequestPost, goToEndpoint } from "../api";

const useStyles = makeStyles({});

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
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

  const handleRegister = () => {
    goToEndpoint("/register", props);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    setValues({
      ...values,
      username: "",
      password: "",
    });

    const lg = await dataRequestPost("/login", data);
    if (lg.success) {
      dispatch(logInAction(lg.hostId));
      goToEndpoint("/profile", props);
      return;
    } else {
      setValues({ ...values, errors: lg.errors });
      return;
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
          <TextField
            className={classes.textField}
            id="email"
            label="Email"
            name="email"
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            type="email"
            value={this.state.email}
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
            value={this.state.password}
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
