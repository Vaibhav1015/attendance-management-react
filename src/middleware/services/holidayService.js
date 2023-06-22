import config from "../../config/config";
import { getUser } from "../../constants/constantFunction";
import axiosClient from "../../config/axiosConfig";

export const getHoliday = async () => {
  try {
    let response = await axiosClient.get(`${config.getHolidayUrl}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return "";
    }
  } catch (error) {
    console.error(error);
  }
};

export const postHoliday = async (addHoliday) => {
  try {
    return await axiosClient.post(`${config.postHolidayUrl}/${getUser()._id}`, {
      holidayName: addHoliday.holidayName,
      date: addHoliday.date,
    });
  } catch (error) {
    console.error("error >>>>>", error);
  }
};
