import React, { useContext, useState } from "react";
import "./AccountInfo.scss";
import { ActionContext, StateContext } from "../../hooks";

function AccountInfo() {
  const { updateUser } = useContext(ActionContext);
  const { user } = useContext(StateContext);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [idxId] = useState(user.idxId);

  const saveUpdatedUser = () => {
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: email,
      phone_number: phoneNumber,
    };
    updateUser(user.id, updatedUser);
  };
  return (
    <div className="account-info">
      <div className="account-info-container">
        <h2>Account Info</h2>
        <div className="top-margin-set account-info-form-element-container">
          <p>First Name</p>
          <input
            type="text"
            className="account-info-form-element"
            placeholder="Jane"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="top-margin-set account-info-form-element-container">
          <p>Last Name</p>
          <input
            type="text"
            className="account-info-form-element"
            placeholder="Jane"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="top-margin-set account-info-form-element-container">
          <p>Email</p>
          <input
            type="email"
            className="account-info-form-element"
            placeholder="jane@gmail.com"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="top-margin-set bottom-margin-set account-info-form-element-container">
          <p>Phone Number</p>
          <input
            type="tel"
            className="account-info-form-element"
            placeholder="+19999999999"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        {idxId ? (
          <div className="top-margin-set bottom-margin-set account-info-form-element-container">
            <p>IDX DID</p>
            <input
              type="text"
              disabled
              className="account-info-form-element"
              value={idxId}
            />
          </div>
        ) : null}
        <div className="top-margin-set bottom-margin-set account-info-form-element-container">
          <button className="save-button" onClick={saveUpdatedUser}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
