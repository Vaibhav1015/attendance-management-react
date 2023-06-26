import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactInput from "../../components/ReactInput";
import $ from "jquery";
import Select from "react-select";
import {
  editProject,
  postProject,
} from "../../../middleware/services/projectService";

const AddProjectForm = ({
  id,
  arialabelledby,
  ariaHidden,
  tabIndex,
  projectList,
  empList,
  projectObj,
  setProject,
}) => {
  const [assignUserId, setAssignUserId] = useState([]);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const userById = useCallback(() => {
    let assignedUserObj = [];
    if (empList && projectObj) {
      projectObj.assignedUsers.forEach((e) => {
        let object = empList.find((obj) => obj._id === e);
        assignedUserObj.push(object);
      });
    }
    return assignedUserObj.map((i) => {
      return { value: i._id, label: `${i.firstName + " " + i.lastName}` };
    });
  }, [empList, projectObj]);

  const onSubmit = async (data) => {
    if (!projectObj) {
      postProject(data, assignUserId).then((res) => {
        if (res.data.success) {
          // setProject((oldArr) => [res.data.data, ...oldArr]);
          projectList();
        }
      });
    } else {
      editProject(data, projectObj).then((res) => {
        if (res.data.success) {
          projectList();
          $(".modal").removeAttr("aria-modal");
          $(".modal").removeAttr("role");
          $(".modal").removeClass("show");
          $(".modal").attr("aria-hidden", "true");
          $(".modal").css("display", "none");
          $(".modal-backdrop").remove();
          $(".modal-open").removeAttr("style");
          $("body").removeClass("modal-open");
        }
      });
    }
  };

  const getValueDate = (value) => {
    if (value == null) {
      return "";
    }
    const offset = value.getTimezoneOffset();
    return new Date(value.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
  };

  useEffect(() => {
    const startData = projectObj && new Date(projectObj?.startDate);
    const startDateFormate =
      startData &&
      new Date(
        startData.getFullYear(),
        startData.getMonth(),
        startData.getDate()
      );
    const endDate = projectObj && new Date(projectObj?.endDate);
    const endDateFormate =
      endDate &&
      new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    setValue("projectName", projectObj?.projectName);
    setValue("startDate", getValueDate(startDateFormate));
    setValue("endDate", getValueDate(endDateFormate));
    setValue("status", projectObj?.status);
    setValue("assignedUser", userById());
  }, [projectObj, setValue, userById]);

  return (
    <div
      className="modal fade"
      data-bs-backdrop="false"
      id={id}
      tabIndex={tabIndex}
      aria-labelledby={arialabelledby}
      aria-hidden={ariaHidden}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered ">
        <div className="modal-content ">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="projectModal">
              {!projectObj ? "Add Subjects" : "Edit Subjects"}
            </h1>
          </div>
          <div className="add-project-form  modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="main-form ">
                <div className="name-input ">
                  <ReactInput
                    register={{
                      ...register("projectName", {
                        required: "projectName cannot be empty",
                      }),
                    }}
                    label="Subject Name"
                    placeholder="Subject Name"
                    asterisk="true"
                    error={
                      errors.projectName && (
                        <span>{errors.projectName.message}</span>
                      )
                    }
                    reactInputClassName="form-inputs"
                    inputClassName="inputs"
                  />

                  <label>Teacher List</label>
                  {!projectObj && (
                    <Select
                      isMulti
                      onChange={(e) => setAssignUserId(e.map((e) => e.value))}
                      options={empList.map((empList) => {
                        return {
                          value: empList._id,
                          label: `${
                            empList.firstName + " " + empList.lastName
                          }`,
                        };
                      })}
                    />
                  )}

                  {projectObj && (
                    <Controller
                      name="assignedUser"
                      control={control}
                      render={({ field }) => (
                        <Select
                          isMulti
                          {...field}
                          options={empList.map((empList) => {
                            return {
                              value: empList._id,
                              label: `${
                                empList.firstName + " " + empList.lastName
                              }`,
                            };
                          })}
                        />
                      )}
                    />
                  )}

                  <label>Start Date</label>
                  <input
                    type="date"
                    className="dates mb-3"
                    {...register("startDate", {
                      required: "Start date is required",
                      valueAsDate: true,
                    })}
                  />
                  {errors.startDate && (
                    <span className="text-danger">Start date is required</span>
                  )}

                  <label>End Date</label>
                  <input
                    type="date"
                    className="dates mb-3"
                    {...register("endDate", {
                      required: "Start date is required",
                      valueAsDate: true,
                      validate: (value) => {
                        const startDate = new Date(getValues("startDate"));
                        const endDate = new Date(value);
                        return (
                          endDate >= startDate ||
                          "End date must be after start date"
                        );
                      },
                    })}
                  />
                  {errors.endDate && (
                    <span className="text-danger">
                      {errors.endDate.message}
                    </span>
                  )}

                  <label>Select an option</label>
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <select {...field} className="form-dropdown">
                        <option hidden>Select an option</option>
                        <option>Pending</option>
                        <option>Running</option>
                        <option>Complete</option>
                      </select>
                    )}
                  />
                  {errors.status && (
                    <span className="dropdown-error text-danger">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" type="submit">
                    Add Subject
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => !projectObj && reset()}
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

export default AddProjectForm;
