import { instance } from "@/utils";

export const getMealList =(params)=>instance({
  url:'/admin/setmeal/page',
  params:params
})

export const getMealById = (id)=>instance({
  url:`/admin/setmeal/${id}`
})

export const addMeal = (params)=>instance({
  url:'/admin/setmeal',
  method:'POST',
  data:params
})

export const updateMeal =(params)=>instance({
  url:'/admin/setmeal',
  method:'put',
  data:params
})

export const delBatchMeal = (params)=>instance({
  url:'/admin/setmeal',
  method:'delete',
  params:{
    ids:params
  }
})