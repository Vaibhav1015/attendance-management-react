import React, { useEffect, useState } from "react";
import HolidayAdd from "./HolidayAdd";
import { roles } from "../../../constants/constantFunction";
import moment from "moment";
import { getHoliday } from "../../../middleware/services/holidayService";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";

const Holiday = () => {
  const [holiday, setHoliday] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getHoliday().then((res) => {
      setHoliday(res);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="holiday-main">
        <div className="main-wrapper">
          {roles() && (
            <button
              className="add-holiday-icon btn btn-primary  px-4"
              data-bs-toggle="modal"
              data-bs-target="#holidayModal"
            >
              <i className="add-icon-holiday bi bi-plus-circle"></i>
              Add Holiday
            </button>
          )}
          <div className="row">
            <HolidayAdd
              className="modal fade"
              id="holidayModal"
              tabIndex="-1"
              arialabelledby={"exampleModalLabel"}
              ariaHidden="true"
              setHoliday={setHoliday}
            />
            {loading && <ReactLoadingSpinner />}
            {!loading && holiday.length !== 0 && (
              <div className="card-main-body col-xl-6 col-sm-12 col-12 d-flex">
                <div className="card flex-fill">
                  <div className="card-header">
                    <h2 className="card-titles">Holidays List</h2>
                  </div>
                  <div className="card-body">
                    <div className="table table-responsive custimze-table">
                      <table className="table">
                        <thead className="holiday-thead">
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Holiday Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {holiday.map((day, index) => {
                            return (
                              <tr key={index}>
                                <>
                                  <td>
                                    {moment(day.date).format("DD-MM-YYYY")}
                                  </td>
                                  <td>{day.holidayName}</td>
                                </>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Holiday;
