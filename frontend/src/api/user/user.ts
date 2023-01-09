import axios from "axios";
import { userUpdate } from "../../pages/admin/profile";
import { client } from "../client";

export const fetchUserList = async (filter: {
  page: number;
  gender: string;
  nat: string;
}) => {
  const result = await axios.get(
    `https://randomuser.me/api/?page={${filter.page}}&results=9&gender=${filter.gender}&nat=${filter.nat}`
  );
  return result;
};

export const doSignIn = async (data: { user_Id: string; password: string }) => {
  const result = await client.post(`/user/login`, data);
  return result;
};

export const doSignUp = async (data: { user_Id: string; password: string }) => {
  const result = await client.post(`/user/signup`, data);
  return result;
};

export const getUserDetail = async () => {
  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  const result = await client.get(`/user/getInfo`, headers);
  return result;
};

export const doUpdateUser = async (data: userUpdate) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  const result = await client.put(`/user/update`, data, headers);
  return result;
};
