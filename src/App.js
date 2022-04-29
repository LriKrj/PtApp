import React from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Customerlist from "./components/Customerlist";
import Traininglist from "./components/Traininglist";
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import { useState } from "react";

function App() {
  const [tabs, setTabs] = useState("one");

  const handleChange = (event, tabs) => {
    setTabs(tabs);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Welcome to PT-app</Typography>
        </Toolbar>
        <Tabs value={tabs} onChange={handleChange}>
          <Tab value="one" label="CUSTOMERS" />
          <Tab value="two" label="TRAININGS" />
        </Tabs>
      </AppBar>
      {tabs === "one" && (
        <div>
          <Customerlist />
        </div>
      )}
      {tabs === "two" && (
        <div>
          <Traininglist />
        </div>
      )}
    </div>
  );
}

export default App;
