import React, { useCallback, useEffect, useState } from "react";

import BankDetailsForm from "./EditForms/BankDetailsForm";
import { getUserBank } from "../../../middleware/services/bankService";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";
import NoData from "../../components/NoData";

const BankAccount = ({ userId, tabId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bankDetailsData, setBankDetailsData] = useState();
  // const [errorMessage, setErrorMessage] = useState("");

  const getBankDetails = useCallback(() => {
    setIsLoading(true);
    getUserBank(userId).then((res) => {
      setBankDetailsData(res.data.data);
      // if (!res.data.data) {
      //   setErrorMessage(res.data.msg);
      // }
      setIsLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (tabId === "bank-account-tab") {
      getBankDetails();
    }
  }, [getBankDetails, tabId]);

  return (
    <>
      <div className="container bankDetailsDiv">
        <button
          className="btn btn-primary rounded-0 px-4"
          data-bs-toggle="modal"
          data-bs-target="#bankDetailModalForm"
        >
          {bankDetailsData ? <p>Edit</p> : <p>Add</p>}
        </button>

        <BankDetailsForm
          className="modal fade"
          id="bankDetailModalForm"
          tabIndex="-1"
          arialabelledby={"exampleModalLabel"}
          ariaHidden="true"
          bankDetail={bankDetailsData}
          updateBankDetails={setBankDetailsData}
          userId={userId}
        />

        <p className="headerText">Bank Details</p>
        {isLoading && <ReactLoadingSpinner />}
        {!isLoading && !bankDetailsData && <NoData />}
        {/* {errorMessage} */}
        {!isLoading && bankDetailsData && (
          <div className="detailsDiv">
            <div className="container text-left">
              <div className="row mb-3">
                <div className="col col-lg-3 ps-0 titleDiv">Bank Name :</div>
                <div className="col ps-0 infoDiv">
                  {bankDetailsData?.bankName ? bankDetailsData.bankName : "--"}
                </div>
              </div>
              <div className="row my-3">
                <div className="col col-lg-3 ps-0 titleDiv">Holder Name : </div>
                <div className="col ps-0 infoDiv">
                  {bankDetailsData?.holderName
                    ? bankDetailsData.holderName
                    : "--"}
                </div>
              </div>
              <div className="row my-3">
                <div className="col col-lg-3 ps-0 titleDiv">Branch name :</div>
                <div className="col ps-0 infoDiv">
                  {bankDetailsData?.branchName
                    ? bankDetailsData.branchName
                    : "--"}
                </div>
              </div>
              <div className="row my-3">
                <div className="col col-lg-3 ps-0 titleDiv">
                  Account Number :
                </div>
                <div className="col ps-0 infoDiv">
                  {bankDetailsData?.accountNumber
                    ? bankDetailsData.accountNumber
                    : "--"}
                </div>
              </div>
              <div className="row my-3">
                <div className="col col-lg-3 ps-0 titleDiv">Account Type :</div>
                <div className="col ps-0 infoDiv">
                  {bankDetailsData?.accountType
                    ? bankDetailsData.accountType
                    : "--"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BankAccount;
