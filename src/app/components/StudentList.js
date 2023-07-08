import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../../middleware/services/studentService";

const StudentList = ({ employee, getEmp }) => {
  const navigate = useNavigate();

  return (
    <div className="main-card">
      <div className="table-heading">
        <h2>Student List</h2>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead className="thead">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Class</th>
              <th scope="col">Gender</th>
              <th scope="col">Birth Date</th>
              <th scope="col">Join Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {employee &&
              employee.list !== undefined &&
              employee.list !== "" &&
              employee.list.map((emp) => {
                return (
                  <tr key={emp._id}>
                    <td>{emp.fullName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.classStd}</td>
                    <td>{emp.gender}</td>
                    <td>{moment(emp.birthDate).format("DD-MM-YYYY")}</td>
                    <td>{moment(emp.joinDate).format("DD-MM-YYYY")}</td>
                    <td>
                      <span
                        data-bs-toggle="modal"
                        data-bs-target={`#${emp._id}deleteModal`}
                        className="delete-icon bi bi-trash"
                      >
                        <div
                          className="modal fade"
                          id={`${emp._id}deleteModal`}
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
                                  onClick={() =>
                                    deleteStudent(emp._id).then((res) => {
                                      if (res.status === 200) {
                                        getEmp();
                                      }
                                    })
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
