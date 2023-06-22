import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { editEmployee } from "../../../../middleware/services/employeeService";
import ReactInput from "../../../components/ReactInput";

const PersonalDetailsForm = ({
  className,
  id,
  userId,
  ariaLabelledby,
  ariaHidden,
  tabIndex,
  userData,
  setUserData,
}) => {
  const bloodGroup = [
    { type: "O-positive" },
    { type: " O-negative" },
    { type: " A-positive" },
    { type: "A-negative" },
    { type: " B-positive" },
    { type: "B-negative" },
    { type: " AB-positive" },
    { type: " AB-negative" },
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    editEmployee(userId, data).then((res) => {
      setUserData(res.data.data);
      document.getElementById("editCloseBtn").click();
    });
  };

  const getValueDate = (value) => {
    if (value === null) {
      return "";
    }
    const offset = value.getTimezoneOffset();
    return new Date(value.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
  };

  useEffect(() => {
    const birthDate = userData?.birthDate && new Date(userData?.birthDate);
    const startDateFormate =
      birthDate &&
      new Date(
        birthDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
      );

    setValue("firstName", userData.firstName);
    setValue("lastName", userData.lastName);
    setValue("address", userData.address);
    setValue("phone", userData.phone);
    setValue("jobTitle", userData.jobTitle);
    setValue("bloodGroup", userData.bloodGroup);
    setValue("linkedIn", userData.linkedIn);
    userData?.birthDate &&
      setValue("birthDate", getValueDate(startDateFormate));
  }, [userData, setValue]);

  return (
    <>
      <div
        className={className}
        id={id}
        tabIndex={tabIndex}
        aria-labelledby={ariaLabelledby}
        aria-hidden={ariaHidden}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered ">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Profile
              </h1>
            </div>
            <div className="personal-detail-form modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="main-form ">
                  <div className="edit-input ">
                    <ReactInput
                      register={{
                        ...register("firstName", {
                          required: " This field is required",
                        }),
                      }}
                      defaultValue="---"
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
                          required: " This field is required",
                        }),
                      }}
                      label="Last Name"
                      placeholder="Last Name"
                      asterisk="true"
                      error={
                        errors.lastName && (
                          <span>{errors.lastName.message}</span>
                        )
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />
                  </div>
                  <div className="edit-input ">
                    <ReactInput
                      register={{
                        ...register("address", {
                          required: "This field is required",
                        }),
                      }}
                      label="Address"
                      placeholder="address"
                      asterisk="true"
                      error={
                        errors.address && <span>{errors.address.message}</span>
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />
                    <ReactInput
                      register={{
                        ...register("phone", {
                          required: " This field is required",
                        }),
                      }}
                      label="Phone No"
                      placeholder="phone"
                      asterisk="true"
                      error={
                        errors.phone && <span>{errors.phone.message}</span>
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />
                  </div>
                  <label>Select Birth-Date</label>
                  <input
                    type="date"
                    name="birthDate"
                    {...register("birthDate", {
                      required: "birthDate is required",
                      valueAsDate: true,
                    })}
                    className="dates mb-3"
                  />
                  {errors.birthDate && (
                    <span className=" text-danger">Birth Date is required</span>
                  )}

                  <div className="bloodGroup-dropdown mb-3">
                    <label>Select Blood Group</label>
                    <Controller
                      name="bloodGroup"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <select {...field} className="bloodGrp-dropdown">
                          <option hidden>Select an option</option>
                          {bloodGroup.map((bloodGrp) => {
                            return (
                              <option key={bloodGrp.type}>
                                {bloodGrp.type}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    />
                    {errors.bloodGroup && (
                      <span className="error text-danger">
                        This field is required
                      </span>
                    )}
                  </div>

                  <ReactInput
                    register={{
                      ...register("linkedIn", {
                        required: " This field is required",
                      }),
                    }}
                    label="linkedIn"
                    placeholder="linkedIn"
                    asterisk="true"
                    error={
                      errors.linkedIn && <span>{errors.linkedIn.message}</span>
                    }
                    reactInputClassName="form-inputs"
                    inputClassName="inputs"
                  />
                  <div className="edit-detail-footer modal-footer">
                    <button className="btn btn-primary" type="submit">
                      Add Employee
                    </button>
                    <button
                      id="editCloseBtn"
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
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
    </>
  );
};

export default PersonalDetailsForm;
