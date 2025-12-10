// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { setAuthToken } from "../api";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button color="inherit" component={Link} to="/">
            <Typography variant="h6">CourseMgmt</Typography>
          </Button>
        </Box>
        <Box>
          <Button color="inherit" component={Link} to="/courses">
            Courses
          </Button>
          {user?.role === "admin" && (
            <Button color="inherit" component={Link} to="/admin">
              Admin
            </Button>
          )}
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/my-courses">
                My Courses
              </Button>
              <Typography component="span" sx={{ mx: 1 }}>
                {user.name || user.email}
              </Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
