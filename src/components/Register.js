import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  let navigate = useNavigate();

  let [inputData, setInputdata] = useState({
    fname: "",
    phonNumber: "",
  });

  let inputChange = (e) => {
    let { name, value } = e.target;
    setInputdata({ ...inputData, [name]: value });
  };
  console.log(inputData);

  let register = async () => {
    let { fname, phonNumber } = inputData;

    if (!fname) {
      toast.error("Enter your Full Name !");
    } else if (!phonNumber) {
      toast.error("Enter your PhonNumber !");
    } else if (phonNumber.length !== 10) {
      toast.error("Enter 10 digit PhonNumber !");
    } else {
      try {
        let submitData = await axios.post(
          "http://localhost:5000/api/createUser",
          inputData
        );
        <div style={{ textAlign: "center" }}>
          toast.success("User Register ");
        </div>;
        toast.success("User Register ");

        if (submitData.status === 200) {
          setInputdata({ ...inputData, fname: "", phonNumber: "" });

          navigate("/");
        } else {
          toast.error("User registration failed !");
        }
      } catch (e) {
        console.log("Error from Api", e);
      }
    }
  };
  return (
    <>
      <center>
        <div className="container mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <h1 style={{ textAlign: "center" }}>Sign Up</h1>
              <div className="card px-5 py-5" id="form1">
                <div className="form-data">
                  <div className="forms-inputs mb-4">
                    {" "}
                    <span>Full Name</span>
                    <input
                      autoComplete="off"
                      onChange={inputChange}
                      name="fname"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="form-data">
                    <div className="forms-inputs mb-4">
                      {" "}
                      <span>Phone Number</span>
                      <input
                        autoComplete="off"
                        onChange={inputChange}
                        name="phonNumber"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </div>

                    <div className="mb-3">
                      {" "}
                      <button className="btn btn-dark w-100" onClick={register}>
                        Sign Up
                      </button>{" "}
                    </div>
                    <p style={{ textAlign: "center" }}> </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Register;
