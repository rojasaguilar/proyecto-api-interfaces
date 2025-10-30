import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ErrorCard from "../components/ErrorCard";
import { getErrors } from "../services/errorService";
import "../styles/errorlog.css";

const ErrorLog = () => {
  const [errors, setErrors] = useState([]);
  const [search, setSearch] = useState("");
  // let filteredErrors = [];

  const obtenerErrores = async () => {
    const fetchedErrors = await getErrors();
    const { data } = fetchedErrors;
    setErrors(data[0]);
  };

  useEffect(() => {
    obtenerErrores();
    console.log(errors)
  }, []);



  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="errorlog-container">
          <h2>Error Log</h2>

          {/* 🔹 Barra superior */}
          <div className="error-filters">
            <div className="filter-buttons">
              <button>All Errors</button>
              <button>Reported 2</button>
              <button className="unresolved">Unresolved 50</button>
              <button className="resolved">Resolved 20990</button>
              <button>Ignored</button>
            </div>
            <div className="search-section">
              <input
                type="text"
                placeholder="Search with Brand, Site, Task ID, Error Message, etc."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select>
                <option>All</option>
                <option>Resolved</option>
                <option>Failed</option>
                <option>Ignored</option>
              </select>
            </div>
          </div>

          {/* 🔹 Timeline */}
          <div className="timeline">
            {errors.length === 0 ? (
              <p>No errors found</p>
            ) : (
              errors.map((err) => (
                <ErrorCard key={err.ERRORID} error={err} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorLog;
