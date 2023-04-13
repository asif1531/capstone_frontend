import axios from "axios";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../auth";
const Login = () => {
  //OTP
  const navigate = useNavigate();
  let Number = useLocation();
  console.log("test otp", Number.state);

  let userInfo = useContext(AuthContext);
  // let localID = localStorage.getItem("userId");

  const [login, setLogin] = useState({
    phonNumber: "",
    otp: "",
  });
  // let [OTP, setOTP] = useState({
  //   otp: "",
  // });

  let handleChange = (e) => {
    let { name, value } = e.target;
    setLogin((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(login);
  };

  const otpChecking = async () => {
    let { otp, phonNumber } = login;
    if (!otp) {
      toast.error("Enter your 4 digit OTP !");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter your 4 (DIGIT) OTP !");
    } else if (otp.length !== 4) {
      toast.error("Enter your (4) digit OTP !");
    } else {
      let userdata = {
        phonNumber: phonNumber,
        otp: login.otp,
      };
      console.log(userdata);
      // /api/otpverification
      try {
        let verifyOTP = await axios.post(
          "http://localhost:5000/api/otpverification",
          userdata
        );
        console.log("Response from api", verifyOTP);
        if (verifyOTP.status === 200) {
          console.log("from front end otp verify", verifyOTP.data.message._id);
          toast.success("OTP is verifyed ");
          localStorage.setItem("userId", verifyOTP.data.status._id);

          localStorage.setItem("usefName", verifyOTP.data.status.fname);

          localStorage.setItem("phonnumber", verifyOTP.data.status.phonNumber);

          localStorage.setItem("token", verifyOTP.data.status.token);

          userInfo.setAuthToken(verifyOTP.data.status.token);
          // authContext.setAuthToken(verifyOTP.data.message.token);
          userInfo.setphonNumber(verifyOTP.data.status.phonNumber);
          userInfo.setuserId(verifyOTP.data.status.id);
          userInfo.setfname(verifyOTP.data.status.fname);
          navigate("/getLocation", { state: userdata.phonNumber });
        } else {
          toast.error("OTP is NOT verifyed !");
        }
      } catch (e) {
        console.log("Error from Api", e);
      }
    }
  };

  // let navigate = useNavigate();
  // let [PhonNumber, setPhonNumber] = useState({
  //   phonNumber: "",
  // });

  // let handleChange = (e) => {
  //   let { name, value } = e.target;
  //   setPhonNumber({ ...PhonNumber, [name]: value });
  // };

  let sendOtp = async () => {
    const { phonNumber } = login;
    if (!phonNumber) {
      toast.error("Enter your Phone Number !");
    } else {
      let data = {
        phonNumber: login.phonNumber,
      };
      try {
        let sendingOtp = await axios.post(
          "http://localhost:5000/api/otpgenerator",
          data
        );
        if (sendingOtp.status === 200) {
          console.log("status ", phonNumber);
          toast.error(sendingOtp.data.message);
          // navigate("/otp", { state: phonNumber });
        } else {
          toast.error("OTP is not send !");
        }

        console.log("otp ", sendingOtp);
      } catch (e) {
        console.log("Error from Api", e);
      }
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h2 style={{ textAlign: "center" }}>Welcome Back, Log In</h2>
            <div className="card px-5 py-5" id="form1">
              <div className="form-data">
                <div className="forms-inputs mb-4">
                  {" "}
                  <span>Phone Number</span>
                  <input
                    autoComplete="off"
                    placeholder="Please Enter your Mobile Number Here"
                    onChange={handleChange}
                    name="phonNumber"
                    type="text"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="forms-inputs mb-4">
                  {" "}
                  <span>OTP</span>
                  <input
                    autoComplete="off"
                    placeholder="Please Enter your OTP Here"
                    onChange={handleChange}
                    name="otp"
                    type="text"
                    style={{ width: "100%" }}
                  />
                </div>
                {/* <div class="forms-inputs mb-4"> <span>Password</span> 
                    <input autocomplete="off" type="password" v-model="password" />
                        
                    </div> */}
                <div className="mb-3">
                  <div className="container">
                    <div className="row">
                      <div className="col-6">
                        <button
                          className="btn btn-dark w-100"
                          onClick={sendOtp}
                        >
                          Send OTP
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          className="btn btn-dark w-100"
                          onClick={otpChecking}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p style={{ textAlign: "center" }}>
                  Don't have an Account?
                  <NavLink to="/register">SignUp</NavLink>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
