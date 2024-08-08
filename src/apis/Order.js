import { instance } from "@/utils";

export const getstatistics = ()=> instance({
  url:'/admin/order/statistics'
})

export const getOrderList = (params)=> instance({
  url:'/admin/order/conditionSearch',
  params:params
})

export const handleAccept = (id)=> instance({
  url:'/admin/order/confirm',
  method:'put',
  data:{id:id}
})

export const delivery = (id)=> instance({
  url:`/admin/order/delivery/${id}`,
  method:'put',
})

export const complete = (id)=> instance({
  url:`/admin/order/complete/${id}`,
  method:'put',
})

export const cancel = (params)=> instance({
  url:'/admin/order/cancel',
  method:'put',
  data:params
})

export const reject = (params)=> instance({
  url:'/admin/order/rejection',
  method:'put',
  data:params
})


export const detail = (id)=> instance({
  url:`/admin/order/details/${id}`,
  method:'get'
})
