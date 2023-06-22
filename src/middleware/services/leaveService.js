import axiosClient from "../../config/axiosConfig";
import config from "../../config/config";
import { getUser } from "../../constants/constantFunction";

export const getLeave = async (userId) => {
  try {
    let response = await axiosClient.get(`${config.getLeaveUrl}/${userId}`);
    if (response.data.success) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const postLeave = async (leaveData) => {
  try {
    const response = await axiosClient.post(`${config.postLeaveUrl}`, {
      userId: getUser()._id,
      leaveType: leaveData.leaveType,
      content: leaveData.content,
    });
    if (response.data.success) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllLeave = async (leaveStatus) => {
  try {
    let response = await axiosClient.get(`${config.getAllLeave}${leaveStatus}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};
