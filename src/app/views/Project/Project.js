import React, { useCallback, useEffect, useState } from "react";
import AddProjectForm from "./AddProjectForm";
import { getUser, roles } from "../../../constants/constantFunction";
import EmployeeProjectList from "./EmployeeProjectList";
import moment from "moment/moment";
import NoData from "../../components/NoData";
import {
  deleteProject,
  getProjects,
} from "../../../middleware/services/projectService";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";
import { getEmployee } from "../../../middleware/services/employeeService";

const Project = () => {
  const [project, setProject] = useState([]);
  const [getAllEmpp, setGetAllEmpp] = useState([]);
  const [projectObj, setProjectObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userId = getUser()._id;

  const getUserNames = useCallback((array, empList) => {
    let names = [];
    array.forEach((j) => {
      let result = empList.filter((x) => x._id === j);
      if (result.length) {
        names.push(result[0].firstName);
      }
    });
    return names;
  }, []);

  useEffect(() => {
    getEmployee().then((i) => setGetAllEmpp(i.data.list));
  }, []);

  const getPro = useCallback(() => {
    setIsLoading(true);
    if (getAllEmpp.length !== 0) {
      getProjects().then((i) => {
        setIsLoading(true);
        if (i !== undefined) {
          const newArray = i.map((z) => ({
            employeeNames: getUserNames(z.assignedUsers, getAllEmpp),
            ...z,
          }));
          setProject(newArray);
        }
        setIsLoading(false);
      });
    }
  }, [getAllEmpp, getUserNames]);

  useEffect(() => {
    getPro();
  }, [getPro]);

  return (
    <>
      {roles() ? (
        <div className="projects">
          <div className="main-card">
            <div className="project-buttons">
              <div className="project-count">Subjects : {project.length}</div>
              <button
                className="add-project btn btn-primary px-3 "
                data-bs-toggle="modal"
                data-bs-target="#projectModal"
                onClick={() => {
                  setProjectObj(null);
                }}
              >
                <i className="add-icon bi bi-file-earmark-plus"></i>
                Add Subject
              </button>
            </div>

            <AddProjectForm
              projectList={getPro}
              setProject={setProject}
              className="modal fade"
              id="projectModal"
              tabIndex="-1"
              arialabelledby="exampleModalLabel"
              ariaHidden="true"
              empList={getAllEmpp}
              projectObj={projectObj}
            />

            {isLoading && <ReactLoadingSpinner />}

            {!isLoading && project !== undefined && project.length !== 0 && (
              <div className="table-main">
                <div className="table-heading">
                  <h2>Subject List</h2>
                </div>
                <div className="table-responsive">
                  {project.length !== 0 && (
                    <>
                      <table className="table">
                        <thead className="thead">
                          <tr>
                            <th scope="col">Subject Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Teacher</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.map((ele) => {
                            return (
                              <tr key={ele._id}>
                                <td>{ele.projectName}</td>
                                <td>{ele.status}</td>
                                <td>
                                  {moment(ele.startDate).format("DD-MM-YYYY")}
                                </td>
                                <td>
                                  {moment(ele.endDate).format("DD-MM-YYYY")}
                                </td>
                                <td>
                                  {ele.employeeNames.map(
                                    (name, i, { length }) => {
                                      return (
                                        <span key={i + name}>
                                          <span>{name} </span>
                                          {i + 1 !== length && <span>, </span>}
                                        </span>
                                      );
                                    }
                                  )}
                                </td>
                                <td>
                                  <i
                                    data-bs-toggle="modal"
                                    data-bs-target={`#${ele._id}deleteModal`}
                                    className="delete-icon bi bi-trash"
                                  >
                                    <div
                                      className="modal fade"
                                      id={`${ele._id}deleteModal`}
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
                                                deleteProject(ele._id).then(
                                                  (res) => {
                                                    if (res.status === 200) {
                                                      getPro();
                                                    }
                                                  }
                                                )
                                              }
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </i>
                                  <i
                                    data-bs-toggle="modal"
                                    data-bs-target="#projectModal"
                                    className="edit-icon ms-2 bi bi-pencil"
                                    onClick={() => {
                                      setProjectObj(ele);
                                    }}
                                  ></i>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            )}
            {!isLoading && project && project.length === 0 && <NoData />}
          </div>
        </div>
      ) : (
        <EmployeeProjectList userId={userId} getAllEmpp={getAllEmpp} />
      )}
    </>
  );
};

export default Project;
