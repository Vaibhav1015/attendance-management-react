import jwt from "jwt-decode";

export const getUser = () => {
  let token = localStorage.getItem("token");
  const user = token ? jwt(token) : null;
  return user && user.userData;
};

export const roles = () => {
  let token = localStorage.getItem("token");
  const user = token ? jwt(token) : null;
  return user && user.userData.role === "admin";
};
