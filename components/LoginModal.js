import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleClose(); // Clear state + close
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };
  if (!isOpen) return null;

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Login</h2>
        <div className="inputbuttonconatiner">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange(setEmail)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange(setPassword)}
            className="input"
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className=" button create" onClick={handleLogin}>
            Login
          </button>
          <button className="button close" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
