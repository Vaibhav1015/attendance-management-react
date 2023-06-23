import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddAttendance = ({
  id,
  arialabelledby,
  tabIndex,
  className,
  ariaHidden,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(true);
  const onSubmit = () => {};
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const response = await fetch("http://192.168.5.85:5000/api/getall");
      if (!response.ok) {
        throw new Error("Something Went wrong ");
      }
      const data = await response.json();

      setTeacherData(data.list);
    };
    fetchAttendanceData();
  }, []);

  const userListName = () => {
    const name = teacherData.map((item) => ({
      name: item.firstName + " " + item.lastName,
      id: item._id,
    }));
    return name;
  };

  const addData = () => {
    const userData = userListName();
    console.log(userData);
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="addAttendance_main-form ">
                  <div className="attendance_date">
                    <label className="date_label">Attendance Date</label>
                    <input
                      type="date"
                      className="dates mb-3"
                      {...register("date", {
                        required: "Date is required",
                        valueAsDate: true,
                      })}
                    />
                    {errors.date && (
                      <span className=" text-danger">
                        Start date is required
                      </span>
                    )}
                  </div>
                  <div>
                    <table className="table table-bordered">
                      <thead className="thead text-center">
                        <tr>
                          <th scope="col">Student Name</th>
                          <th scope="col">Present</th>
                          <th scope="col">Absent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teacherData.map((item) => (
                          <tr className="text-center">
                            <th>
                              {item.firstName} {item.lastName}
                            </th>
                            <td>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`${(item.firstName, item.lastName)}`}
                                  id={item._id}
                                  value="option1"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`${(item.firstName, item.lastName)}`}
                                  id={item._id}
                                  value="option1"
                                />
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
                    className="btn btn-success"
                    type="submit"
                    onClick={addData}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => reset()}
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
