import React from "react";
import ReactInput from "../../components/ReactInput";
import { useForm } from "react-hook-form";
import { postHoliday } from "../../../middleware/services/holidayService";

const HolidayAdd = ({
  className,
  id,
  arialabelledby,
  ariaHidden,
  tabIndex,
  setHoliday,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (addholidayData) => {
    if (addholidayData) {
      postHoliday(addholidayData).then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setHoliday((oldArr) => [res.data.data, ...oldArr]);
        }
      });
    }
  };

  return (
    <div
      className={className}
      id={id}
      tabIndex={tabIndex}
      aria-labelledby={arialabelledby}
      aria-hidden={ariaHidden}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered ">
        <div className="modal-content ">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Add Projects
            </h1>
          </div>
          <div className="addEmployee-form modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="main-form "></div>

              <ReactInput
                register={{
                  ...register("holidayName", {
                    required: "holidayName cannot be empty",
                  }),
                }}
                label="Holiday Name"
                placeholder="Holiday Name"
                asterisk="true"
                error={
                  errors.holidayName && (
                    <span>{errors.holidayName.message}</span>
                  )
                }
                reactInputClassName="form-inputs"
                inputClassName="inputs"
              />

              <label>Date</label>
              <input
                type="date"
                className="dates mb-3"
                {...register("date", {
                  required: "Date is required",
                  valueAsDate: true,
                })}
              />
              {errors.date && (
                <span className=" text-danger">Start date is required</span>
              )}

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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayAdd;
