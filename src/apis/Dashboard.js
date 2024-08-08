import { instance } from "@/utils";

export const getBusinessData = () =>
  instance({
    url: `admin/workspace/businessData`,
    method: "get",
  });
export const getOrderData = () =>
  instance({
    url: `admin/workspace/overviewOrders`,
    method: "get",
  });

export const getOverviewDishes = () =>
  instance({
    url: `admin/workspace/overviewDishes`,
    method: "get",
  });
export const getSetMealStatistics = () =>
  instance({
    url: `admin/workspace/overviewSetmeals`,
    method: "get",
  });
