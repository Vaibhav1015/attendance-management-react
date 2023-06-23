import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Charts from "../../components/Charts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState();

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    try {
      const response = await axios.get(
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
            <div>
              <Charts />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
