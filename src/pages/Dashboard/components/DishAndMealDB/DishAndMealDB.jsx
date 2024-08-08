import { Button } from "antd";
import React from "react";
import "./DishAndMealDB.scss";
import { DoubleRightOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const DishAndMealDB = (props) => {
  const navigate = useNavigate();
  const hanleAddDish = () => {
    navigate("/dish/add");
  };
  const hanleAddMeal = () => {
    navigate("/setmeal/add");
  };
  return (
    <div className="dish-meal-container">
      <div className="dish-manager">
        <div className="header flex flex-sb">
          <div className="title">
            Dish Manager <span></span>
          </div>
          <Link to="/dish">
            Details <DoubleRightOutlined />
          </Link>
        </div>

        <div className="body dish-body">
          <div className="on-sale">
            <span className="tit">On sale</span>
            <span className="num">{props.dishData.sold}</span>
          </div>
          <div className="out-of-sale">
            <span className="tit">Out of sale</span>
            <span className="num">{props.dishData.discontinued}</span>
          </div>
          <div className="add-dish">
            <Button type="primary" onClick={hanleAddDish}>
              +Add Dish
            </Button>
          </div>
        </div>
      </div>

      <div className="meal-manager">
        <div className="header flex flex-sb">
          <div className="title">
            Meal Manager <span></span>
          </div>
          <Link to="/setmeal">
            Details <DoubleRightOutlined />
          </Link>
        </div>
        <div className="body meal-body">
          <div className="on-sale">
            <span className="tit">On sale</span>
            <span className="num">{props.mealData.sold}</span>
          </div>
          <div className="out-of-sale">
            <span className="tit">Out of sale</span>
            <span className="num">{props.mealData.discontinued}</span>
          </div>

          <div className="add-meal">
            <Button type="primary" onClick={hanleAddMeal}>
              +Add Meal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishAndMealDB;
