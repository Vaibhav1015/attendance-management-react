import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Charts from "../../components/Charts";
import DropDown from "../../components/DropDown";
import PieChart from "../../components/PieChart";
import { error } from "jquery";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";

const AdminDashboard = () => {
  const [absentData, setAbsentData] = useState([]);
  const navigate = useNavigate();
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState("");

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    try {
      const response = await axios.get(
        // "http://localhost:5000/api/dash-count"
        "https://academic-attendance.onrender.com/api/dash-count"
      );
      setCount(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 3);
  const [date, setDate] = useState(defaultDate);
  const onSetDate = (event) => {
    event.preventDefault();
    setDate(new Date(event.target.value));
  };

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const handleCallback = (userData) => {
    setUserData(userData);
  };
  const fetchData = async () => {
    try {
      if (userData.length !== 0) {
        setIsLoading(true);
        const attendanceGraphUrl = `https://academic-attendance.onrender.com/api/attendance/user?name=${userData}&year=${year}&month=${month}`;
        const data = await fetch(attendanceGraphUrl);
        const result = await data.json();
        setAbsentData(result);
        setIsLoading(false);
      } else {
        return new error("User Data is Empty");
      }
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
              <div className="card" onClick={() => navigate("/employee")}>
                <div className="dashboard-cards card-body">
                  <h5 className="card-title">Teachers</h5>
                  <p className="card-text">{count && count.userCount}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" onClick={() => navigate("/student")}>
                <div className="dashboard-cards card-body">
                  <h5 className="card-title">Students</h5>
                  <p className="card-text">{count && count.studentCount}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" onClick={() => navigate("/project")}>
                <div className="dashboard-cards card-body">
                  <h5 className="card-title">Subjects</h5>
                  <p className="card-text">{count && count.projectCount}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" onClick={() => navigate("/leave-list")}>
                <div className="dashboard-cards card-body">
                  <h5 className="card-title">Leaves</h5>
                  <p className="card-text">{count && count.leaveCount}</p>
                </div>
              </div>
            </div>
            <div className="graph-dashboard">
              <DropDown handleCallback={handleCallback} />
              <div className="select-date">
                <p className="date-title">Select Date</p>
                <input
                  className="dashboard-date"
                  type="month"
                  onChange={onSetDate}
                />
              </div>
              <button
                type="button"
                className="fetch-btn ms-3"
                onClick={fetchData}
              >
                Fetch Graph
              </button>
            </div>
            {isLoading && <ReactLoadingSpinner />}
            {!isLoading && absentData.length !== 0 && (
              <div className="chart-main-div">
                <Charts
                  presentDays={absentData.presentDays}
                  absentDays={absentData.absentDays}
                  totalWorkingDays={absentData.totalWorkingDays}
                />

                <PieChart
                  presentDays={absentData.presentDays}
                  absentDays={absentData.absentDays}
                  workingDays={absentData.totalWorkingDays}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
