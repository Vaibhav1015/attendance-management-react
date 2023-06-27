import React, { useCallback, useEffect, useState, useRef } from "react";
import AddAttendance from "./AddAttendance";
import moment from "moment/moment";
import { useReactToPrint } from "react-to-print";
import { Pagination } from "react-bootstrap";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const componentPdf = useRef();

  const fetchAttendanceData = useCallback(async () => {
    const response = await fetch(
      `http://192.168.5.85:5000/api/attendance-list`
    );
    if (!response.ok) {
      throw new Error("Something Went wrong ");
    }
    const data = await response.json();
    setAttendanceList(data.list);
  }, []);

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);

  const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: "Teacher Data",
    onAfterPrint: () => alert("Data saved in pdf"),
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = attendanceList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentItems = attendanceList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(attendanceList.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
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
          <div className="select-item-page">
            <p>Show</p>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <p>Page</p>
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
              {searchQuery !== ""
                ? filteredData.map((item) => (
                    <tr key={item._id}>
                      <th scope="row">{item.name}</th>
                      <td>{item.present ? "present" : "Absent"}</td>
                      <td>{moment(item.date).format("DD-MM-YYYY")}</td>
                    </tr>
                  ))
                : currentItems.map((item) => (
                    <tr key={item._id}>
                      <th scope="row">{item.name}</th>
                      <td>{item.present ? "present" : "Absent"}</td>
                      <td>{moment(item.date).format("DD-MM-YYYY")}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <Pagination>
          <Pagination.First onClick={() => paginate(1)} />
          <Pagination.Prev
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          />
          {Array.from(Array(totalPages).keys()).map((pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              active={pageNumber + 1 === currentPage}
              onClick={() => paginate(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
            }
          />
          <Pagination.Last onClick={() => paginate(totalPages)} />
        </Pagination>
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
