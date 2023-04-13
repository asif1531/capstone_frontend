import { useContext } from "react";
import { AuthContext } from "./auth";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export function PrivateRoute({ children }) {
  let userInfo = useContext(AuthContext);
  let authToken = localStorage.getItem("token");
  let tokenActive = false;
  let decode;
  if (authToken) {
    decode = jwtDecode(authToken);
    let expiryTime = decode.exp * 1000;
    let curentTime = Date.now();

    if (curentTime < expiryTime) {
      tokenActive = true;
      console.log("i want type of time ", typeof curentTime, curentTime);
    }
  }

  // if(!userInfo.token){
  if (!(authToken && tokenActive)) {
    return <Navigate to="/"></Navigate>;
  }
  return children;
}

export function PrivateRouteforLogin({ children }) {
  let userInfo = useContext(AuthContext);
  let authToken = localStorage.getItem("token");
  let tokenActive = false;
  let decode;
  if (authToken) {
    decode = jwtDecode(authToken);
    let expiryTime = decode.exp * 1000;
    let curentTime = Date.now();

    if (curentTime < expiryTime) {
      tokenActive = true;
    } else {
      localStorage.clear();
    }
  }
  // if(!userInfo.token){
  if (authToken && tokenActive) {
    return <Navigate to="/getLocation"></Navigate>;
  }
  return children;
}
