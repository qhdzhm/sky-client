import React from "react";
import "./OrderManager.scss";
import { Link } from "react-router-dom";
import { UnorderedListOutlined, CheckCircleOutlined, HourglassOutlined, CloseCircleOutlined, InboxOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { getDay } from "@/utils/dateTimeFormat";
const OrderManager = (props) => {
  return (
    <div className="order-manager">
      <div className="header flex flex-sb">
        <div className="title">
          Order Manager <span className="date">{getDay()[1]}</span>
        </div>
        <Link to="/order">Details <DoubleRightOutlined /></Link>
      </div>
      <div className="body flex">
        <div className="body flex">
        <ul>
      <li>
        <p className="tit">
          <HourglassOutlined /> Awaiting Acceptance
        </p>
        <p className="num red">{props.orderData.waitingOrders}</p>
      </li>
      <li>
        <p className="tit">
          <UnorderedListOutlined /> Pending Delivery
        </p>
        <p className="num red">{props.orderData.deliveredOrders}</p>
      </li>
      <li>
        <p className="tit">
          <CheckCircleOutlined /> Completed
        </p>
        <p className="num">{props.orderData.completedOrders}</p>
      </li>
      <li>
        <p className="tit">
          <CloseCircleOutlined /> Cancelled
        </p>
        <p className="num">{props.orderData.cancelledOrders}</p>
      </li>
      <li>
        <p className="tit">
          <InboxOutlined /> All Orders
        </p>
        <p className="num">{props.orderData.allOrders}</p>
      </li>
    </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderManager;
