import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRef } from "react";
const ConfirmPassword = ({ id }) => {
  const InitialState = { id: id, password: "" };

  const { register, handleSubmit, formState, reset, watch } = useForm({
    defaultValues: {
      InitialState,
    },
  });
  const { errors } = formState;
  const password = useRef();
  password.current = watch("password", "");
  const [showMsg, setShowMsg] = useState(false);
  const onSubmit = (data) => {
    try {
      axios
        .post("https://academic-attendance.onrender.com/api/update_password", {
          id: id,
          password: data.confirmPwd,
        })
        .then((res) => {
          setShowMsg(true);
          reset(res);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            {...register("password", {
              required: true,
              maxLength: {
                value: 12,
                message: "Password must not exceed 12 characters",
              },
              minLength: {
                value: 3,
                message: "Password must be more than 3 characters",
              },
            })}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            name="confirmPwd"
            type="password"
            {...register("confirmPwd", {
              required: true,
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
            className={`form-control ${errors.confirmPwd ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
        </div>
        {showMsg && (
          <p className="mt-3 text-success">Password Change Successfully!!</p>
        )}
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary rounded-0"
            data-bs-dismiss="modal"
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-primary rounded-0 ms-3"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
export default ConfirmPassword;
