import { right } from "@popperjs/core";
import React, { useEffect, useState, useRef } from "react";
import AddAttendance from "./AddAttendance";
import moment from "moment/moment";
import { useReactToPrint } from "react-to-print";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const componentPdf = useRef();

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
  const filteredData = attendanceList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: "Teacher Data",
    onAfterPrint: () => alert("Data saved in pdf"),
  });
  return (
    <>
      <div className="attendance-main">
        <div className="sub-main-div">
          <div>
            <h3 className="box-heading">Attendance List</h3>
          </div>
          <div className="attendance-div-btn">
            <button className="report-btn" onClick={generatePdf}>
              Report
            </button>
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
          <div className="search-main">
            <p className="fw-bold">Search</p>
            <input
              className="input-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name"
            />
          </div>
        </div>
        <div className="table-main-div" ref={componentPdf}>
          <table className="table">
            <thead className="table-head">
              <tr>
                <th scope="col">Teacher Name</th>
                <th scope="col">Attendance Status</th>
                <th scope="col">Attendance Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item._id}>
                  <th scope="row">{item.name}</th>
                  <td>{item.present ? "present" : "Absent"}</td>
                  <td>{moment(item.date).format("DD-MM-YYYY")}</td>
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
