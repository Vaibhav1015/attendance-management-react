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
          <div>
            <button>Report</button>
            <button data-bs-toggle="modal"
              data-bs-target="#exampleModal">ADD</button>
          </div>
          <AddAttendance
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            arialabelledby={"exampleModalLabel"}
            ariaHidden="true"
          />
        </div>
      </div>
    </>
  );
};

export default Attendance;
