import { createContext } from "react";

export const ShowModalContext = createContext({});

export const ShowLoginModalContext = createContext({});

export const ShowVerificationModalContext = createContext({});
export const ShowProfilePictureUploadModalContext = createContext({});

export const ShowEditFreelancerProfileModalContext = createContext({});
export const ShowEditClientProfileModalContext = createContext({});
export const ShowEditOrganizationProfileModalContext = createContext({});

export const GigModalContext = createContext({});
export const ClientJobModalContext = createContext({});
export const OrganizationJobModalContext = createContext({});

export const JobDetailModalContext = createContext({});

////

//Accidentally Made Different Context Request for Each Edit,Create :p
export const RequestCreateModalContext = createContext({});
export const RequestEditModalContext = createContext({});
export const RequestDetailModalContext = createContext({});
export const RequestOfferModalContext = createContext({});
