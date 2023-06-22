import React from "react";
import { Controller, useForm } from "react-hook-form";
import { postLeave } from "../../../../middleware/services/leaveService";

const leavesArr = [
  { type: "Privilege Leave (PL) or Earned Leave (EL)" },
  { type: "Casual Leave (CL)" },
  { type: "Sick Leave (SL)" },
  { type: "Maternity Leave (ML)" },
  { type: "Compensatory Off (Comp-off)" },
  { type: "Marriage Leave" },
  { type: "Paternity Leave" },
  { type: "Bereavement Leave" },
  { type: "Loss of Pay (LOP) / Leave Without Pay (LWP)" },
];

const LeaveForm = ({
  className,
  id,
  ariaLabelledby,
  ariaHidden,
  tabIndex,
  getUserLeave,
}) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const addLeave = async (leaveData) => {
    postLeave(leaveData).then((res) => getUserLeave(res));
    document.getElementById("leaveModalId").click();
  };

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
                Apply Leave
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container leaveFormDetailsDiv">
                <div className="detailsDiv">
                  <div className="container text-left">
                    <form onSubmit={handleSubmit(addLeave)}>
                      <div className="row mb-3 d-flex">
                        <p className="col col-lg-3 ps-0 typeNameDiv mt-1">
                          Type of Leave :
                        </p>
                        <Controller
                          name="leaveType"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="col ps-0 form-select w-50 "
                              aria-label="Default select example"
                              defaultValue=""
                            >
                              <option value="" disabled hidden>
                                Choose here
                              </option>
                              {leavesArr.map((e) => {
                                return <option key={e.type}>{e.type}</option>;
                              })}
                            </select>
                          )}
                        />
                        {errors.leaveType && (
                          <span className="leave-error text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="dateInfoDiv  mb-3">
                        <div className="row col d-flex my-3">
                          <p className="col col-lg-3 ps-0 typeNameDiv mt-1">
                            Description :
                          </p>
                          <Controller
                            name="content"
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field }) => (
                              <textarea
                                {...field}
                                placeholder="Enter your text here"
                                rows={4}
                                cols={50}
                                className="col ps-0  w-50 "
                              />
                            )}
                          />
                          {errors.content && (
                            <span className="leave-error  text-danger">
                              {errors.content.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="statusDiv d-flex gap-4">
                        <button
                          id="leaveModalId"
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={() => reset()}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-outline-primary rounded-0"
                        >
                          Apply
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveForm;
