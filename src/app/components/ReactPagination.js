import Pagination from "react-js-pagination";

const ReactPagination = ({
  getEmp,
  totalItemsCount,
  setCurrentPage,
  setItemsPerPage,
  itemsPerPage,
  currentPage,
}) => {
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getEmp();
  };

  const onChangeCount = (e) => {
    e.preventDefault();
    setItemsPerPage(e.target.value);
  };
  return (
    <div className="main-pagination">
      <Pagination
        innerClass={`${
          currentPage.length <= 3 ? "paginationMainHide" : "paginationMain"
        }`}
        activePage={currentPage}
        itemsCountPerPage={parseInt(itemsPerPage)}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        activeClass="activePageClass"
      />
      <div className="teacher-page-main">
        Teacher Per Page :
        <select
          value={itemsPerPage}
          onChange={onChangeCount}
          className="per-page-select form-select"
          aria-label="Default select example"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
};

export default ReactPagination;
