import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Home from "./containers/home/Home";
import Freelancer from "./containers/signup/freelancer/Freelancer";
import RegularClient from "./containers/signup/regular_buyer/RegularClient";
import OrganizationalClient from "./containers/signup/organizational_buyer/OrganizationalClient";
import Profile from "./containers/profile/freelancer/Profile";
import AnimatedLayout from "./components/animated-layout/AnimatedLayout";
import ProtectedRoute from "./Auth/ProtectRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Routes>
            <Route element={<AnimatedLayout></AnimatedLayout>}>
              <Route path="/" exact element={<Home></Home>}></Route>
              <Route
                path="/signup/freelancer"
                exact
                element={<Freelancer></Freelancer>}
              ></Route>
              <Route
                path="/signup/client"
                exact
                element={<RegularClient></RegularClient>}
              ></Route>
              <Route
                path="/signup/organization"
                exact
                element={<OrganizationalClient></OrganizationalClient>}
              ></Route>
              <Route
                path="/dashboard/profile"
                exact
                element={<ProtectedRoute></ProtectedRoute>}
              >
                <Route
                  path="/dashboard/profile"
                  exact
                  element={<Profile></Profile>}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
