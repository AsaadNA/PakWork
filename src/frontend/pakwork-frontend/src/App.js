import React, { Fragment, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-chat-elements/dist/main.css";
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
import JobsResult from "./components/SearchResults/Jobs/JobsResult";
import RequestsResult from "./components/SearchResults/Requests/RequestsResult";
import Request from "./components/requests/Request";
import OrderPage from "./components/order-management/Order/OrderPage";
import Orders from "./components/order-management/Orders";
import Chat from "./components/chat/Chat";

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
                <Route
                  path="/dashboard/available-jobs"
                  exact
                  element={<ProtectedRoute></ProtectedRoute>}
                >
                  <Route
                    path="/dashboard/available-jobs"
                    exact
                    element={<JobsResult></JobsResult>}
                  ></Route>
                </Route>
                <Route
                  path="/dashboard/buyer-requests"
                  exact
                  element={<ProtectedRoute></ProtectedRoute>}
                >
                  <Route
                    path="/dashboard/buyer-requests"
                    exact
                    element={<RequestsResult></RequestsResult>}
                  ></Route>
                </Route>
                <Route path="/gig/:id" exact element={<Gig></Gig>}></Route>
                <Route
                  path="/request/:requestID"
                  exact
                  element={<Request></Request>}
                ></Route>
                <Route
                  path="/gigs/search/:searchText"
                  exact
                  element={<GigsResult></GigsResult>}
                ></Route>
                <Route
                  path="/gigs/search/:searchText/filter"
                  exact
                  element={<GigsResult></GigsResult>}
                ></Route>
                <Route
                  path="/dashboard/orders"
                  exact
                  element={<ProtectedRoute></ProtectedRoute>}
                >
                  <Route
                    path="/dashboard/orders"
                    exact
                    element={<Orders></Orders>}
                  ></Route>
                </Route>
                <Route
                  path="/dashboard/orders/:orderID"
                  exact
                  element={<ProtectedRoute></ProtectedRoute>}
                >
                  <Route
                    path="/dashboard/orders/:orderID"
                    exact
                    element={<OrderPage></OrderPage>}
                  ></Route>
                </Route>
                <Route
                  path="/dashboard/inbox"
                  exact
                  element={<ProtectedRoute></ProtectedRoute>}
                >
                  <Route
                    path="/dashboard/inbox"
                    exact
                    element={<Chat></Chat>}
                  ></Route>
                </Route>
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
