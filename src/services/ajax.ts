import axios from "axios";
import { message } from "antd";
import { getToken } from "../utils/user-token";
import { error } from "console";

const instance = axios.create({
  timeout: 10 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers.Authorization = token.substring(1,token.length-1);
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;

  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }
  }
  return data as any;
});
export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};
export type ResDataType = {
  [key: string]: any;
};

export type ResQuestionType ={
    total: number;
    list: Question[];
}

type Question ={
    id: number;
    isPublished: number;
    isStar: number;
    answerCount: number;
    isDeleted: number;
    create_user: number;
    title: string;
    desc: string;
    componentList: string;
    js: string;
    css: string;
    createdAt?: string | null;
}