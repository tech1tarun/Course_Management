import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

export default function Navbar({ onDrawerToggle }) {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap component="div">
            Course Management
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Admin
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
