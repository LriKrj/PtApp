import React from "react";
import './App.css';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Customerlist from "./components/Customerlist";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Welcome to PT-app</Typography>
        </Toolbar>
      </AppBar>
      <Customerlist />
    </div>
  );
}

export default App;