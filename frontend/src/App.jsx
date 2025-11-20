import { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";

const mdTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Courses />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
