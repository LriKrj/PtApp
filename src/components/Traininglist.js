import React, { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import moment from "moment";

import Edittraining from "./Edittraining";

export default function Traininglist() {
  const [training, setTraining] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => setTraining(data.content))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (link) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(link, { method: "DELETE" })
        .then((response) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  

  const updateTraining = (training, link) => {
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
    {
      headerName: "Activity",
      field: "activity",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Duration (minutes)",
      field: "duration",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },

    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellRenderer: (data) => {
        return moment(data.value).format("DD.MM.YYYY HH:mm");
      },
    },
    {
      headerName: "Edit",
      sortable: false,
      filter: false,
      floatingFilter: false,
      width: 100,
      cellRenderer: (row) => (
        <Edittraining updateTraining={updateTraining} training={row.data} />
      ),
    },
    {
      headerName: "Delete",
      field: "id",
      sortable: false,
      filter: false,
      floatingFilter: false,
      width: 100,
      cellRenderer: (row) => (
        <Button
          size="small"
          onClick={() => deleteTraining(row.data.links[0].href)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: "700px", width: "80%", margin: "auto" }}
    >
      <AgGridReact rowData={training} columnDefs={columns}></AgGridReact>
    </div>
  );
}
