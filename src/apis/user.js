import { instance } from "@/utils";

export const getShopStatus = () =>
  instance({
    url: `/admin/shop/status`,
    method: "get",
  });

export const setShopStatus = (data) =>
  instance({
    url: `/admin/shop/` + data,
    method: "put",
    data: data,
  });
