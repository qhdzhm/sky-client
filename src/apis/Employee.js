import { instance } from "@/utils";

export const getEmpList = (params) =>
  instance({
    url: "/admin/employee/page",
    params,
  });

export const changeStatus = (status, id) =>
  instance({
    url: `/admin/employee/status/${status}`,
    method: "post",
    params: {
      id: id,
    },
  });

export const addEmp = (data) =>
  instance({
    url: "/admin/employee",
    method: "post",
    data: {
      ...data,
    },
  });

export const getEmpById = (id) =>
  instance({
    url: `/admin/employee/${id}`,
  });

export const updateEmp = (params) =>
  instance({
    url: "/admin/employee",
    // TODO: 
  // TODO: change method to put
    method: "put",
    data: { ...params },
  });
