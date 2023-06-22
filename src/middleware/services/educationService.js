import axiosClient from "../../config/axiosConfig";
import config from "../../config/config";

export const getUserEducation = async (userId) => {
  try {
    const response = await axiosClient.get(`${config.getEducation}/${userId}`);
    if (response.data.success && response.data.data.length !== 0) {
      return response;
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

export const postEducation = async (data, userId) => {
  try {
    const response = await axiosClient.post(`${config.postEducation}`, {
      userId: userId,
      degree: data.degree,
      institute: data.institute,
      result: data.result,
      pass_year: data.pass_year,
    });
    if (response.data.success) {
      return response;
    }
  } catch (error) {
    console.error("error >>>>>", error);
  }
};

export const deleteEducation = async (id) => {
  try {
    const response = await axiosClient.delete(`${config.deleteEducation}`, {
      data: {
        _id: id,
      },
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const editEducation = async (userId, eductionId, data) => {
  try {
    const response = await axiosClient.put(
      `${config.editEducation}/${userId}`,
      {
        _id: eductionId,
        degree: data.degree,
        institute: data.institute,
        result: data.result,
        pass_year: data.pass_year,
      }
    );
    if (response.data.success) {
      return response;
    }
  } catch (error) {
    console.error("error >>>>>", error);
  }
};
