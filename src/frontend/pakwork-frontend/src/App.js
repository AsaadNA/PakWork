import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/home/Home";
import Freelancer from "./containers/signup/freelancer/Freelancer";
import RegularClient from "./containers/signup/client/RegularClient";
import OrganizationalClient from "./containers/signup/organization/OrganizationalClient";

import AnimatedLayout from "./components/animated-layout/AnimatedLayout";
import ProtectedRoute from "./Auth/ProtectRoute";
import ProfileSelector from "./containers/profile/ProfileSelector";

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
                  element={<ProfileSelector></ProfileSelector>}
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
