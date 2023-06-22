import axios from "axios";
import { useForm } from "react-hook-form";

const DocumentForm = ({
  className,
  id,
  ariaLabelledby,
  tabIndex,
  userId,
  updatedDocData,
}) => {
  const baseUrl = "http://192.168.5.85:5000/api/adddocument";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log({
      userId,
      fileName: data.fileName,
      image: data.document[0],
    });
    try {
      axios
        .post(
          baseUrl,
          {
            userId: userId,
            fileName: data.fileName,
            image: data.document[0],
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          if (res.data.success) {
            updatedDocData();
          }
          document.getElementById("addDocumentModalId").click();
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="modal fade"
        data-bs-backdrop="false"
        id={id}
        tabIndex={tabIndex}
        aria-labelledby={ariaLabelledby}
        aria-hidden={"false"}
      >
        <div className="modal-dialog modal-dialog-centered documentModal">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Upload Documents
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <div>
                <input
                  type="text"
                  {...register("fileName", { required: true })}
                />
                {errors.fileName && (
                  <span className="text-danger">File Name is required</span>
                )}
              </div>
              <div>
                <label className="custom-file-upload uploadLabelDiv">
                  <input
                    type="file"
                    {...register("document", {
                      required: true,
                    })}
                    placeholder="Document"
                  />
                  Upload Document
                  {errors.document && (
                    <span className="text-danger">Document is required</span>
                  )}
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="addDocumentModalId"
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

export default DocumentForm;
