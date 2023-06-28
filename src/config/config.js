const config = {
  baseUrl: "https://academic-attendance.onrender.com/api",
  //Holiday
  getHolidayUrl: "/holiday",
  postHolidayUrl: "/addholiday",
  // Project
  getProjectUrl: "/project",
  postProjectUrl: "/addproject",
  deleteProjectUrl: "/delete",
  // Employee
  getEmployeeUrl: "/getall",
  getEmployeeByUserIdUrl: "/get",
  registerEmployeeUrl: "/register",
  editEmployeeUrl: "/update",
  //Leave
  getLeaveUrl: "/leave",
  postLeaveUrl: "/addleave",
  getAllLeave: "all-leaves?status=",
  // Eduction
  getEducation: "/education",
  postEducation: "/addeducation",
  deleteEducation: "/education/delete",
  editEducation: "/education",
  //Image
  postImageUrl: "/add-image",
  editImageUrl: "/update/image",
  deleteImageUrl: "/profile/delete",
  // Bank
  getBank: "/bank",
  addBank: "/addbank",
  editBank: "/bank",
};
export default config;
