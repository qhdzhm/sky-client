import { MenuFoldOutlined } from "@ant-design/icons";
import React from "react";
import './Hamburger.scss'
const Hamburger = ({ isActive, toggleSideBar }) => {

  return (
    <div
      className='hamburger'
      onClick={toggleSideBar}
    >
      <MenuFoldOutlined className={`icon ${isActive ? "is-active" : ""}`} style={{ width: 20, height: 30 }} />
    </div>
  );
};

export default Hamburger;
