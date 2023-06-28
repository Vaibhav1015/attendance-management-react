import axios from "axios";
import { useForm } from "react-hook-form";

const SalaryFormAdmin = ({
  className,
  id,
  tabIndex,
  ariaLabelledby,
  ariaHidden,
  getSalaryMethod,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    try {
      axios
        .post(
          "https://academic-attendance.onrender.com/api/add-salary-slip",
          {
            userId: userId,
            date: data.date,
            slip: data.document[0],
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          if (res.data.success) {
            getSalaryMethod();
          }
          document.getElementById("salaryModalId").click();
        });
    } catch (err) {
      console.log(err, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={className}
        id={id}
        tabIndex={tabIndex}
        aria-labelledby={ariaLabelledby}
        aria-hidden={ariaHidden}
      >
        <div className="modal-dialog modal-dialog-centered documentModal">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Upload Salary Slip
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <label>Select Date</label>
                <input
                  type="date"
                  name="date"
                  {...register("date", {
                    required: "date is required",
                    valueAsDate: true,
                  })}
                  className="dates mb-3"
                />
                {errors.date && (
                  <span className=" text-danger">Date is required</span>
                )}
                <div>
                  <label className="custom-file-upload uploadLabelDiv">
                    <input
                      name="document"
                      {...register("document", {
                        required: "document is required",
                      })}
                      type="file"
                    />
                    Upload Document
                  </label>
                  {errors.document && (
                    <span className=" text-danger">document is required</span>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="salaryModalId"
                type="button"
                className="btn btn-secondary rounded-0"
                data-bs-dismiss="modal"
                onClick={() => reset()}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary rounded-0">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SalaryFormAdmin;
