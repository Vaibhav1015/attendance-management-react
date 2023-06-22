import axios from "axios";
import React, { useEffect, useState } from "react";
import SalaryFormAdmin from "./EditForms/SalaryFormAdmin";
import NoData from "../../components/NoData";
import { roles } from "../../../constants/constantFunction";
import { useCallback } from "react";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";
const moment = require("moment");
const Salary = ({ userId, tabId }) => {
  const [salaryData, setSalaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getSalarySlipData = useCallback(() => {
    setIsLoading(true);
    try {
      axios
        .get(`http://192.168.5.85:5000/api/salary-slip/${userId}`)
        .then((res) => {
          setSalaryData(res.data.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error, "error");
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (tabId === "salary-tab") {
      getSalarySlipData();
    }
  }, [tabId, getSalarySlipData]);

  const onViewHandler = (url) => {
    window.open(url);
  };
  const onDeleteHandler = (id) => {
    setIsLoading(true);
    try {
      axios
        .delete(`http://192.168.5.85:5000/api/salary-slip/delete/${id}`)
        .then((res) => {
          if (res.status === 200) {
            getSalarySlipData();
            setIsLoading(false);
          }
        });
    } catch (err) {
      console.log(err, "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="container salaryDetailsDiv">
      {roles() && (
        <button
          className="btn btn-primary rounded-0 ms-3"
          data-bs-toggle="modal"
          data-bs-target="#salaryModalForm"
        >
          Add Salary
        </button>
      )}
      <SalaryFormAdmin
        className="modal fade"
        id="salaryModalForm"
        tabIndex="-1"
        arialabelledby={"exampleModalLabel"}
        ariaHidden="true"
        getSalaryMethod={getSalarySlipData}
        userId={userId}
      />
      <p className="headerText">Salary Details</p>
      <div className="detailsDiv">
        <div className="container text-left">
          <div>
            {isLoading && <ReactLoadingSpinner />}
            {!isLoading && salaryData.length === 0 && <NoData />}
            {!isLoading && salaryData && salaryData.length !== 0 && (
              <table className="table">
                <tbody>
                  {salaryData.map((list) => {
                    return (
                      <tr key={list._id}>
                        <td>{moment(list.date).format("YYYY-MM")}</td>
                        <td
                          onClick={() => onViewHandler(list.slip)}
                          className="viewClass ms-3 bi bi-eye"
                        ></td>
                        {roles() && (
                          <>
                            <td
                              className="deleteDiv delete-icon bi bi-trash"
                              data-bs-toggle="modal"
                              data-bs-target={`#${list._id}deleteSlip`}
                            ></td>

                            <div
                              className="modal fade"
                              id={`${list._id}deleteSlip`}
                              tabIndex="-1"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog  modal-dialog-centered">
                                <div className="modal-content rounded-0">
                                  <div className="modal-body">
                                    Are you sure you want to delete ?
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary rounded-0"
                                      data-bs-dismiss="modal"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger rounded-0"
                                      onClick={() => onDeleteHandler(list._id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
