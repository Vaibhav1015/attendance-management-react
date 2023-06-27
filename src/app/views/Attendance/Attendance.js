import React, { useCallback, useEffect, useState } from "react";
import ReactPagination from "../../components/ReactPagination";
import AddAttendance from "./AddAttendance";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const fetchAttendanceData = useCallback(async () => {
    // e.preventDefault();
    const response = await fetch(
      `http://192.168.5.85:5000/api/attendance-list?pageSize=${itemsPerPage}&page=${currentPage}`
    );
    if (!response.ok) {
      throw new Error("Something Went wrong ");
    }
    const data = await response.json();
    console.log(data.list.length);
    setAttendanceList(data.list);
    setTotalItemsCount(data.list.length);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);

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
          {filteredData?.length > 0 && (
            <ReactPagination
              getEmp={fetchAttendanceData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItemsCount={totalItemsCount}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
            />
          )}
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
            <tbody>
              {filteredData.map((item) => (
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
