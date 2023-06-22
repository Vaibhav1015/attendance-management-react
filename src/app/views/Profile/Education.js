import React, { useCallback, useEffect, useState } from "react";
import EducationalDetailsForm from "./EditForms/EducationalDetailsForm";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";
import EducationEditForm from "./EditForms/EducationEditForm";
import NoData from "../../components/NoData";
import {
  deleteEducation,
  getUserEducation,
} from "../../../middleware/services/educationService";

const Education = ({ userId, tabId }) => {
  const [eduction, setEduction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEducation = useCallback(() => {
    setIsLoading(true);
    getUserEducation(userId).then((res) => {
      if (res !== undefined) {
        setEduction(res.data.data);
      }
      setIsLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (tabId === "eduction-tab") {
      getEducation();
    }
  }, [getEducation, tabId]);

  const onDelete = async (id) => {
    deleteEducation(id).then((res) => getEducation(res));
  };

  return (
    <>
      <EducationalDetailsForm
        setEduction={setEduction}
        className="modal fade"
        id="EducationalDetailModalForm"
        tabIndex="-1"
        arialabelledby={"exampleModalLabel"}
        ariaHidden="true"
        userId={userId}
      />
      <div className="container EducationDetailsDiv">
        <button
          className="btn btn-primary rounded-0 px-4"
          data-bs-toggle="modal"
          data-bs-target="#EducationalDetailModalForm"
        >
          ADD
        </button>

        <p className="headerText">Education Details</p>
        <div className="detailsDiv">
          {isLoading && <ReactLoadingSpinner />}
          {!isLoading && eduction.length === 0 && <NoData />}
          {!isLoading && eduction && eduction.length !== 0 && (
            <div className="container text-left">
              <table className="table table-hover table-bordered text-center">
                <thead className="tableHeadDiv">
                  <tr>
                    <th scope="col">Degree</th>
                    <th scope="col">Institute</th>
                    <th scope="col">Result</th>
                    <th scope="col">Passed Year</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {eduction.map((ele) => {
                    return (
                      <tr key={ele._id}>
                        <td>
                          {ele.degree} {!ele.degree && "---"}
                        </td>
                        <td>
                          {ele.institute} {!ele.institute && "---"}
                        </td>
                        <td>
                          {ele.result} {!ele.result && "---"}
                        </td>
                        <td>
                          {ele.pass_year} {!ele.pass_year && "---"}
                        </td>
                        <td>
                          <span
                            className="edit-icon me-2 bi bi-pencil"
                            data-bs-toggle="modal"
                            data-bs-target={`#${ele._id}`}
                          ></span>
                          <EducationEditForm
                            userId={userId}
                            eductionId={ele._id}
                            getEducationMethod={getEducation}
                            className="modal fade"
                            id={ele._id}
                            tabIndex="-1"
                            arialabelledby={"exampleModalLabel"}
                            ariaHidden="true"
                            education={ele}
                          />
                          <span
                            className="delete-icon bi bi-trash"
                            data-bs-toggle="modal"
                            data-bs-target={`#${ele._id}delete`}
                          >
                            <div
                              className="modal fade"
                              id={`${ele._id}delete`}
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
                                      onClick={() => onDelete(ele._id)}
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
          )}
        </div>
      </div>
    </>
  );
};

export default Education;
