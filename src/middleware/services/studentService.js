import axiosClient from "../../config/axiosConfig";
import config from "../../config/config";

export const registerStudent = async (data) => {
  try {
    return await axiosClient.post(`${config.registerStudent}`, {
      email: data.email.toLowerCase(),
      fullName: data.fullName,
      birthDate: data.birthDate,
      joinDate: data.joinDate,
      gender: data.gender,
      classStd: data.classStd,
    });
  } catch (error) {
    console.error("error >>>>>", error);
  }
};

export const getStudentPagination = async (itemsPerPage, currentPage) => {
  try {
    let res = await axiosClient.get(
      `${config.getStudentUrl}?pageSize=${itemsPerPage}&page=${currentPage}`
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

export const deleteStudent = async (id) => {
  try {
    return await axiosClient.delete(`${config.deleteStudent}/${id}`);
  } catch (error) {
    console.error(error);
  }
};
