import React, { useCallback, useEffect, useState } from "react";

import AddEmployeeForm from "./AddEmployeeForm";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";
import NoData from "../../components/NoData";
import ReactPagination from "../../components/ReactPagination";
import EmployeeList from "../../components/EmployeeList";
import { getEmployeePagination } from "../../../middleware/services/employeeService";

const jobs = ["Tester", "Jr Developer", "Sr Developer"];

const Employee = () => {
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const onJobChange = (e) => {
    e.preventDefault();
    setSelectedJobTitle(e.target.value);
    getEmp();
  };

  const getEmp = useCallback(() => {
    setLoading(true);
    getEmployeePagination(itemsPerPage, currentPage, selectedJobTitle).then(
      (res) => {
        setEmployee(res.data);
        setTotalItemsCount(res.data.total);
        setLoading(false);
      }
    );
  }, [currentPage, itemsPerPage, selectedJobTitle]);

  useEffect(() => {
    getEmp();
  }, [getEmp]);

  return (
    <>
      <div className="main-wrapper">
        <div className="head-link-set">
          <div className="employee_count">
            Teachers : {employee && employee.total ? employee.total : 0}
          </div>
          <button
            className="add-employee btn btn-primary px-4"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="employee-icon bi bi-person-add"></i>
            Add Teacher
          </button>

          <div>
            <select
              onChange={onJobChange}
              value={selectedJobTitle}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option value={""}>All Teacher</option>
              {jobs.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <AddEmployeeForm
          getEmployee={getEmp}
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          arialabelledby={"exampleModalLabel"}
          ariaHidden="true"
          selectedJobTitleMethod={setSelectedJobTitle}
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
          <EmployeeList employee={employee} getEmp={getEmp} />
        )}
        {loading && <ReactLoadingSpinner />}
      </div>

      {!loading && employee && employee.length === 0 && <NoData />}
    </>
  );
};

export default Employee;
