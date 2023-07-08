import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactInput from "../../components/ReactInput";
import { registerStudent } from "../../../middleware/services/studentService";

const AddStudentForm = ({
  className,
  id,
  arialabelledby,
  ariaHidden,
  tabIndex,
  getEmployee,
  selectedJobTitleMethod,
  setCurrentPage,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    registerStudent(data).then((res) => {
      if (res.data.success) {
        getEmployee();
        setShowForm(false);
        selectedJobTitleMethod("");
        setCurrentPage(1);
      } else {
        setErrorMessage("User already exists!");
      }
    });
  };

  return (
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
              Add Student
            </h1>
          </div>
          <div className="addEmployee-form modal-body">
            {errorMessage && (
              <span className="password-error text-danger">{errorMessage}</span>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="main-form ">
                <div className="name-input ">
                  <ReactInput
                    register={{
                      ...register("fullName", {
                        required: "fullName cannot be empty",
                      }),
                    }}
                    label="Full Name"
                    placeholder="Full Name"
                    asterisk="true"
                    error={
                      errors.firstName && (
                        <span>{errors.firstName.message}</span>
                      )
                    }
                    reactInputClassName="form-inputs"
                    inputClassName="inputs"
                  />
                </div>
                <div className="name-input ">
                  <ReactInput
                    register={{
                      ...register("email", {
                        required: "Email address cannot be empty",
                        pattern: {
                          value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/i,
                          message: "Enter valid email address.",
                        },
                      }),
                    }}
                    asterisk="true"
                    label="Email"
                    placeholder="Email"
                    error={errors.email && <span>{errors.email.message}</span>}
                    reactInputClassName="form-inputs"
                    inputClassName="inputs"
                  />
                </div>

                <div className="controller-input ">
                  <div className="emp-dropdown-select">
                    <div className="emp-dropdown-select">
                      <label>Birth Date</label>
                      <input
                        className="dates "
                        name="joinDate"
                        type="date"
                        {...register("birthDate", {
                          required: "birthDate cannot be empty",
                        })}
                      />
                      {errors.birthDate && (
                        <span className=" text-danger mt-1">
                          birth date is required
                        </span>
                      )}
                    </div>
                    <label>Select Gender</label>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <select {...field} className="controller-dropdown">
                          <option hidden>Select an Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      )}
                    />
                    {errors.gender && (
                      <span className="dropdown-error text-danger">
                        gender is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="controller-input mt-2">
                  <div className="emp-dropdown-select">
                    <label>Join Date</label>
                    <input
                      className="dates "
                      name="joinDate"
                      type="date"
                      {...register("joinDate", {
                        required: "joinDate cannot be empty",
                      })}
                    />
                    {errors.joinDate && (
                      <span className=" text-danger mt-1">
                        join date is required
                      </span>
                    )}
                  </div>
                  <div className="emp-dropdown-select">
                    <label>Class</label>
                    <Controller
                      name="classStd"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <select {...field} className="controller-dropdown">
                          <option hidden>Select Class</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </select>
                      )}
                    />
                    {errors.classStd && (
                      <span className="dropdown-error text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="employee-footer modal-footer">
                  <button className="btn btn-primary" type="submit">
                    Add Student
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => reset()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentForm;
