// SignupModal.js
import { useState } from "react";
import { createUserWithEmailAndPassword ,  updateProfile } from "firebase/auth";
import { auth } from "../src/firebase";

export default function SignupModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password == confirmPassword && email == "") {
      setError("Please add your email Id");
      return; // Stop execution if passwords don't match
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return; // Stop execution if passwords don't match
    }
    try {
      const userCredential =  await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      handleClose()
      if (error) setError("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(""); // clear error on input
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (error) setError("");
  };
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError("");
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Sign Up</h2>
        <div className="inputbuttonconatiner">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleChange(setName)}
            className="input"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="input"
          />
          <input
            placeholder="Password"
            type="password"
            className="input"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={handleSignup} className="button create">
            Create Account
          </button>
          <button onClick={handleClose} className="button close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
