import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout/Layout";
import Login from "@/pages/Login/Login";
import AuthRoute from "@/components/AuthRoute";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Statistic from "@/pages/Statistics/Statistic";
import OrderDetails from "@/pages/OrderDetails/OrderDetails";
import Setmeal from "@/pages/Setmeal/Setmeal";
import AddDishType from "@/pages/Dish/AddDishType/AddDishType";
import Dish from "@/pages/Dish/Dish";
import Category from "@/pages/Category/Category";
import Employee from "@/pages/Employee/Employee";
import AddEmployee from "@/pages/Employee/AddEmployee/AddEmployee";
import AddSetmeal from "@/pages/Setmeal/AddSetmeal/AddSetmeal";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
        meta: {
          title: "Dashboard",
          icon: "HomeOutlined", 
          affix: true
        }
      },
      {
        path: "/statistics",
        element: <Statistic />,
        meta: {
          title: "Statistics",
          icon: "PieChartOutlined" 
        }
      },
      {
        path: "/order",
        element: <OrderDetails />,
        meta: {
          title: "Order Management",
          icon: "OrderedListOutlined" 
        }
      },
      {
        path: "/setmeal",
        element: <Setmeal />,
        meta: {
          title: "Setmeal Management",
          icon: "AppstoreOutlined" 
        }
      },
      {
        path: "/dish",
        element: <Dish />,
        meta: {
          title: "Dish Management",
          icon: "ShoppingOutlined" 
        }
      },
      {
        path: "/dish/add",
        element: <AddDishType />,
        meta: {
          title: "Add Dish",
          hidden: true
        }
      },
      {
        path: "/category",
        element: <Category />,
        meta: {
          title: "Category Management",
          icon: "OrderedListOutlined" 
        }
      },
      {
        path: "/employee",
        element: <Employee />,
        meta: {
          title: "Employee Management",
          icon: "TeamOutlined" 
        }
      },
      {
        path: "/employee/add",
        element: <AddEmployee />,
        meta: {
          title: "Add Employee",
          hidden: true
        }
      },
      {
        path: "/setmeal/add",
        element: <AddSetmeal />,
        meta: {
          title: "Add Setmeal",
          hidden: true
        }
      }
    ],
  },
  {
    path: "/Login",
    element: <Login />,
    meta: { title: "sky-take-away", hidden: true, notNeedAuth: true },
  },
  // {
  //   path: "/404",
  //   meta: { title:'sky-take-away',hidden:true,notNeedAuth:true}
  // },
]);
export default router;
