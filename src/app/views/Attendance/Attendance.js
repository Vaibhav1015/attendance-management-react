import { right } from "@popperjs/core";
import React, { useEffect, useState } from "react";
import AddAttendance from "./AddAttendance";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const response = await fetch(
        "http://192.168.5.85:5000/api/attendance-list"
      );
      if (!response.ok) {
        throw new Error("Something Went wrong ");
      }
      const data = await response.json();
      console.log(data.list);
      setAttendanceList(data.list);
    };
    fetchAttendanceData();
  }, []);

  return (
    <>
      <div className="attendance-main">
        <div className="sub-main-div">
          <div>
            <h3 className="box-heading">Attendance List</h3>
          </div>
          <div className="attendance-div-btn">
            <button className="report-btn">Report</button>
            <button
              className="add-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              ADD
            </button>
          </div>
        </div>
        <div className="show-search-main">
          <div>
            Show
            <input min="1" max="10" className="input-number" type="number" />
            entries
          </div>
          <div>
            Search
            <input className="input-search" type="text" />
          </div>
        </div>
        <div className="table-main-div">
          <table className="table">
            <thead className="table-head">
              <tr>
                <th scope="col">Teacher Name</th>
                <th scope="col">Attendance Status</th>
                <th scope="col">Attendance Date</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((item) => (
                <tr key={item._id}>
                  <th scope="row">{item.name}</th>
                  <td>{item.present ? "present" : "Absent"}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddAttendance
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        arialabelledby={"exampleModalLabel"}
        ariaHidden="true"
      />
    </>
  );
};

export default Attendance;
