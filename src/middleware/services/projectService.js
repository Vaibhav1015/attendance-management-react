import axiosClient from "../../config/axiosConfig";
import config from "../../config/config";
import { getUser } from "../../constants/constantFunction";

export const getProjects = async () => {
  try {
    let res = await axiosClient.get(`${config.getProjectUrl}`);
    if (res.status === 200 && res.data.length !== 0) {
      return res.data;
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

export const postProject = async (data, assingUserId) => {
  try {
    return await axiosClient.post(`${config.postProjectUrl}/${getUser()._id}`, {
      projectName: data.projectName,
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate,
      assignedUsers: assingUserId,
    });
  } catch (error) {
    console.error("error >>>>>", error);
  }
};

export const editProject = async (data, projectObj) => {
  // let yy = data.assignedUser.map((e) => e.value);
  console.log(data);
  try {
    return await axiosClient.put(`${config.getProjectUrl}/${getUser()._id}`, {
      _id: projectObj._id,
      projectName: data.projectName,
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate,
      assignedUsers: data.assignedUser.map((e) => e.value),
    });
  } catch (error) {
    console.error("error >>>>>", error);
  }
};

export const deleteProject = async (id) => {
  try {
    return await axiosClient.delete(
      `${config.getProjectUrl}${config.deleteProjectUrl}/${getUser()._id}`,
      {
        data: {
          _id: id,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
