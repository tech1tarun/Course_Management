// src/pages/Register.jsx
import React, { useState } from "react";
import { register, saveToken } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await register(form);
      const { token, user } = res.data;
      saveToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/courses");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Register
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
          label="Name"
          sx={{ mb: 2 }}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
          Register
        </Button>
      </form>
    </Box>
  );
}
