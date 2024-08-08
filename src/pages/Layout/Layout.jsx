import React from "react";
import "./Layout.scss";
import Sidebar from "./components/SideBar/Sidebar";
import AppMain from "./components/AppMain";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import "./Layout.scss";
const Layout = () => {
  const { sidebar } = useSelector((state) => state.app);
  return (
    <div className= {`classObj app-wrapper ${sidebar.opened ? 'hideSidebar':''}`}>
      <div
        className={sidebar.opened ? "drawer-bg" : ""}
        // onClick={handleClickOutside}
      />
      <Sidebar class="sidebar-container" />
      <div className='main-container'>
        <NavBar />
        <AppMain />
      </div>
    </div>
  );
};

export default Layout;
