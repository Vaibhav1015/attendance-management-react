import React, { useEffect, useMemo, useState } from "react";
const DropDown = ({ handleCallback }) => {
  const [userList, setUserList] = useState([]);
  const [optionState, setOptionState] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      const baseUrl = "http://192.168.5.85:5000/api/getall";
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Something Went wrong ");
      }
      const data = await response.json();
      setUserList(data.list);
    };
    fetchUserData();
  }, []);

  const onChangeHandler = (e) => {
    setOptionState(e.target.value);
  };
  useEffect(() => {
    handleCallback(optionState);
  }, [optionState]);

  return (
    <div className="user-list-center dropdown-center">
      <select
        className="user-list-name form-select"
        aria-label="Default select example"
        onChange={(e) => onChangeHandler(e)}
        value={optionState}
      >
        <option defaultValue="">Select Teacher Name</option>
        {userList.map((item) => (
          <option value={`${item.firstName} ${item.lastName}`} key={item._id}>
            {item.firstName} {item.lastName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
