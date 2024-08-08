import React, { useEffect, useState } from "react";
import DayStatistics from "./components/daystatistics/DayStatistics";
import { getBusinessData, getOrderData ,getOverviewDishes, getSetMealStatistics } from "@/apis/Dashboard";
import OrderManager from "./components/orderManager/OrderManager";
import DishAndMealDB from "./components/DishAndMealDB/DishAndMealDB";
import OrderDetailData from "./components/OrderDetailData/OrderDetailData";

const Dashboard = () => {
  useEffect(()=>{
    getDayData()
    getDayOrder()
    getDishData()
    getMealData()
  },[])
  //dayOverview
  const [dayData,setDayData] = useState({});

  async function getDayData() {
    const res = await getBusinessData()
    setDayData(res.data.data)
  }

  //day Orders
  const [orderData,setOrderData] = useState({})
  async function getDayOrder() {
    const data = await getOrderData()
    setOrderData(data.data.data)
  }
  //dish and meal overviews
  const [dishData,setDishData] = useState({})
  const [mealData,setMealData] = useState({})
  async function getDishData() {
    const data = await getOverviewDishes()
    setDishData(data.data.data)
  }
  async function getMealData() {
    const data = await getSetMealStatistics()
    setMealData(data.data.data)
  }
  console.log(dishData);
  console.log(mealData);

  
  return (
    <div className="dash-container">
      <DayStatistics dayData={dayData}/>
      <OrderManager orderData={orderData}/>
      <DishAndMealDB dishData={dishData} mealData={mealData}/> 
      <OrderDetailData />
    </div>
  );
};

export default Dashboard;
