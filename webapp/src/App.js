import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ForgotPassword from "./screens/ForgotPassword";
import Dashboard from "./screens/Dashboard";

// React-socks
import { BreakpointProvider } from 'react-socks';

// Redux
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BreakpointProvider>
      <Router>
        <Route path="/" exact component={Dashboard} />
        <Route
          path="/Login"
          exact
          component={Login}
        />
        <Route
          path="/Register"
          exact
          component={Register}
        />
        <Route
          path="/ForgotPassword"
          exact
          component={ForgotPassword}
        />
      </Router>
      </BreakpointProvider>
    </Provider>
  );
}

export default App;
