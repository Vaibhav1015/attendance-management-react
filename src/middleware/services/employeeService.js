import axiosClient from "../../config/axiosConfig";
import config from "../../config/config";

export const getEmployee = async () => {
  try {
    let res = await axiosClient.get(`${config.getEmployeeUrl}`);
    if (res.status === 200) {
      return res;
    } else {
      return "";
    }
  } catch (error) {
    console.error(error);
  }
};

export const getEmployeeByUserId = async (userId) => {
  try {
    let res = await axiosClient.get(
      `${config.getEmployeeByUserIdUrl}/${userId}`
    );
    if (res.status === 200) {
      return res;
    } else {
      return "";
    }
  } catch (error) {
    console.error(error);
  }
};

export const getEmployeePagination = async (
  itemsPerPage,
  currentPage,
  selectedJobTitle
) => {
  try {
    let res = await axiosClient.get(
      `${config.getEmployeeUrl}?pageSize=${itemsPerPage}&page=${currentPage}&jobTitle=${selectedJobTitle}`
    );
    if (res.status === 200) {
      return res;
    } else {
      return "";
    }
  } catch (error) {
    console.error(error);
  }
};

export const registerEmployee = async (data) => {
  try {
    return await axiosClient.post(`${config.registerEmployeeUrl}`, {
      email: data.email.toLowerCase(),
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      jobTitle: data.jobTitle,
      joinDate: data.joinDate,
      gender: data.gender,
      role: data.role.toLowerCase(),
    });
  } catch (error) {
    console.error("error >>>>>", error);
  }
};

export const editEmployee = async (userId, data) => {
  try {
    const res = await axiosClient.put(`${config.editEmployeeUrl}/${userId}`, {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      birthDate: data.birthDate,
      address: data.address,
      bloodGroup: data.bloodGroup,
      linkedIn: data.linkedIn,
    });
    if (res.data.success) {
      return res;
    }
  } catch (error) {
    console.error("error >>>>>", error);
  }
};

export const deleteEmployee = async (id) => {
  try {
    return await axiosClient.delete(`${config.deleteProjectUrl}/${id}`);
  } catch (error) {
    console.error(error);
  }
};
