import React, { useState } from "react";
import Container from "@mui/material/Container";
import { TextField, Button, Typography } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Validate password: at least 8 characters and contain at least one uppercase letter or one symbol ($, ^, &, *, @)
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    console.log("minLength =", minLength)
    const hasCapital = /[A-Z]/.test(password);
    console.log("hasCapital =", hasCapital)

    const hasSymbol = /[\$^&*@]/.test(password);
    console.log("hasSymbol =", hasSymbol)

    return minLength && (hasCapital && hasSymbol);
  };

  // Handle changes in the password field
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check validity of the new password
    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters and contain at least one capital letter or one symbol ($^&*@)."
      );
    } else {
      setError("");
    }

    // Also, if confirmPassword exists, check if they match
    if (confirmPassword && newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (confirmPassword && validatePassword(newPassword)) {
      setError("");
    }
  };

  // Handle changes in the confirm password field
  const handleConfirmPasswordChange = (e) => {
    const newConfirm = e.target.value;
    setConfirmPassword(newConfirm);
    if (password !== newConfirm) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  };

  // Handle form submission
  const submitUser = (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    // Final check before submission
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters and contain at least one capital letter or one symbol ($^&*@)."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // If no errors, submit the form data
    const formData = new FormData(event.target);
    console.log(
      "Form submitted",
      formData.get("username"),
      formData.get("password")
    );
    // Clear error after submission or show a success message here
  };

  return (
    <Container
      component="form"
      onSubmit={submitUser}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
        rowGap: "20px",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="user_name_field"
        name="username"
        label="Name (username)"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id="password_field"
        name="password"
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <TextField
        id="confirm_password_field"
        name="confirmPassword"
        label="Confirm Password"
        variant="standard"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      {/* Display error message if any */}
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Container>
  );
};

export default LoginForm;
