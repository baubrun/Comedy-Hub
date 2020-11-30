import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/authSlice";
import  Header  from "./Header";
import  Button  from "./Button";
import { Link, useHistory } from "react-router-dom";
import FormInput  from "./FormInput";
import api from "../api";


const Register = (props) => { 
  const dispatch = useDispatch()
  const history = useHistory()
  const [state, setState] = useState({
      username: "",
      password: "",
      email: "",
      hostId: "",
      errors: [],
    
  })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ [name]: value });
  };

  const handleCancel = () => {
    history.push("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append("username", state.username);
    form.append("password", state.password);
    form.append("email", state.email);
    form.append("hostId", state.hostId);
    setState({
      username: "",
      password: "",
      email: "",
      hostId: "",
    });



    const data = await api.create("/register", form)
    if (data.success) {
      dispatch(logIn(data.hostId));
      history.push("/profile");
    }
    else {
      setState({ errors: data.errors });
    }
  };

  const handleCloseErrors = () => {
    setState({ errors: [] });
  };

    return (
      <>
        <Header text="BIENVENUE TO THE COMEDY HUB" type="dark" />
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <form onSubmit={handleSubmit}>
                <div
                  id="login-card"
                  className="card border-secondary border-0 mt-5"
                >
                  <div className="card-header p-0">
                    <div className="bg-secondary text-white text-center py-2">
                      <h3>
                        <i className="fas fa-user-circle fa-2x"></i> Register
                      </h3>
                    </div>
                  </div>

                  <div onClick={handleCloseErrors} style={{cursor: "pointer"}}>
                      {state.errors.map((err, idx) => {
                          return (
                            <div className="bg-danger text-light text-center py-2" key={idx} id="errors">
                              {err.msg}
                            </div>)
                        })}
                  </div>


                  <div className="card-body border-secondary p-3">
                    <div className="form-group">
                      <div className="input-group mb-2 p">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-user text-secondary"></i>
                          </div>
                        </div>
                        <FormInput
                          name="username"
                          onChange={handleChange}
                          placeholder="Username"
                          type="text"
                          value={state.username}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-key text-secondary"></i>
                          </div>
                        </div>
                        <FormInput
                          name="password"
                          onChange={handleChange}
                          placeholder="Password"
                          type="text"
                          value={state.password}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-envelope text-secondary"></i>
                          </div>
                        </div>
                        <FormInput
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={state.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <label
                      className="text-white font-weight-bold my-2"
                      htmlFor="host"
                    >
                      Choose a host name
                    </label>

                    <div className="form-group">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-portrait text-secondary"></i>
                          </div>
                        </div>
                        <FormInput
                          id="host"
                          type="text"
                          name="hostId"
                          placeholder="Host Name"
                          onChange={handleChange}
                          value={state.hostId}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <Button
                        color="secondary btn-block rounded-0"
                        text="REGISTER"
                        type="submit"
                        onClick={handleSubmit}
                      />
                    </div>
                    <div>
                    <div className="text-center my-3">
                      <Button
                        color="danger btn-block rounded-0"
                        text="CANCEL"
                        type="submit"
                        onClick={handleCancel}
                      />
                    </div>
                    <Link
                        className="text-white font-weight-bold my-2"
                        to="/login"
                      >
                        Already registered? Login.
                      </Link>
                    </div>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

export default Register