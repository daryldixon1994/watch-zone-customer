import React, { useState } from "react";
import "./style.css";
import {
  FormInput,
  FormGroup,
  Form,
  Button,
  Message,
  Checkbox,
} from "semantic-ui-react";
import axios from "axios";
import { baseUrl } from "../utils";
import { useNavigate } from "react-router-dom";
function Login() {
  
  const navigate = useNavigate();
  // const location = useOutlet();
  // console.log(window.history);
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  function handleLogin() {
    setLoading(true);
    axios
      .post(`${baseUrl}/login`, loginData, {
        headers: {
          "access-control-allow-origin": window.location.origin,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("isBanned", res.data.data.isBanned);
        localStorage.setItem("isLoggedIn", res.data.data.isLoggedIn);
        setTimeout(() => {
          setLoading(false);
          // window.history.back();
          navigate("/products");
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        if (!err.response.data.status) {
          setErrMsg(err.response.data.message);
        }
        console.log(err);
      });
  }

  return (
    <div className="wz-page-container">
      <div className="wz-register-bloc">
        <Form
          size="huge"
          onChange={(e) => {
            setLoginData({ ...loginData, [e.target.name]: e.target.value });
          }}
        >
          <FormGroup widths="equal">
            <FormInput
              fluid
              id="form-subcomponent-shorthand-input-first-name"
              label="Email"
              placeholder="Email"
              name="email"
            />
          </FormGroup>
          <FormGroup widths="equal">
            <FormInput
              fluid
              id="form-subcomponent-shorthand-input-last-name"
              label="Password"
              placeholder="Password"
              type={showPwd ? "text" : "password"}
              name="password"
            />
          </FormGroup>
          <FormGroup>
            <Checkbox
              label={showPwd ? "Hide password" : "Show password"}
              onClick={() => setShowPwd(!showPwd)}
            />
          </FormGroup>
          <Button size="huge" loading={loading} onClick={() => handleLogin()}>
            Login
          </Button>
        </Form>
        {errMsg && (
          <Message error header="Credentials error" content={errMsg} />
        )}
      </div>
    </div>
  );
}

export default Login;
