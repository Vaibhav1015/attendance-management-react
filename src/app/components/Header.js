import { Link, useNavigate } from "react-router-dom";
import { getUser, roles } from "../../constants/constantFunction";
import ConfirmPassword from "./ConfirmPassword";
import { useEffect, useState } from "react";
import { getEmployeeByUserId } from "../../middleware/services/employeeService";
import logo from "../../../src/images/mainLogo.jpeg";

const Header = ({ headerImage }) => {
  const navigate = useNavigate();
  let currUser = getUser();
  const [headImage, setHeadImage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleProfileClick = () => {
    navigate("/admin-profile");
  };

  useEffect(() => {
    getEmployeeByUserId(currUser?._id).then((res) => {
      if (res.data.imageData === null) {
        setHeadImage(
          "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
        );
      } else {
        setHeadImage(res.data.imageData.image);
      }
    });
  }, [currUser?._id]);

  return (
    <nav className="navbar navbar-expand-lg  bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <div className="header-left me-2">
            <p className="logo logo-small">
              <img src={logo} alt="Logo" width="30" height="30" />
            </p>
          </div>

          <div className="navbar d-flex" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-2">
              <li className="nav-item">
                <Link to="/dashboard">
                  <p className="nav-link active" aria-current="page">
                    Dashboard
                  </p>
                </Link>
              </li>
              {roles() && (
                <li className="nav-item">
                  <Link to="/employee">
                    <p className="nav-link">Teachers</p>
                  </Link>
                </li>
              )}
              {roles() && (
                <li className="nav-item">
                  <Link to="/student">
                    <p className="nav-link">Students</p>
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link to="/project">
                  <p className="nav-link ">Subjects</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/holiday-list">
                  <p className="nav-link ">Holidays</p>
                </Link>
              </li>
              {roles() && (
                <li className="nav-item">
                  <Link to="/attendance-list">
                    <p className="nav-link ">Attendance</p>
                  </Link>
                </li>
                
              )}
            </ul>
          </div>
        </div>
        <ul className="nav user-menu">
          <li className="nav-item dropdown has-arrow main-drop">
            <div
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              role="button"
            >
              <img
                src={headerImage !== "" ? headerImage : headImage}
                alt=""
                width="40"
                height="40"
                className="rounded-circle me-2"
              />
              <span>
                {currUser?.firstName} {currUser?.lastName}
              </span>
            </div>
            <ul className="dropdown-menu">
              {roles() && (
                <li>
                  <p
                    className="dropdown-item"
                    onClick={handleProfileClick}
                    role="button"
                  >
                    Profile
                  </p>
                </li>
              )}
              <li>
                <p
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target={`#${currUser?._id}`}
                  role="button"
                >
                  Change Password
                </p>
              </li>
              <li>
                <p
                  className="dropdown-item"
                  onClick={handleLogout}
                  role="button"
                >
                  Log Out
                </p>
              </li>
            </ul>
          </li>
        </ul>
        <div
          className="modal fade"
          id={currUser?._id}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content bg-light rounded-0">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Change Password
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <ConfirmPassword
                  id={currUser?._id}
                  logOutMethod={handleLogout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
