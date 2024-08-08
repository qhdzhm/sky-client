import Hamburger from "@/components/Hamburger";
import { toggleSidebar } from "@/store/AppStore/AppStore";
import { CaretUpOutlined } from "@ant-design/icons";
import { Button, message, Modal, notification, Radio, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Password from "../password/Password";
import "./NavBar.scss";
import { clearUserInfo } from "@/store/UserStore/UserStore";
import { useNavigate } from "react-router-dom";
import { getShopStatus, setShopStatus } from "@/apis/user";
import "../../../../assets/preview.mp3";
const NavBar = () => {
  const { sidebar } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(1);

  const [shopShow, setShopShow] = useState(false);
  //handle sidebar
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar(false));
  };
  const [radioValue, setRadioValue] = useState(1);
  useEffect(() => {
    async function getStatus() {
      const res = await getShopStatus();
      setStatus(res.data.data);
      setRadioValue(res.data.data);
    }
    getStatus();
  }, []);
  //handle dialog
  const [dialogVisible, setDialogVisible] = useState(false);
  const handleOk = async () => {
    //const flag = radioValue === 0 ? false : true;
    await setShopStatus(radioValue);
    const res = await getShopStatus();
    setStatus(res.data.data);
    setDialogVisible(false);
  };
  const handleCancel = () => {
    setDialogVisible(false);
  };
  //handle radio in dialog

  const handleRadio = (e) => {
    setRadioValue(e.target.value);
  };
  //Logout
  //
  const navigate = useNavigate();
  const logout = () => {
    dispatch(clearUserInfo());
    navigate("/login");
  };

  //PasswordFormVisible
  const [passwordFormVisible, setPasswordFormVisible] = useState(false);

  const handlePasswardForm = () => {
    setPasswordFormVisible(!passwordFormVisible);
  };

  //webSocket
  const audioPreviewRef = useRef(null);
  const audioReminderRef = useRef(null);
  const [orderType, setOrderType] = useState(0);
  const [socketData, setSocketData] = useState("");
  const [switchButton,setSwitchButton] = useState(false)
  useEffect(() => {
    if(switchButton){
      const clientId = Math.random().toString(36).substring(2);
      const socket = new WebSocket("ws://localhost:8080/ws/" + clientId);
  
      socket.onopen = () => {
        console.log("WebSocket 连接已打开");
      };
  
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setSocketData(data);
        if (data) {
          setOrderType(data.type);
        }
      };
  
      socket.onerror = (error) => {
        console.error("WebSocket 错误:", error);
      };
  
      socket.onclose = () => {
        console.log("WebSocket 连接已关闭");
      };
  
      return () => {
        socket.close();
      };
    }
    
  }, [switchButton]);

  const showNotification = (orderType) => {
    if (orderType === 1) {
      notification.success({
        message: "New Order",
        duration: 0,
        dangerouslyUseHTMLString: true,
        onClick: () => {
          navigate(`/order?orderId=${socketData.orderId}`);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        },
        description: `You have a new order,Please check`,
      });
    } else if (orderType === 2) {
      notification.warning({
        message: "Urge an order",
        duration: 0,
        dangerouslyUseHTMLString: true,
        onClick: () => {
          navigate(`/order?orderId=${socketData.orderId}`);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        },
        description: `go check`,
      });
    }
  };
  useEffect(() => {
    showNotification(orderType);
    if (orderType === 1 && audioPreviewRef.current) {
      audioPreviewRef.current.play();
    } else if (orderType === 2 && audioReminderRef.current) {
      audioReminderRef.current.play();
    }
    setOrderType("");
  }, [orderType]);
  

  const handleSwitch = (checked)=>{
    setSwitchButton(checked)
  }
  return (
    <div className="navbar bg-brown flex flex-sb">
      <div className="status-box flex">
        
        <Hamburger
          isActive={sidebar.opened}
          className="hamburger"
          toggleSideBar={handleToggleSidebar}
        />
        {status ? (
          <span className="businessBtn">Open</span>
        ) : (
          <span class="businessBtn closing">closed</span>
        )}
        <label>Notification On/Off</label>
        <Switch onChange={handleSwitch} />
      </div>

      <div className="right-menu flex text-dark fs-14">
        <div className="right-status">
          <audio ref={audioPreviewRef} hidden>
            <source
              src="
https://hmlead22.oss-cn-beijing.aliyuncs.com/preview.mp3"
              type="audio/mp3"
            />
          </audio>
          <audio ref={audioReminderRef} hidden>
            <source
              src="https://hmlead22.oss-cn-beijing.aliyuncs.com/reminder.mp3"
              type="audio/mp3"
            />
          </audio>
          <span
            className="navicon opreatingState"
            onClick={() => setDialogVisible(true)}
          >
            <i className="setting-icon" />
            Status Setting
          </span>
          
        </div>
        <div
          className="avatar-wrapper"
          onMouseEnter={() => setShopShow(true)}
          onMouseLeave={() => setShopShow(false)}
        >
          <div className={shopShow ? "userInfo" : ""}>
            <Button className={shopShow ? "active" : ""}>
              {user.name} <CaretUpOutlined className="arrow-down" />
            </Button>
            {shopShow ? (
              <div className="userList flex flex-col">
                <p className="change-password" onClick={handlePasswardForm}>
                  Change Password <i />
                </p>
                <p className="logout" onClick={logout}>
                  Logout <i />
                </p>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* dialog */}
        </div>

        <div className="dialog">
          <Modal
            className="modal"
            title="Business Status Setting"
            open={dialogVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Radio.Group onChange={handleRadio} value={radioValue}>
              <Radio value={1}>
                <h3>Open Mode :</h3>
                <span>
                  the restaurant is in business mode, automatically accepting
                  any orders.
                </span>
              </Radio>
              <Radio value={0}>
                <h3>Close mode :</h3>
                <span>
                  The restaurant is currently closed and only accepts pre-booked
                  orders during business hours.
                </span>
              </Radio>
            </Radio.Group>
          </Modal>
        </div>
      </div>
      <Password
        passwordFormVisible={passwordFormVisible}
        handlePasswardForm={handlePasswardForm}
      />
    </div>
  );
};

export default NavBar;
