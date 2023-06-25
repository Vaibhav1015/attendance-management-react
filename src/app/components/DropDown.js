import React from "react";

const DropDown = () => {
  return (
    <div class="dropdown-center">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Select Teacher
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="#">
            Teacher 1
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Teacher 2
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Teacher 3
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
