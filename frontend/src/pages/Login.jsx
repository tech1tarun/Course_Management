// src/pages/Login.jsx
import React, { useState } from "react";
import { login, saveToken } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(form);
      const { token, user } = res.data;
      saveToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/courses");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={submit}>
        <TextField
          required
          fullWidth
          label="Email"
          sx={{ mb: 2 }}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          required
          fullWidth
          label="Password"
          type="password"
          sx={{ mb: 2 }}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </Box>
  );
}
