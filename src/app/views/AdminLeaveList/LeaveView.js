import axios from "axios";
import React from "react";
import { getUser } from "../../../constants/constantFunction";

const LeaveView = ({
  className,
  id,
  ariaLabelledby,
  ariaHidden,
  tabIndex,
  leaveList,
  getLeaveList,
}) => {
  const acceptReq = (id, status) => {
    acceptRejectLeave(id, status);
  };
  const rejectReq = (id, status) => {
    acceptRejectLeave(id, status);
  };

  const acceptRejectLeave = async (id, status) => {
    try {
      await axios
        .put(
          `https://academic-attendance.onrender.com/api/update-leave/${
            getUser()._id
          }`,
          {
            _id: id,
            status: status,
          }
        )
        .then((res) => {
          if (res.data.success) {
            getLeaveList();
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={className}
      id={id}
      tabIndex={tabIndex}
      aria-labelledby={ariaLabelledby}
      aria-hidden={ariaHidden}
    >
      <div className="modal-dialog modal-lg  modal-dialog-centered ">
        <div className="modal-content bg-light rounded-0">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Details
            </h1>
          </div>
          <div className="modal-body">
            <div className="container  text-left">
              <div className="row ">
                <div className="col col-lg-2 ps-0 titleDiv">User Name :</div>
                <div className="col ">{leaveList.userName}</div>
              </div>
              <div className="row ">
                <div className="col col-lg-2 ps-0 titleDiv">Leave Type :</div>
                <div className="col ">{leaveList.leaveType}</div>
              </div>
              <div className="row ">
                <div className="col col-lg-2 ps-0 titleDiv">Description:</div>
                <div className="col ">
                  {leaveList.content} Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              className="btn btn-danger"
              onClick={() => rejectReq(leaveList._id, "Rejected")}
            >
              Reject
            </button>
            <button
              type="button"
              className="me-2 btn btn-success"
              onClick={() => acceptReq(leaveList._id, "Accepted")}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveView;
