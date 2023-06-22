import React, { useCallback, useEffect, useRef, useState } from "react";
import BankAccount from "../Profile/BankAccount";
import Document from "../Profile/Document";
import { getUser, roles } from "../../../constants/constantFunction";
import PersonalDetail from "../Profile/PersonalDetail";
import Education from "../Profile/Education";
import Leave from "../Profile/Leave";
import Salary from "../Profile/Salary";
import { useParams } from "react-router-dom";
import EmployeeProjectList from "../Project/EmployeeProjectList";
import { getEmployeeByUserId } from "../../../middleware/services/employeeService";
import {
  deleteImage,
  editImage,
  postImage,
} from "../../../middleware/services/imageService";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";

const EmployeeDashboard = ({ setHeaderImage }) => {
  const [activeTab, setActiveTab] = useState("");
  const [userData, setUserData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const userId = useCallback(() => {
    if (params.id) {
      return params.id;
    } else {
      return getUser()._id;
    }
  }, [params.id]);

  const getEmpDetail = useRef(() => {});

  useEffect(() => {
    setIsLoading(true);
    getEmployeeByUserId(userId()).then((res) => {
      if (res.data.success) {
        setUserData(res.data.data);
      }
      if (res.data.imageData === null) {
        setSelectedImage(
          "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
        );
        setIsLoading(false);
      } else {
        setSelectedImage(res.data.imageData.image);
        setIsLoading(false);
      }
    });
  }, [userId]);

  const showTabs = () => {
    if (roles()) {
      return !!params.id;
    } else {
      return true;
    }
  };

  const uploadImage = (e) => {
    postImage(e, userId()).then((res) => {
      if (res.data.success) {
        setSelectedImage(URL.createObjectURL(e.target.files[0]));
        if (!params.id) {
          setHeaderImage(URL.createObjectURL(e.target.files[0]));
        }
      } else {
        editImage(e, userId()).then((res) => {
          if (res.data.success) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
            if (!params.id) {
              setHeaderImage(res.data.data.image);
            }
          }
        });
      }
      document.getElementById("profileCloseBtn").click();
    });
  };

  const removeImage = () => {
    deleteImage(userId()).then((res) => {
      res &&
        setSelectedImage(
          "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
        );
      if (res && !params.id) {
        setHeaderImage(
          "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
        );
      }
      document.getElementById("profileCloseBtn").click();
    });
  };

  return (
    <>
      {isLoading && <ReactLoadingSpinner />}
      {!isLoading && selectedImage && userData?.length !== 0 && (
        <div className="main-wrapper">
          <div
            className="employeeDashboard  profileContainer tab-pane fade show active"
            id="nav-personalInfo"
            role="tabpanel"
            arialabelledby="nav-home-tab"
            tabIndex="0"
          >
            <h3 className="titleText">Profile</h3>
            <div className="profileDetailContent">
              <div className="imageContainer card">
                <div className="imgDiv">
                  <img src={selectedImage} alt="" width="150" height="150" />
                </div>
                <label
                  className="custom-file-upload"
                  data-bs-toggle="modal"
                  data-bs-target="#changeProfileBtn"
                >
                  Change Profile
                </label>

                <div
                  className="modal fade"
                  id="changeProfileBtn"
                  tabIndex="-1"
                  aria-labelledby="changeProfileBtnLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 id="changeProfileBtnLabel">
                          <label className="btn h5 font-weight-bold">
                            <input
                              type="file"
                              onChange={uploadImage}
                              accept="image/*"
                            />
                            Choose Profile Image
                          </label>
                        </h5>
                        <button
                          id="profileCloseBtn"
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>

                      <div className="modal-body d-flex">
                        <h5
                          className="btn h5 font-weight-bold"
                          onClick={removeImage}
                        >
                          Remove Profile Image
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>

                <h5 className="nameDiv">
                  {userData.firstName} {userData.lastName}
                </h5>
                <h6 className="emailDiv">{userData.email}</h6>
              </div>
              <div className="userDetailsDiv card">
                {showTabs() && (
                  <ul
                    className="nav nav-underline mb-3 ms-3 gap-5"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <p
                        className="nav-link active"
                        id="personal-details-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#personal-details"
                        role="tab"
                        aria-controls="personal-details"
                        aria-selected="true"
                      >
                        Personal Details
                      </p>
                    </li>
                    <li className="nav-item" role="presentation">
                      <span
                        className="nav-link"
                        id="eduction-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#eduction"
                        role="tab"
                        aria-controls="eduction"
                        aria-selected="false"
                        onClick={() => setActiveTab("eduction-tab")}
                      >
                        Eduction
                      </span>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="bank-account-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#bank-account"
                        type="button"
                        role="tab"
                        aria-controls="bank-account"
                        aria-selected="false"
                        onClick={() => setActiveTab("bank-account-tab")}
                      >
                        Bank Account
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="document-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#document"
                        type="button"
                        role="tab"
                        aria-controls="document"
                        aria-selected="false"
                        onClick={() => setActiveTab("document-tab")}
                      >
                        Document
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="leave-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#leave"
                        type="button"
                        role="tab"
                        aria-controls="leave"
                        aria-selected="false"
                        onClick={() => setActiveTab("leave-tab")}
                      >
                        Leave
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="salary-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#salary"
                        type="button"
                        role="tab"
                        aria-controls="salary"
                        aria-selected="false"
                        onClick={() => setActiveTab("salary-tab")}
                      >
                        Salary
                      </button>
                    </li>
                    {roles() && (
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="project-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#project"
                          type="button"
                          role="tab"
                          aria-controls="project"
                          aria-selected="false"
                          onClick={() => setActiveTab("project-tab")}
                        >
                          Project
                        </button>
                      </li>
                    )}
                  </ul>
                )}

                {!showTabs() ? (
                  <PersonalDetail
                    userData={userData}
                    getEmpDetail={getEmpDetail}
                    userId={userId()}
                    setUserData={setUserData}
                  />
                ) : (
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="personal-details"
                      role="tabpanel"
                      arialabelledby="personal-details-tab"
                      tabIndex="0"
                    >
                      <PersonalDetail
                        userData={userData}
                        getEmpDetail={getEmpDetail}
                        setUserData={setUserData}
                        userId={userId()}
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="eduction"
                      role="tabpanel"
                      arialabelledby="eduction-tab"
                      tabIndex="0"
                    >
                      <Education userId={userId()} tabId={activeTab} />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="bank-account"
                      role="tabpanel"
                      arialabelledby="bank-account-tab"
                      tabIndex="0"
                    >
                      <BankAccount userId={userId()} tabId={activeTab} />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="document"
                      role="tabpanel"
                      arialabelledby="document-tab"
                      tabIndex="0"
                    >
                      <Document userId={userId()} tabId={activeTab} />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="leave"
                      role="tabpanel"
                      arialabelledby="leave-tab"
                      tabIndex="0"
                    >
                      <Leave
                        userId={userId()}
                        showTabs={showTabs()}
                        tabId={activeTab}
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="salary"
                      role="tabpanel"
                      arialabelledby="salary-tab"
                      tabIndex="0"
                    >
                      <Salary userId={userId()} tabId={activeTab} />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="project"
                      role="tabpanel"
                      arialabelledby="project-tab"
                      tabIndex="0"
                    >
                      <EmployeeProjectList
                        userId={userId()}
                        tabId={activeTab}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeDashboard;
