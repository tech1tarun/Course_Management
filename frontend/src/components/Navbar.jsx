// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // remove axios header too
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

          {!token ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          ) : (
            <>
              <Typography component="span" sx={{ mr: 1 }}>
                {user ? user.name : "User"}
              </Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
