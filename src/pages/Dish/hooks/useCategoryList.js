// useCategoryList.js
import { fetchCategoryList } from "@/apis/Category";
import { useState,useEffect } from "react";

const useCategoryList = () => {
  const [dishCategorys, setDishCategorys] = useState([]);

  useEffect(() => {
    async function getCategorys() {
      const res = await fetchCategoryList({ type: 1 });
      setDishCategorys(
        res.data.data.map((e) => ({
          value: e.id,
          label: e.name
        }))
      );
    }
    getCategorys();
  }, []);

  return dishCategorys;
};

export default useCategoryList;