import React, { useCallback, useEffect, useState } from "react";
import AddStudentForm from "./AddStudentForm";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";
import NoData from "../../components/NoData";
import ReactPagination from "../../components/ReactPagination";
import StudentList from "../../components/StudentList";
import { getStudentPagination } from "../../../middleware/services/studentService";

const Student = () => {
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getEmp = useCallback(() => {
    setLoading(true);
    getStudentPagination(itemsPerPage, currentPage).then((res) => {
      setEmployee(res.data);
      setTotalItemsCount(res.data.total);
      setLoading(false);
    });
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    getEmp();
  }, [getEmp]);

  return (
    <>
      <div className="main-wrapper">
        <div className="head-link-set">
          <div className="employee_count">
            Students : {employee && employee.total ? employee.total : 0}
          </div>
          <button
            className="add-employee btn btn-primary px-4"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="employee-icon bi bi-person-add"></i>
            Add Student
          </button>
        </div>
        <AddStudentForm
          getEmployee={getEmp}
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          arialabelledby={"exampleModalLabel"}
          ariaHidden="true"
          setCurrentPage={setCurrentPage}
        />

        {employee?.total > 0 && (
          <ReactPagination
            getEmp={getEmp}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItemsCount={totalItemsCount}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
          />
        )}

        {!loading && employee.list !== undefined && employee.list !== "" && (
          <StudentList employee={employee} getEmp={getEmp} />
        )}
        {loading && <ReactLoadingSpinner />}
      </div>

      {!loading && employee && employee.length === 0 && <NoData />}
    </>
  );
};

export default Student;
