import { instance } from "@/utils";

export const getCategoryList = (params) =>
  instance({
    url: "admin/category/page",
    params,
  });

export const addCategory = (data) =>
  instance({
    url: "/admin/category",
    method: "post",
    data: data,
  });

export const updateCategory = (data) =>
  instance({
    url: "/admin/category",
    method: "put",
    data: data,
  });

export const updateStatus = (id, status) =>
  instance({
    url: `/admin/category/status/${status}`,
    method: "post",
    params: {
      id: id,
    },
  });

export const deleteCategory = (id) =>
  instance({
    url: "/admin/category",
    method: "delete",
    params: {
      id,
    },
  });

export const fetchCategoryList = (params) =>
  instance({
    url: "/admin/category/list",
    params: params,
  });

