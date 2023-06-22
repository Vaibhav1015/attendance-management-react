import React, { useState } from "react";
import { useForm } from "react-hook-form";

import ReactInput from "../../../components/ReactInput";

import { postEducation } from "../../../../middleware/services/educationService";

const EducationalDetailsForm = ({
  className,
  id,
  ariaLabelledby,
  ariaHidden,
  tabIndex,
  setEduction,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showForm, setShowForm] = useState(true);

  const onSubmit = async (data) => {
    postEducation(data, userId).then((res) => {
      setEduction((oldArr) => [...oldArr, res.data.data]);
      setShowForm(false);
      document.getElementById("educationModalId").click();
    });
  };

  return (
    <>
      <div
        className={showForm ? className : "modal fade d-none"}
        data-bs-backdrop="false"
        id={id}
        tabIndex={tabIndex}
        aria-labelledby={ariaLabelledby}
        aria-hidden={showForm ? ariaHidden : "false"}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Educational Information
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="edit-education-form modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="main-form ">
                  <div className="edit-input ">
                    <ReactInput
                      register={{
                        ...register("degree", {
                          required: " This field is required",
                        }),
                      }}
                      label="Education"
                      placeholder="Education"
                      asterisk="true"
                      error={
                        errors.degree && <span>{errors.degree.message}</span>
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />
                    <ReactInput
                      register={{
                        ...register("institute", {
                          required: " This field is required",
                        }),
                      }}
                      label="Institute"
                      placeholder="Institute"
                      asterisk="true"
                      error={
                        errors.institute && (
                          <span>{errors.institute.message}</span>
                        )
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />
                  </div>
                  <div className="edit-input ">
                    <ReactInput
                      register={{
                        ...register("result", {
                          required: " This field is required",
                        }),
                      }}
                      label="Result"
                      placeholder="Result"
                      asterisk="true"
                      error={
                        errors.result && <span>{errors.result.message}</span>
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />
                    <ReactInput
                      register={{
                        ...register("pass_year", {
                          required: " This field is required",
                        }),
                      }}
                      label="PassYear"
                      placeholder="PassYear"
                      asterisk="true"
                      error={
                        errors.pass_year && (
                          <span>{errors.pass_year.message}</span>
                        )
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />
                  </div>
                </div>
                <div className="education-footer modal-footer">
                  <button className="btn btn-primary" type="submit">
                    ADD
                  </button>
                  <button
                    id="educationModalId"
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
    </>
  );
};

export default EducationalDetailsForm;
