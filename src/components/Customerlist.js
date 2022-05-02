import React, { useState, useEffect } from "react";
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import{CSVLink} from "react-csv"
import Addtraining from "./Addtraining";

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (link) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(link, { method: "DELETE" })
        .then((response) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => fetchData())
      .catch((err) => console.error(err));
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => fetchData())
      .catch((err) => console.error(err));
  };

  const saveTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(training)
    })
    .then((response) => fetchData())
    .catch((err) => console.error(err));
}

  const columns = [
    { headerName: "First name", field: "firstname", sortable: true, filter: true, floatingFilter: true },
    { headerName: "Last name", field: "lastname", sortable: true, filter: true, floatingFilter: true },
    { headerName: "Address", field: "streetaddress", sortable: true, filter: true, floatingFilter: true },
    { headerName: "Postal code", field: "postcode", sortable: true, filter: true, floatingFilter: true },
    { headerName: "City", field: "city", sortable: true, filter: true, floatingFilter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true, floatingFilter: true },
    { headerName: "Phone", field: "phone", sortable: true, filter: true, floatingFilter: true },
    {
      headerName: "Edit",
      width: 100,
      sortable: false,
      cellRenderer: (row) => <Editcustomer updateCustomer={updateCustomer} customer={row.data} />,
    },
    {headerName: 'Trainings', 
          sortable: false, 
          filter: false,
          floatingFilter: false,
          width: 250,
          cellRenderer: row => <Addtraining saveTraining={saveTraining} training={row.data.links[0].href} />
          },

    {
      headerName: "Delete",
      width: 100,
      sortable: false,
      field: 'links.1.href',
      cellRenderer: (row) => (
        <Button color="error" onClick={() => deleteCustomer(row.value)}>
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
      <Addcustomer saveCustomer={saveCustomer} />
      <CSVLink data={customers} filename="customerlist.csv">Download a list of customers</CSVLink>
      <AgGridReact rowData={customers} columnDefs={columns}></AgGridReact>
    </div>
  );
}
