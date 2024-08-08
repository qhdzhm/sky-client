import { instance } from "@/utils";

export const getTurnoverStatistics = (params) =>
  instance({
    url: `admin/report/turnoverStatistics`,
    method: "get",
    params,
  });
export const getUserStatistics = (params) =>
  instance({
    url: `admin/report/userStatistics`,
    method: "get",
    params,
  });
export const getOrderStatistics = (params) =>
  instance({
    url: `admin/report/ordersStatistics`,
    method: "get",
    params,
  });
export const getTop = (params) =>
  instance({
    url: `admin/report/top10`,
    method: "get",
    params,
  });
export function exportInfor() {
  return instance({
    url: "admin/report/export",
    method: "get",
    responseType: "blob",
  });
}
