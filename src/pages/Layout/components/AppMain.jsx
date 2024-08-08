import React from "react";
import { Outlet } from "react-router-dom";


const AppMain = () => {
  return (
    <div className="appmain">
      <div className="layout-content" style={{ padding: 20 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppMain;
