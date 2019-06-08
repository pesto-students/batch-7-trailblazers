import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./components/SignUp";
import SnackBarProvider from "./context/SnackBarProvider";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <SnackBarProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </SnackBarProvider>
  );
}

export default App;
