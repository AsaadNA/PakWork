import React, { Fragment, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
// you will also need the css that comes with bootstrap-daterangepicker
import "bootstrap-daterangepicker/daterangepicker.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/home/Home";
import Freelancer from "./containers/signup/freelancer/Freelancer";
import RegularClient from "./containers/signup/client/RegularClient";
import OrganizationalClient from "./containers/signup/organization/OrganizationalClient";

import AnimatedLayout from "./components/animated-layout/AnimatedLayout";
import ProtectedRoute from "./Auth/ProtectRoute";
import ProfileSelector from "./containers/profile/ProfileSelector";
import IsLoggedIn from "./Auth/IsLoggedIn";
import Gig from "./components/freelancer/gigs/Gig";
import NotFound404 from "./components/notfound-404/NotFound404";
import GigsResult from "./components/SearchResults/Gigs/GigsResult";
import { ShowLoginModalContext } from "./contexts/ModalContext";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => {
    setShowLogin(true);
  };
  return (
    <div className="App">
      <ShowLoginModalContext.Provider
        value={{ showLogin, handleCloseLogin, handleShowLogin }}
      >
        <Router>
          <Fragment>
            <Routes>
              <Route element={<AnimatedLayout></AnimatedLayout>}>
                <Route path="/" exact element={<IsLoggedIn></IsLoggedIn>}>
                  <Route path="/" exact element={<Home></Home>}></Route>
                </Route>
                <Route path="/" exact element={<IsLoggedIn></IsLoggedIn>}>
                  <Route
                    path="/signup/freelancer"
                    exact
                    element={<Freelancer></Freelancer>}
                  ></Route>
                </Route>
                <Route path="/" exact element={<IsLoggedIn></IsLoggedIn>}>
                  <Route
                    path="/signup/client"
                    exact
                    element={<RegularClient></RegularClient>}
                  ></Route>
                </Route>
                <Route path="/" exact element={<IsLoggedIn></IsLoggedIn>}>
                  <Route
                    path="/signup/organization"
                    exact
                    element={<OrganizationalClient></OrganizationalClient>}
                  ></Route>
                </Route>
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
                <Route path="/gig/:id" exact element={<Gig></Gig>}></Route>
                <Route
                  path="/gigs/:search"
                  exact
                  element={<GigsResult></GigsResult>}
                ></Route>
                <Route path="*" element={<NotFound404></NotFound404>}></Route>
              </Route>
            </Routes>
          </Fragment>
        </Router>
      </ShowLoginModalContext.Provider>
    </div>
  );
}

export default App;
