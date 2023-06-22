import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactInput from "../../../components/ReactInput";
import {
  editBank,
  postBank,
} from "../../../../middleware/services/bankService";

const BankDetailsForm = ({
  className,
  id,
  ariaLabelledby,
  ariaHidden,
  tabIndex,
  bankDetail,
  updateBankDetails,
  userId,
}) => {
  const InitialState = {
    userId: "",
    holderName: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
    accountType: "",
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { InitialState } });

  const [showForm, setShowForm] = useState(true);

  const onSubmit = (data) => {
    if (bankDetail) {
      editBankData(data);
      setShowForm(false);
      document.getElementById("bankDetailModalId").click();
    } else {
      addBankData(data);
      setShowForm(false);
      document.getElementById("bankDetailModalId").click();
    }
  };

  const addBankData = (data) => {
    postBank(userId, data).then((res) => {
      updateBankDetails(res.data.data);
    });
  };

  const editBankData = async (data) => {
    editBank(userId, data).then((res) => {
      updateBankDetails(res.data.data);
    });
  };

  useEffect(() => {
    setValue("bankName", bankDetail?.bankName);
    setValue("holderName", bankDetail?.holderName);
    setValue("branchName", bankDetail?.branchName);
    setValue("accountNumber", bankDetail?.accountNumber);
    setValue("accountType", bankDetail?.accountType);
  }, [bankDetail, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={showForm ? className : "modal fade d-none"}
          data-bs-backdrop="false"
          id={id}
          tabIndex={tabIndex}
          aria-labelledby={ariaLabelledby}
          aria-hidden={showForm ? ariaHidden : "false"}
        >
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Bank Details
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="main-form ">
                  <div className="name-input ">
                    <ReactInput
                      register={{
                        ...register("bankName", {
                          required: "Bank Name cannot be empty",
                        }),
                      }}
                      defaultValue="---"
                      label="Bank Name"
                      placeholder="Bank Name"
                      asterisk="true"
                      error={
                        errors.bankName && (
                          <span>{errors.bankName.message}</span>
                        )
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />

                    <ReactInput
                      register={{
                        ...register("holderName", {
                          required: "Holder Name cannot be empty",
                        }),
                      }}
                      label="Holder Name"
                      placeholder="Holder Name"
                      asterisk="true"
                      error={
                        errors.holderName && (
                          <span>{errors.holderName.message}</span>
                        )
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />

                    <ReactInput
                      register={{
                        ...register("branchName", {
                          required: "Branch Name cannot be empty",
                        }),
                      }}
                      label="Branch name"
                      placeholder="Branch name"
                      asterisk="true"
                      error={
                        errors.holderName && (
                          <span>{errors.branchName.message}</span>
                        )
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />

                    <ReactInput
                      register={{
                        ...register("accountNumber", {
                          required: "Account Number cannot be empty",
                        }),
                      }}
                      label="Account number"
                      placeholder="Account number"
                      asterisk="true"
                      type="number"
                      error={
                        errors.accountNumber && (
                          <span>{errors.accountNumber.message}</span>
                        )
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />
                    <ReactInput
                      register={{
                        ...register("accountType", {
                          required: "Account Number cannot be empty",
                        }),
                      }}
                      label="Account type"
                      placeholder="Account type"
                      asterisk="true"
                      error={
                        errors.accountType && (
                          <span>{errors.accountType.message}</span>
                        )
                      }
                      reactInputClassName="form-inputs"
                      inputClassName="inputs"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-3">
                  <button
                    id="bankDetailModalId"
                    type="button"
                    className="btn btn-secondary rounded-0"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary rounded-0">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BankDetailsForm;
