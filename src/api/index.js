import request from "u/request";

const LOCAL_URL =
  "https://www.fastmock.site/mock/63e405ca165a676bf8b9b87cf0272a69/api";

export function getList(data = { pageNo: 1, pageSize: 10 }) {
  return request({
    url: `${LOCAL_URL}/list`,
    method: "POST",
    data,
  });
}

export function login(data) {
  return request({
    url: `${LOCAL_URL}/login`,
    method: "POST",
    data,
  });
}

export function logout(data) {
  return request({
    url: `${LOCAL_URL}/logout`,
    method: "POST",
    data,
  });
}

export function getConsultList(data) {
  return request({
    url: `${LOCAL_URL}/consult/list`,
    method: "POST",
    data,
  });
}
