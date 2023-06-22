import React, { useEffect, useState } from "react";

import axios from "axios";
import moment from "moment";

import { useCallback } from "react";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";

const EmployeeProjectList = ({ userId, tabId }) => {
  const [employeeProject, setEmployeeProject] = useState([]);
  const [getAllEmpp, setGetAllEmpp] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userById = (assingedUserId) => {
    let assingedUserObj = [];
    if (getAllEmpp.length) {
      assingedUserId.forEach((e) => {
        let object = getAllEmpp.find((obj) => obj._id === e);
        assingedUserObj.push(object);
      });
    }
    return assingedUserObj.map((i) => {
      return " " + i.firstName;
    });
  };

  const getUserProject = useCallback(
    (_id) => {
      try {
        setIsLoading(true);
        axios
          .get(`http://192.168.5.85:5000/api/projects/user/${userId}`)
          .then((res) => {
            if (res.data.success) {
              setEmployeeProject(res.data.project);
            }
          });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    },
    [userId]
  );

  const getAllEmp = useCallback(() => {
    try {
      axios.get("http://192.168.5.85:5000/api/getall").then((response) => {
        setGetAllEmpp(response.data.list);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (tabId === "project-tab") {
      getUserProject();
      getAllEmp();
    }
  }, [getAllEmp, getUserProject, tabId]);

  return (
    <>
      <div className="projects">
        <div className="main-wrapper">
          <div className="main-card">
            <div className="project-buttons">
              <div className="project-count">
                Project :{employeeProject.length}
              </div>
            </div>

            <div className="table-heading">
              <h2>Project List</h2>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th scope="col">Project Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Employee</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeProject.map((ele) => {
                    return (
                      <tr key={ele._id}>
                        <td>{ele.projectName}</td>
                        <td>{ele.status}</td>
                        <td>{moment(ele.startDate).format("DD-MM-YYYY")}</td>
                        <td>{moment(ele.endDate).format("DD-MM-YYYY")}</td>
                        <td>
                          {userById(ele.assignedUsers).slice(0, 2)}
                          {userById(ele.assignedUsers).length > 2
                            ? " +" + userById(ele.assignedUsers).slice(2).length
                            : ""}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {isLoading && <ReactLoadingSpinner />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProjectList;
