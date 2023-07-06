import React, { useCallback, useEffect, useState } from "react";
import LeaveView from "./LeaveView";
import { getAllLeave } from "../../../middleware/services/leaveService";

const AdminLeaveList = () => {
  const [leaveList, setLeaveList] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState("Pending");

  const getLeaveList = useCallback(async () => {
    getAllLeave(leaveStatus).then((response) => {
      setLeaveList(response.data);
    });
  }, [leaveStatus]);

  useEffect(() => {
    getLeaveList();
  }, [getLeaveList]);

  const onStatusChange = (e) => {
    e.preventDefault();
    setLeaveStatus(e.target.value);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="leaveStatusDiv">
        <div className="modal-header">
          <h1 className="modal-title " id="exampleModalLabel">
            Teacher Leave List
          </h1>
        </div>
        <select
          className="form-select w-25 my-3"
          aria-label="Default select example"
          value={leaveStatus}
          onChange={onStatusChange}
        >
          <option value={""}>All Leaves</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead className="thead">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Leave Type</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Accept</th>
            </tr>
          </thead>

          <tbody>
            {leaveList.list &&
              leaveList.list.map((list) => {
                return (
                  <tr key={list._id}>
                    <td>{list.userName}</td>
                    <td>{list.leaveType}</td>
                    <td>{list.content.slice(0, 30)}</td>
                    <td>{list.status}</td>
                    <td>
                      <span
                        data-bs-toggle="modal"
                        data-bs-target="#personalDetailModalForm"
                        className="ms-3 bi bi-eye"
                      ></span>
                      <LeaveView
                        className="modal fade"
                        id="personalDetailModalForm"
                        tabIndex="-1"
                        arialabelledby={"exampleModalLabel"}
                        ariaHidden="true"
                        leaveList={list}
                        getLeaveList={getLeaveList}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminLeaveList;
