/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Register from "./components/Register";
import Events from "./components/Events";
import EventDetail from "./components/EventDetail";
import UserEventsContainer from "./components/UserEventsContainer";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Checkout from "./components/Checkout"
import Confirmation from "./components/Confirmation";
import Cart from "./components/Cart";
import { useSelector } from "react-redux";
import NotFound from "./components/NotFound";
import { userState } from "./redux/userSlice";
import { cartState } from "./redux/cartSlice";
import { eventsState } from "./redux/eventsSlice";

const App = () => {
  const {events} = useSelector(eventsState);
  const { loggedIn } = useSelector(userState);
  const { items, isOrderSaved } = useSelector(cartState);


  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/register" component={Register} />
          <Route exact={true} path="/events" component={Events} />

          <Route exact={true} path="/event/:id">
            {events && events.length < 1 ? <Redirect to="/events" /> : <EventDetail />}
          </Route>

          <Route exact={true} path="/cart" component={Cart} />
          <Route exact={true} path="/checkout">
          {items && items.length < 1 ? (
              <Redirect to="/events" />
            ) : (
              <Checkout />
            )}
            </Route>

          <Route exact={true} path="/confirmation" component={Confirmation} />
       

          <Route exact={true} path="/profile" component={UserEventsContainer}>
            {!loggedIn ? <Redirect to="/login" /> : <UserEventsContainer />}
          </Route>
          <NotFound />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
