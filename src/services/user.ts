import qs from "qs";
import axios, { ResDataType } from "./ajax";

export async function getUserInfoService(): Promise<ResDataType> {
  const url = "/api/user/info";
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = "/api/user/register";
  const body = { username, password };
  const data = (await axios.post(url, qs.stringify(body))) as ResDataType;
  return data;
}

export async function loginService(
  username: string,
  password: string
): Promise<ResDataType> {
  const url = "/api/user/login";
  const body = { username, password };
  const data = (await axios.post(url, qs.stringify(body))) as ResDataType;
  return data;
}
