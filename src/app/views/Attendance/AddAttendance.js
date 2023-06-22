import React from "react";
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
        control,
        reset,
        formState: { errors },
    } = useForm();
    const [showForm, setShowForm] = useState(true);
    const onSubmit = () => { };
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
                                        <table class="table table-bordered">
                                            <thead className="thead">
                                                <tr>
                                                    <th scope="col">Roll No</th>
                                                    <th scope="col">Student Name</th>
                                                    <th scope="col">Present</th>
                                                    <th scope="col">Absent</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Vaibhav Andhale</td>
                                                    <td>P</td>
                                                    <td>P </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="attendance-footer">
                                    <button className="btn btn-success" type="submit">
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