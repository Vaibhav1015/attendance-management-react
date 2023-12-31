import React, { useCallback, useEffect, useState, useRef } from "react";
import AddAttendance from "./AddAttendance";
import moment from "moment/moment";
import { useReactToPrint } from "react-to-print";
import { Pagination } from "react-bootstrap";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const componentPdf = useRef();

  const fetchAttendanceData = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://academic-attendance.onrender.com/api/attendance-list`
    );
    if (!response.ok) {
      throw new Error("Something Went wrong ");
    }
    const data = await response.json();
    setAttendanceList(data.list);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAttendanceData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
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

  const filterDate = attendanceList.filter((item) =>
    item.date.includes(dateSearch)
  );

  const bothSearch = filterDate.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // console.log(filterDate, "filter date >>>>");
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
            <div className="d-flex">
              <p className="me-2  fw-bold">Search by date</p>
              <input
                type="date"
                value={dateSearch}
                onChangeCapture={(e) => setDateSearch(e.target.value)}
              ></input>
            </div>
            <div className="main-input-div">
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
            {isLoading && <div className="loaderDiv"></div>}
            {!isLoading && httpError && (
              <p className="d-flex mt-5 text-danger justify-content-end">
                {httpError}
              </p>
            )}
            <tbody>
              {searchQuery === "" && dateSearch === ""
                ? currentItems.map((item) => (
                    <tr key={item._id}>
                      <th scope="row">{item.name}</th>
                      <td>{item.present ? "present" : "Absent"}</td>
                      <td>{moment(item.date).format("DD-MM-YYYY")}</td>
                    </tr>
                  ))
                : searchQuery !== "" && dateSearch === ""
                ? filteredData.map((item) => (
                    <tr key={item._id}>
                      <th scope="row">{item.name}</th>
                      <td>{item.present ? "present" : "Absent"}</td>
                      <td>{moment(item.date).format("DD-MM-YYYY")}</td>
                    </tr>
                  ))
                : searchQuery === "" && dateSearch !== ""
                ? filterDate.map((item) => (
                    <tr key={item._id}>
                      <th scope="row">{item.name}</th>
                      <td>{item.present ? "present" : "Absent"}</td>
                      <td>{moment(item.date).format("DD-MM-YYYY")}</td>
                    </tr>
                  ))
                : searchQuery !== "" && dateSearch !== ""
                ? bothSearch.map((item) => (
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
