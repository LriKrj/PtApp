import React, { useState, useEffect } from "react";
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import moment from "moment";

export default function Traininglist() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
      .then((response) => response.json())
      .then((data) => setWorkouts(data.content))
      .catch((err) => console.error(err));
  };

  const deleteWorkout = (link) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(link, { method: "DELETE" })
        .then((response) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const saveWorkout = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((response) => fetchData())
      .catch((err) => console.error(err));
  };


const updateWorkout = (training, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((response) => fetchData())
      .catch((err) => console.error(err));
  };

  const columns = [
    { headerName: "Activity", field: "activity", sortable: true, filter: true },
    { headerName: "Duration (minutes)", field: "duration", sortable: true, filter: true },
    { headerName: "First name", field: 'customer.firstname', sortable: true, filter: true },
    { headerName: "Last name", field: 'customer.lastname', sortable: true, filter: true },
    { headerName: "Date", field: "date", sortable: true, filter: true, cellRenderer: (data) => {
        return moment(data.value).format("DD.MM.YYYY HH:mm")
    } }
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: "700px", width: "80%", margin: "auto" }}
    >
      
      <AgGridReact rowData={workouts} columnDefs={columns}></AgGridReact>
    </div>
  );
}