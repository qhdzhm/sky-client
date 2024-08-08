import { instance } from "@/utils";

export const getDishList =(params)=>instance({
  url:'/admin/dish/page',
  params:params
})

export const addDish = (data) => instance({
  url: "/admin/dish",
  method:'post',
  data:data
})

export const getDishById =(id)=>instance({
  url:`/admin/dish/${id}`,
})

export const deleteDishBatch =(params)=>instance({
  url:'/admin/dish',
  method:'delete',
  params:{
    ids:params
  }
})

export const updateDish = (params)=>instance({
  url:'/admin/dish',
  method:'put',
  data:params
})

export const getDishListByCateId = (params)=>instance({
  url:'/admin/dish/list',
  params:params
})