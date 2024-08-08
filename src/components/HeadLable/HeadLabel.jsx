import React from "react";
import back from "@/assets/icons/btn_back@2x.png";
import './HeadLabel.scss'
import { useNavigate } from "react-router-dom";
const HeadLabel = ({ title, btnList, goback }) => {
  const navigate = useNavigate()
  const gobackNav = () => {navigate(-1)};
  return (
    <>
      {title && (
        <div className="head-label flex">
          <span onClick={gobackNav} className="goback">
            <img src={back} alt="" />
            Back
          </span>
          
          <span className="title">{title}</span>
        </div>
      )}
    </>
  );
};

export default HeadLabel;
