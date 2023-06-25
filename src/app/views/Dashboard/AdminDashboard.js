import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Charts from "../../components/Charts";
import DropDown from "../../components/DropDown";
import PieChart from "../../components/PieChart";

const AdminDashboard = () => {
  const presentDays = 20;
  const absentDays = 5;
  const totalWorkingDays = 25;
  const navigate = useNavigate();
  const [count, setCount] = useState();

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    try {
      const response = await axios.get(
        // "http://localhost:5000/api/dash-count"
        "http://192.168.5.85:5000/api/dash-count"
      );
      setCount(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* <Header /> */}
      <div className="main-wrapper">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Employees</h5>
                  <p className="card-text">{count && count.userCount}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Projects</h5>
                  <p className="card-text">{count && count.projectCount}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" onClick={() => navigate("/leave-list")}>
                <div className="card-body">
                  <h5 className="card-title">Leaves</h5>
                  <p className="card-text">{count && count.leaveCount}</p>
                </div>
              </div>
            </div>
            <div className="graph-dashboard">
              <DropDown />
              <div className="select-date">
                <p className="date-title">Select Date</p>
                <input type="date" />
              </div>
              <button type="button" className="fetch-btn ms-3">
                Fetch Graph
              </button>
            </div>
            <div className="chart-main-div">
              <Charts
                presentDays={presentDays}
                absentDays={absentDays}
                totalWorkingDays={totalWorkingDays}
              />

              <PieChart
                presentDays={presentDays}
                absentDays={absentDays}
                workingDays={totalWorkingDays}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
