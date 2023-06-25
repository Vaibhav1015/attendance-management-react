// import { right } from "@popperjs/core";
import React, { useEffect, useState } from "react";
import AddAttendance from "./AddAttendance";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";
import NoData from "../../components/NoData";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      setIsLoading(true);
      const url = "http://192.168.5.85:5000/api/attendance-list";
      // "http://localhost:5000/api/attendance-list"
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something Went wrong ");
      }
      const data = await response.json();
      console.log(data.list);
      setAttendanceList(data.list);
      setIsLoading(false);
    };
    fetchAttendanceData();
  }, []);

  const filteredData = attendanceList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="show-entries">
            <p>Show</p>
            <input min="1" max="10" className="input-number" type="number" />
            <p>entries</p>
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
        <div className="table-main-div">
          <table className="table">
            <thead className="table-head">
              <tr>
                <th scope="col">Teacher Name</th>
                <th scope="col">Attendance Status</th>
                <th scope="col">Attendance Date</th>
              </tr>
            </thead>
            {!isLoading && filteredData && (
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item._id}>
                    <th scope="row">{item.name}</th>
                    <td>{item.present ? "present" : "Absent"}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!isLoading && filteredData.length === 0 && <NoData />}
          {isLoading && <ReactLoadingSpinner />}
        </div>
        <nav aria-label="..." className="pagination-main">
          <ul class="pagination">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                Previous
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item active" aria-current="page">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
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
