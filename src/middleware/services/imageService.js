import axiosClient from "../../config/axiosConfig";
import config from "../../config/config";

export const postImage = async (e, userId) => {
  try {
    return await axiosClient.post(
      `${config.postImageUrl}/${userId}`,
      { image: e.target.files[0] },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  } catch (err) {
    console.log("err>>", err);
  }
};

export const editImage = async (e, userId) => {
  try {
    return await axiosClient.put(
      `${config.editImageUrl}/${userId}`,
      { image: e.target.files[0] },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (userId) => {
  try {
    const res = await axiosClient.delete(`${config.deleteImageUrl}/${userId}`);
    if (res.data.success) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
