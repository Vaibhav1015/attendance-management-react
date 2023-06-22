import React, { useEffect, useRef, useState } from "react";
import LeaveForm from "./EditForms/LeaveForm";
import NoData from "../../components/NoData";
import { roles } from "../../../constants/constantFunction";
import { useCallback } from "react";
import { getLeave } from "../../../middleware/services/leaveService";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";

const Leave = ({ userId, showTabs, tabId }) => {
  const [myLeave, setMyLeave] = useState([]);
  const inputEl = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUserLeave = useCallback(async () => {
    setIsLoading(true);
    getLeave(userId).then((res) => {
      setMyLeave(res.data.data);
      setIsLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (tabId === "leave-tab") {
      getUserLeave();
    }
  }, [tabId, getUserLeave]);

  return (
    <>
      <div className="container leaveDetailsDiv" ref={inputEl}>
        <p className="headerText">Leave Details</p>
        <div className="detailsDiv">
          <div className="container text-left">
            {!roles() && (
              <div
                className="headerText1"
                data-bs-toggle="modal"
                data-bs-target="#leaveModalForm"
              >
                Apply For Leave
              </div>
            )}
            <LeaveForm
              getUserLeave={getUserLeave}
              className="modal fade"
              id="leaveModalForm"
              tabIndex="-1"
              arialabelledby={"exampleModalLabel"}
              ariaHidden="true"
            />
            {isLoading && <ReactLoadingSpinner />}
            {!isLoading && myLeave.length === 0 && <NoData />}
            {!isLoading && myLeave.length !== 0 && (
              <table className="table table-hover table-bordered text-center">
                <thead className="tableHeadDiv">
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody className="tableBodyDiv">
                  {myLeave.map((myLeave) => {
                    return (
                      <tr key={myLeave._id}>
                        <td maxLength={5}>{myLeave.leaveType}</td>
                        <td>{myLeave.content}</td>
                        <td>{myLeave.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Leave;
