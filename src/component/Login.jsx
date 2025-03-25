"use client"; // Enables interactivity
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {CircularProgress, Box, Paper, Typography , TextField, Link, Button } from "@mui/material";
import { validateUser } from "./LoginValidation"; // Import server function

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading]= useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Handle login
  const handleLogin = async () => {
    const response = await validateUser(username, password);
    setMessage(response.message);
    if (response.success) {
      setTimeout(() => navigate("./Home"), 1000); // Redirect after 1 sec
    } else {
      setLoading(false); // Hide loading on failure
    }
  };

  return (
    <Box
      component={Paper}
      elevation={16}
      sx={{
        width: 400,
        margin: "50px auto",
        padding: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Are you a new user?
      </Typography>
      <Link href="#" underline="hover">
        Sign Up
      </Link>

      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="dense"
          autoComplete="false"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="dense"
          value={password}
          autoComplete="false"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>

        {message && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Login;
