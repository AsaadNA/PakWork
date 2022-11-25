import React from "react";
import FreelancerProfile from "./freelancer/Profile";
import ClientProfile from "../profile/client/Profile";
import OrganizationProfile from "../profile/organization/Profile";
import PakworkLogo from "../../assets/pakwork_logo.svg";
const ProfileSelector = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      {user ? (
        user.user_type === "freelancer" ? (
          <FreelancerProfile></FreelancerProfile>
        ) : user.user_type === "client" ? (
          <ClientProfile></ClientProfile>
        ) : user.user_type === "company_client" ? (
          <OrganizationProfile></OrganizationProfile>
        ) : null
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <img
            src={PakworkLogo}
            alt={PakworkLogo}
            height="320px"
            width="320px"
          ></img>
          <h1>
            <strong>404</strong>
            <br />
            Unknown User Type
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;
