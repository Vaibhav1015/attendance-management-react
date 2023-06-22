import { right } from "@popperjs/core";
import React from "react";
import AddAttendance from "./AddAttendance";

const Attendance = () => {
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
            <input min="1" className="input-number" type="number" /> entries
          </div>
          <div>
            Search
            <input className="input-search" type="text" />
          </div>
        </div>
        <div className="table-main-div">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Teacher Name</th>
                <th scope="col">Roll Number</th>
                <th scope="col">Attendance Status</th>
                <th scope="col">Attendance Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Tejas Khichade</th>
                <td>1</td>
                <td>Present</td>
                <td>2023-06-22</td>
              </tr>
              <tr>
                <th scope="row">Vaibhav Andhale</th>
                <td>2</td>
                <td>Absent</td>
                <td>2023-06-22</td>
              </tr>
              <tr>
                <th scope="row">Vishal Kamble</th>
                <td>3</td>
                <td>Present</td>
                <td>2023-06-23</td>
              </tr>
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
