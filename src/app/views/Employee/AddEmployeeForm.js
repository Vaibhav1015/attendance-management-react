import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactInput from "../../components/ReactInput";
import { registerEmployee } from "../../../middleware/services/employeeService";

const AddEmployeeForm = ({
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
  const [passwordShown, setPasswordShown] = useState("password");
  const [showForm, setShowForm] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = (data) => {
    registerEmployee(data).then((res) => {
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
              Add Employee
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
                      ...register("firstName", {
                        required: "firstName cannot be empty",
                      }),
                    }}
                    label="First Name"
                    placeholder="First Name"
                    asterisk="true"
                    error={
                      errors.firstName && (
                        <span>{errors.firstName.message}</span>
                      )
                    }
                    reactInputClassName="form-inputs"
                    inputClassName="inputs"
                  />
                  <ReactInput
                    register={{
                      ...register("lastName", {
                        required: "lastame cannot be empty",
                      }),
                    }}
                    asterisk="true"
                    label="Last Name"
                    placeholder="Last Name"
                    error={
                      errors.lastName && <span>{errors.lastName.message}</span>
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
                  <ReactInput
                    type={passwordShown}
                    register={{
                      ...register("password", {
                        required: "Password cannot be empty",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*\d)(?=.*[#$@!_\-%&*?])[A-Za-z\d#$@!_\-%&*?]{6,30}$/,
                          message:
                            "The password must contain at least six characters and be a combination of alphabets, numbers, and special characters.",
                        },
                      }),
                    }}
                    icon={
                      <span
                        onClick={() =>
                          passwordShown === "password"
                            ? togglePassword("text")
                            : setPasswordShown("password")
                        }
                      >
                        {passwordShown === "password" ? "S" : "H"}
                      </span>
                    }
                    label="Password"
                    asterisk="true"
                    name="password"
                    error={
                      errors.password && <span>{errors.password.message}</span>
                    }
                    reactInputClassName="form-inputs"
                    inputClassName="inputs"
                  />
                </div>

                <div className="controller-input ">
                  <div className="emp-dropdown-select">
                    <label>Select Role</label>
                    <Controller
                      name="role"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <select {...field} className="controller-dropdown">
                          <option hidden>Select an Role</option>
                          <option>Employee</option>
                          <option>Admin</option>
                        </select>
                      )}
                    />
                    {errors.role && (
                      <span className="dropdown-error text-danger">
                        This field is required
                      </span>
                    )}
                  </div>

                  <div className="emp-dropdown-select">
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
                    <label>Job Title</label>
                    <Controller
                      name="jobTitle"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <select {...field} className="controller-dropdown">
                          <option hidden>Select Job Title</option>
                          <option>Sr Developer</option>
                          <option>Jr Developer</option>
                          <option>Tester</option>
                          <option>Trainee</option>
                        </select>
                      )}
                    />
                    {errors.jobTitle && (
                      <span className="dropdown-error text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="employee-footer modal-footer">
                  <button className="btn btn-primary" type="submit">
                    Add Employee
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

export default AddEmployeeForm;
