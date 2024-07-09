import React, { useState } from "react";
import "./style.css";
import { FormField, Button, FormGroup, Form, Input } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils";
function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  function handleRegister() {
    setLoading(true);
    if (!registerData.fullName) {
      setLoading(false);
      return setErrMsg("Full Name is a required field");
    }
    if (!registerData.phone || !registerData.phone.match(/^\d{8}$/)) {
      setLoading(false);
      return setErrMsg("Phone length must contain 8 digits");
    }
    if (
      !registerData.email ||
      !registerData.email.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )
    ) {
      setLoading(false);
      return setErrMsg("Not a valid email");
    }
    if (
      !registerData.password ||
      !registerData.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      setLoading(false);
      return setErrMsg(
        "Password must contain 8 characters,At least one uppercase letter,one lowercase letter, one digit and one special character (e.g., @, #, $, %, etc.)"
      );
    }
    if (!registerData.address) {
      setLoading(false);
      return setErrMsg("Address is a required field");
    }
    console.log("ok");
    axios
      .post(`${baseUrl}/register`, registerData, {
        headers: {
          "access-control-allow-origin": window.location.origin,
        },
      })
      .then((res) => {
        setLoading(false);
        navigate("/login");
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.dir(err);
      });
  }

  return (
    <div className="wz-page-container">
      <div className="wz-register-bloc">
        <h1 style={{ marginBottom: "25px" }}>Create your account.</h1>
        <Form
          size="huge"
          onChange={(e) => {
            setRegisterData({
              ...registerData,
              [e.target.name]: e.target.value,
            });
          }}
        >
          <FormGroup widths="equal">
            <FormField
              id="form-input-control-first-name"
              control={Input}
              label="Full name"
              placeholder="Full name"
              name="fullName"
              required={true}
            />
            <FormField
              id="form-input-control-first-name"
              control={Input}
              label="Phone number"
              placeholder="Phone number"
              name="phone"
              error={
                errMsg.includes("Phone") && {
                  content: errMsg,
                }
              }
              required={true}
            />
          </FormGroup>
          <FormGroup widths="equal">
            <FormField
              id="form-input-control-first-name"
              control={Input}
              label="Email"
              placeholder="Email"
              name="email"
              error={
                errMsg.includes("email") && {
                  content: errMsg,
                }
              }
              required={true}
            />
            <FormField
              id="form-input-control-first-name"
              control={Input}
              label="Password"
              type="password"
              placeholder="Password"
              name="password"
              error={
                errMsg.includes("Password") && {
                  content: errMsg,
                }
              }
              required={true}
            />
          </FormGroup>
          <FormGroup widths="equal">
            <FormField
              id="form-input-control-first-name"
              control={Input}
              label="Address"
              placeholder="Address"
              name="address"
              required={true}
            />
          </FormGroup>
          <Button
            onClick={() => handleRegister()}
            loading={loading}
            size="huge"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
