import axios from "axios";
import React, { useState } from "react";
import { TabPane, Tab, FormInput, Form, Button } from "semantic-ui-react";
import { baseUrl, getToken } from "../utils";
function Profile() {
  const token = getToken();
  const [newEmailData, setNewEmailData] = useState({
    password: "",
    newEmail: "",
  });
  const [newPasswordData, setNewPasswordData] = useState({
    password: "",
    newPassword: "",
  });
  const [newDetailsData, setNewDetailsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgPwd, setMsgPwd] = useState("");
  const [msgDetails, setMsgDetails] = useState("");

  function handleUpdateEmail() {
    setLoading(true);
    axios
      .put(`${baseUrl}/updateEmail`, newEmailData, {
        headers: {
          token,
          "access-control-allo-origin": window.location.origin,
        },
      })
      .then(() => {
        setLoading(false);
        setMsg("Email was updated successfully");
        setNewEmailData({
          password: "",
          newEmail: "",
        });
        setTimeout(() => {
          setMsg("");
        }, 5000);
      })
      .catch((err) => {
        setLoading(false);
        console.dir(err);
      });
  }
  function handleUpdatePassword() {
    setLoading(true);
    axios
      .put(`${baseUrl}/updatePassword`, newPasswordData, {
        headers: {
          token,
          "access-control-allo-origin": window.location.origin,
        },
      })
      .then(() => {
        setLoading(false);
        setMsgPwd("Password was updated successfully");
        setNewPasswordData({
          password: "",
          newPassword: "",
        });
        setTimeout(() => {
          setMsgPwd("");
        }, 5000);
      })
      .catch((err) => {
        setLoading(false);
        console.dir(err);
      });
  }
  function handleUpdateDetails() {
    setLoading(true);
    axios
      .put(`${baseUrl}/updateDetails`, newDetailsData, {
        headers: {
          token,
          "access-control-allo-origin": window.location.origin,
        },
      })
      .then(() => {
        setLoading(false);
        setMsgDetails("Details was updated successfully");
        setTimeout(() => {
          setMsgDetails("");
        }, 5000);
      })
      .catch((err) => {
        setLoading(false);
        console.dir(err);
      });
  }
  const panes = [
    {
      menuItem: "Update email",
      render: () => (
        <TabPane>
          <Form
            onChange={(e) => {
              setNewEmailData({
                ...newEmailData,
                [e.target.name]: e.target.value,
              });
            }}
          >
            <FormInput
              name="password"
              type="password"
              label="Password"
              required
              value={newEmailData.password}
            />
            <FormInput
              name="newEmail"
              type="email"
              label="New email"
              required
              value={newEmailData.newEmail}
            />
            <Button loading={loading} onClick={() => handleUpdateEmail()}>
              Update
            </Button>
          </Form>
          <span style={{ color: "green" }}>{msg}</span>
        </TabPane>
      ),
    },
    {
      menuItem: "Update password",
      render: () => (
        <TabPane>
          <Form
            onChange={(e) => {
              setNewPasswordData({
                ...newPasswordData,
                [e.target.name]: e.target.value,
              });
            }}
          >
            <FormInput
              name="password"
              type="password"
              label="Old password"
              required
              value={newPasswordData.password}
            />
            <FormInput
              name="newPassword"
              type="password"
              label="New password"
              required
              value={newPasswordData.newPassword}
            />
            <Button loading={loading} onClick={() => handleUpdatePassword()}>
              Update
            </Button>
          </Form>
          <span style={{ color: "green" }}>{msgPwd}</span>
        </TabPane>
      ),
    },
    {
      menuItem: "Update details",
      render: () => (
        <TabPane>
          {" "}
          <Form
            onChange={(e) =>
              setNewDetailsData({
                ...newDetailsData,
                [e.target.name]: e.target.value,
              })
            }
          >
            <FormInput name="fullName" type="text" label="Full name" />
            <FormInput name="phone" type="text" label="Phone" />
            <FormInput name="address" type="text" label="Address" />
            <Button loading={loading} onClick={() => handleUpdateDetails()}>
              Update
            </Button>
          </Form>
          <span style={{ color: "green" }}>{msgDetails}</span>
        </TabPane>
      ),
    },
  ];
  return (
    <div className="wz-page-container-profile">
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </div>
  );
}

export default Profile;
