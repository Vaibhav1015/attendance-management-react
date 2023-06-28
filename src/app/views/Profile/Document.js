import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import DocumentForm from "./EditForms/DocumentForm";
import NoData from "../../components/NoData";
import ReactLoadingSpinner from "../../components/ReactLoadingSpinner";

const Document = ({ userId, tabId }) => {
  const [documentData, setDocumentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getDocument = useCallback(() => {
    try {
      setIsLoading(true);
      axios
        .get(`https://academic-attendance.onrender.com/api/document/${userId}`)
        .then((response) => {
          setDocumentData(response.data.data);

          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error, "error");
    }
  }, [userId]);

  const openLink = (url) => {
    window.open(url);
  };

  useEffect(() => {
    if (tabId === "document-tab") {
      getDocument();
    }
  }, [getDocument, tabId]);

  const deleteDocument = (id) => {
    console.log(id, "d id");
    try {
      setIsLoading(true);
      axios
        .delete(
          `https://academic-attendance.onrender.com/api/document/delete/${id}`
        )
        .then((res) => {
          if (res.data.success) {
            getDocument();
            setIsLoading(false);
          }
        });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <div className="container documentsDetailsDiv">
        <p className="headerText">Documents Details</p>

        <div className="detailsDiv">
          <div className="container text-center ps-0">
            <button
              className="btn btn-primary rounded-0 px-4 w-75 uploadBtn"
              data-bs-toggle="modal"
              data-bs-target="#documentModalForm"
            >
              Upload Documents
            </button>
            <DocumentForm
              className="modal fade"
              id="documentModalForm"
              tabIndex="-1"
              arialabelledby={"exampleModalLabel"}
              ariaHidden="true"
              userId={userId}
              updatedDocData={getDocument}
            />
          </div>
          {isLoading && <ReactLoadingSpinner />}
          {!isLoading && documentData.length === 0 && (
            <div className="headerText mt-5 text-center text-uppercase">
              <NoData />
            </div>
          )}
          {!isLoading && documentData && documentData.length !== 0 && (
            <div className="documentListDiv w-">
              <ul className="listDiv w-75">
                {documentData.map((list) => {
                  return (
                    <li
                      className="my-2 documentDiv d-flex justify-content-between w-100"
                      key={list._id}
                    >
                      <p className="documentName w-50">{list.fileName}</p>
                      <div
                        className="deleteBtn w-25 delete-icon bi bi-trash"
                        data-bs-toggle="modal"
                        data-bs-target={`#${list._id}deleteDoc`}
                      >
                        <div
                          className="modal fade"
                          id={`${list._id}deleteDoc`}
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog  modal-dialog-centered">
                            <div className="modal-content rounded-0">
                              <div className="modal-body">
                                Are you sure you want to delete ?
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary rounded-0"
                                  data-bs-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger rounded-0"
                                  onClick={() => deleteDocument(list._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="viewBtn w-25 ms-3 bi bi-eye"
                        onClick={() => openLink(list.image)}
                      ></div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Document;
