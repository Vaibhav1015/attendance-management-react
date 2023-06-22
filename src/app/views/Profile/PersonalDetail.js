import moment from "moment";

import PersonalDetailsForm from "./EditForms/PersonalDetailsForm";

const PersonalDetail = ({ userId, userData, getEmpDetail, setUserData }) => {
  return (
    <div className="container personalDetailsDiv">
      <button
        className="btn btn-primary rounded-0 px-4"
        data-bs-toggle="modal"
        data-bs-target="#personalDetailModalForm"
      >
        {userData && <p>Edit</p>}
        {!userData && <p>Add</p>}
      </button>
      <PersonalDetailsForm
        className="modal fade"
        id="personalDetailModalForm"
        tabIndex="-1"
        arialabelledby={"exampleModalLabel"}
        ariaHidden="true"
        userData={userData}
        getEmpMethod={getEmpDetail}
        setUserData={setUserData}
        userId={userId}
      />

      <p className="headerText">Profile Details</p>
      <div className="detailsDiv">
        <div className="container text-left">
          <div className="row my-3">
            <div className="col col-lg-3 ps-0 titleDiv">Address :</div>
            <div className="col ps-0 infoDiv">
              {userData.address ? userData.address : "---"}
            </div>
          </div>

          <div className="row my-3">
            <div className="col col-lg-3 ps-0 titleDiv">Job Title :</div>
            <div className="col ps-0 infoDiv">
              {userData.jobTitle ? userData.jobTitle : "---"}
            </div>
          </div>
          <div className="row my-3">
            <div className="col col-lg-3 ps-0 titleDiv">Birth Date :</div>
            <div className="col ps-0 infoDiv">
              {userData.birthDate
                ? moment(userData.birthDate).format("DD-MM-YYYY")
                : "---"}
            </div>
          </div>
          <div className="row my-3">
            <div className="col col-lg-3 ps-0 titleDiv">Gender :</div>
            <div className="col ps-0 infoDiv">
              {userData.gender ? userData.gender : "---"}
            </div>
          </div>
          <div className="row my-3">
            <div className="col col-lg-3 ps-0 titleDiv">Phone :</div>
            <div className="col ps-0 infoDiv">
              {userData.phone ? userData.phone : "---"}
            </div>
          </div>
          <div className="row my-3">
            <div className="col col-lg-3 ps-0 titleDiv">Join Date :</div>
            <div className="col ps-0 infoDiv">
              {moment(userData.joinDate).format("DD-MM-YYYY")}
            </div>
          </div>
          <div className="row my-3">
            <div className="col col-lg-3 ps-0 titleDiv">LinkedIn :</div>
            <div className="col ps-0 infoDiv">
              {userData.linkedIn ? userData.linkedIn : "---"}
            </div>
          </div>
          <div className="row my-3">
            <div className="col col-lg-3 ps-0 titleDiv">Blood Grp+ :</div>
            <div className="col ps-0 infoDiv">
              {userData.bloodGroup ? userData.bloodGroup : "---"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetail;
