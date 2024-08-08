import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../../../assets/login/logo.png";
import minilogo from "../../../../assets/login/mini-logo.png";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  PieChartOutlined,
  OrderedListOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  TeamOutlined,
  UserOutlined,
  FileAddOutlined,
} from "@ant-design/icons"; // Import your icon components
import router from "@/router/route";
import './Sidebar.scss'
import { useLocation, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { sidebar } = useSelector((state) => state.app);

  const iconComponentMap = {
    homeoutlined: HomeOutlined,
    piechartoutlined: PieChartOutlined,
    orderedlistoutlined: OrderedListOutlined,
    shoppingoutlined: ShoppingOutlined,
    appstoreoutlined: AppstoreOutlined,
    teamoutlined: TeamOutlined,
    useroutlined: UserOutlined,
    fileaddoutlined: FileAddOutlined,
  };


  const getIconComponentByName = (iconName) => {
    const IconComponent = iconComponentMap[iconName.toLowerCase()]; 
    return IconComponent ? <IconComponent /> : null; 
  };

  //route fetching
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    const copyRoutes = JSON.parse(JSON.stringify(router.routes));
    let fetchedMenuList = [];
    console.log("route:", copyRoutes);
    const menu = copyRoutes.find((item) => item.path === "/");

    if (menu) {
      fetchedMenuList = menu.children || [];
    }
    setMenuList(fetchedMenuList);

  }, []);

  const visibleMenuList = menuList.filter((e) => !e.meta.hidden);
  const itemList = visibleMenuList.map((e, index) => {
    if (e.children && e.children.length > 0) {
      const children = e.children.map((e, index) => {
        return {
          key: index + 1,
          label: e.meta.title,
        };
      });
      return {
        key: e.path,
        icon: e.meta.icon,
        label: e.meta.title,
        children,
      };
    }
    return {
      key: e.path,
      icon: getIconComponentByName(e.meta.icon),
      label: e.meta.title,
    };
  });

  //sidebar navi impl 
  const navigate = useNavigate()
  const menuClick = (e)=>{
    console.log(e.key);
    navigate(e.key)
  }
  //
  const location = useLocation()
  const selectedKey = location.pathname

  return (
    <div className="sidebar-container">
      <div className="logo">
        {sidebar.opened ? (
          <div className="sidebar-logo">
            <img src={minilogo} alt="1231231"  />
          </div>
        ) : (
          <div className="sidebar-logo-mini">
            <img src={logo} alt="2"  />
          </div>
        )}
      </div>
      <div className="sidebar-Menu"

      >
        <Menu
          selectedKeys={selectedKey}
          mode="inline"
          theme="light"
          inlineCollapsed={sidebar.opened}
          items={itemList}
          onClick={menuClick}
        />
      </div>
    </div>
  );
};

export default Sidebar;
