import React, { useEffect } from "react";
import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { object } from "yup";

const AddAttendance = ({
  id,
  arialabelledby,
  tabIndex,
  className,
  ariaHidden,
}) => {
  const [showForm, setShowForm] = useState(true);
  const [attDate, setAttDate] = useState();
  const [teacherData, setTeacherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  const onChangeValue = (id, present) => {
    let list = teacherData.map((ele) => {
      if (ele._id === id) {
        Object.assign(ele, { present });
      }
      return ele;
    });
    setTeacherData(list);
  };

  useEffect(() => {
    const fetchAttendanceData = async () => {
      setIsLoading(true);
      const url = "https://academic-attendance.onrender.com/api/getall";
      // "http://localhost:5000/api/getall"

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something Went wrong ");
      }
      const data = await response.json();
      let list = data.list.map((ele) =>
        Object.assign(ele, { present: "false" })
      );
      setTeacherData(list);
      setIsLoading(false);
    };
    fetchAttendanceData();
  }, []);

  const postData = teacherData.map((ele) => {
    const newObj = Object.assign({
      date: attDate,
      name: ele.firstName + " " + ele.lastName,
      present: ele.present,
    });
    return newObj;
  });

  const addData = (e) => {
    e.preventDefault();
    try {
      const postUrl =
        "https://academic-attendance.onrender.com/api/add-attendance";
      // "https://academic-attendance.onrender.com/api/add-attendance"
      fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <div
        className={showForm ? className : "modal fade d-none"}
        data-bs-backdrop="false"
        id={id}
        tabIndex={tabIndex}
        aria-labelledby={arialabelledby}
        aria-hidden={showForm ? ariaHidden : "false"}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered ">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Attendance
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="addAttendance-form modal-body">
              <form>
                <div className="addAttendance_main-form ">
                  <div className="attendance_date">
                    <label className="date_label">Attendance Date</label>
                    <input
                      type="date"
                      className="dates mb-3"
                      value={attDate}
                      onChange={(e) => setAttDate(e.target.value)}
                    />
                  </div>
                  <div className="attendanceDivList">
                    <table className="table table-bordered">
                      <thead className="thead text-center">
                        <tr>
                          <th scope="col">Student Name</th>
                          <th scope="col">Present</th>
                          <th scope="col">Absent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading && <div className="loaderDiv"></div>}
                        {teacherData.map((item) => (
                          <tr className="text-center">
                            <th>
                              {item.firstName} {item.lastName}
                            </th>
                            <td>
                              <div className="form-check form-check-inline">
                                <label>
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name={`${item.firstName + item.lastName}`}
                                    id={item._id}
                                    value="true"
                                    checked={"true" === item.present}
                                    onChange={(e) =>
                                      onChangeValue(
                                        item._id,
                                        e.currentTarget.value
                                      )
                                    }
                                  />
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-check-inline">
                                <label>
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name={`${item.firstName + item.lastName}`}
                                    id={item._id}
                                    value="false"
                                    checked={"false" === item.present}
                                    onChange={(e) =>
                                      onChangeValue(
                                        item._id,
                                        e.currentTarget.value
                                      )
                                    }
                                  />
                                </label>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="attendance-footer">
                  <button
                    className="add-button btn btn-success"
                    type="submit"
                    onClick={addData}
                    data-bs-dismiss="modal"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="close-button btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddAttendance;
