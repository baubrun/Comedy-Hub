import React, {Component} from "react";
import HomePage from "./components/HomePage"
import {BrowserRouter, Route, Redirect} from "react-router-dom"
import Register from "./components/Register";
import Events from "./components/Events";
import EventDetail from "./components/EventDetail"
import Profile from "./components/Profile"
import Login from "./components/Login"
import NavBar from "./components/NavBar"
import Checkout from "./components/Checkout"
import Confirmation from "./components/Confirmation"
import Cart from "./components/Cart"
import  {connect, useSelector}  from "react-redux";

  const App = () => {


  const events = useSelector(state => state.events)
  const {loggedIn} = useSelector(state => state.auth)
  const checkout = useSelector(state => state.checkout)


    return (
      <div>
        <BrowserRouter>
        <NavBar />
        <Route exact={true} path="/" component={HomePage}/>
        <Route exact={true} path="/login" component={Login}/>
        <Route exact={true} path="/register" component={Register}/>
        <Route exact={true} path="/events" component={Events}/>
        {/* <Route exact={true} path="/event/:id" component={EventDetail}/> */}

        <Route exact={true} path="/event/:id">
          {events.length < 1 ? <Redirect to="/events" /> : <EventDetail />}
        </Route>


        <Route exact={true} path="/cart" component={Cart}/>
        <Route exact={true} path="/checkout" component={Checkout}/>
        <Route exact={true} path="/confirmation">
          {checkout.length < 1 ? <Redirect to="/events" /> : <Confirmation />}
        </Route>
        <Route exact={true} path="/profile">
          {!loggedIn ? <Redirect to="/login" /> : <Profile/>}
        </Route >
        </BrowserRouter>

      </div>
    )
  }



const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    checkout: state.checkout
  }
}


export default connect(mapStateToProps,)(App);


