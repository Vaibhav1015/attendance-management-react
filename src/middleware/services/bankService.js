import axiosClient from "../../config/axiosConfig";
import config from "../../config/config";

export const getUserBank = async (userId) => {
  try {
    const response = await axiosClient.get(`bank/${userId}`);
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};

export const postBank = async (userId, data) => {
  try {
    const response = await axiosClient.post(`${config.addBank}`, {
      userId: userId,
      holderName: data.holderName,
      bankName: data.bankName,
      branchName: data.branchName,
      accountNumber: data.accountNumber,
      accountType: data.accountType,
    });
    if (response.data.success) {
      return response;
    }
  } catch (error) {
    console.log(error, "error");
  }
};

export const editBank = async (userId, data) => {
  try {
    const response = await axiosClient.put(`${config.editBank}/${userId}`, {
      holderName: data?.holderName,
      bankName: data?.bankName,
      branchName: data?.branchName,
      accountNumber: data?.accountNumber,
      accountType: data?.accountType,
    });
    if (response.data.success) {
      return response;
    }
  } catch (error) {
    console.log(error, "error");
  }
};
