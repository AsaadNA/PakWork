import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Home from "./containers/home/Home";
import Freelancer from "./containers/signup/freelancer/Freelancer";
import RegularClient from "./containers/signup/client/RegularClient";
import OrganizationalClient from "./containers/signup/organization/OrganizationalClient";
import FreelancerProfile from "./containers/profile/freelancer/Profile";
import ClientProfile from "./containers/profile/client/Profile";
import OrganizationProfile from "./containers/profile/organization/Profile";
import AnimatedLayout from "./components/animated-layout/AnimatedLayout";
import ProtectedRoute from "./Auth/ProtectRoute";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
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
                  element={
                    user ? (
                      user.user_type === "freelancer" ? (
                        <FreelancerProfile></FreelancerProfile>
                      ) : user.user_type === "client" ? (
                        <ClientProfile></ClientProfile>
                      ) : user.user_type === "company_client" ? (
                        <OrganizationProfile></OrganizationProfile>
                      ) : null
                    ) : null
                  }
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
