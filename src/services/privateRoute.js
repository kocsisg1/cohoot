import { Component } from "react";
import { CheckAuthStatus } from "./auth";
import { Navigate, Route } from "react-router";

export const PrivateRoute = ({ children }) => {
    const  user  = CheckAuthStatus();
    if (!user) {
      // user is not authenticated
      return <Navigate to="/register" />;
    }
    return children;
  };