
import React from "react";
import "./daystatistics.scss";
import { getDay } from "@/utils/dateTimeFormat";
import { Link } from "react-router-dom"
import { DoubleRightOutlined } from "@ant-design/icons";
const DayStatistics = (props) => {
  return (
    <div className="today-statistics">
      <div className="header flex flex-sb">
        <div className="title">
          Statistics of today <span className="date">{getDay()[1]}</span>
        </div>
        <Link to="/statistics">Details <DoubleRightOutlined /></Link>
      </div>
      <div className="body flex">
        <ul>
          <li>
            <p className="tit">Turnover</p>
            <p className="num">${props.dayData.turnover}</p>
          </li>
          <li>
            <p className="tit">Valid order</p>
            <p className="num">{props.dayData.validOrderCount}</p>
          </li>
          <li>
            <p className="tit">Order completion rate</p>
            <p className="num">{(props.dayData.orderCompletionRate * 100).toFixed(0)}%</p>
          </li>
          <li>
            <p className="tit">Average customer spent</p>
            <p className="num">${props.dayData.unitPrice}</p>
          </li>
          <li>
            <p className="tit">New User</p>
            <p className="num">{props.dayData.newUsers}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DayStatistics;
