import { fetchCategoryList } from "@/apis/Category";
import { useEffect, useState } from "react";

const useMealCategory = ()=>{
  const [mealCategory,setMealCategory] = useState([])
  useEffect(()=>{
    async function getMealCatogory(){
      const res = await fetchCategoryList({type : 2})
      setMealCategory(
        res.data.data.map((e) => ({
          value: e.id,
          label: e.name
        }))
      );
    }
    getMealCatogory();

  },[])
  return mealCategory;
}
export default useMealCategory;