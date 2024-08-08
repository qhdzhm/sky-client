import React, { useCallback, useEffect, useRef } from "react";
import * as echarts from "echarts";

const UserStatistics = (props) => {
  const chartRef = useRef(null);

  const initChart = useCallback(() => {
    const myChart = echarts.init(chartRef.current);
    const option = {
      tooltip: {
        trigger: "axis",
        backgroundColor: "#fff",
        borderRadius: 2,
        textStyle: {
          color: "#333",
          fontSize: 12,
          fontWeight: 300,
        },
      },
      grid: {
        top: "5%",
        left: "20",
        right: "50",
        bottom: "12%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          color: "#666",
          fontSize: "12px",
        },
        axisLine: {
          lineStyle: {
            color: "#E5E4E4",
            width: 1,
          },
        },
        data: props.userData.dateList,
      },
      yAxis: [
        {
          type: "value",
          min: 0,
          //max: 500,
          //interval: 100,
          axisLabel: {
            color: "#666",
            fontSize: "12px",
          },
        },
      ],
      series: [
        {
          name: "Total User",
          type: "line",
          smooth: false,
          showSymbol: false,
          symbolSize: 10,
          lineStyle: {
            color: "#FFD000",
          },
          itemStyle: {
            color: "#FFD000",
            emphasis: {
              color: "#fff",
              borderWidth: 5,
              borderColor: "#FFC100",
            },
          },
          data: props.userData.totalUserList,
        },
        {
          name: "New User",
          type: "line",
          // stack: 'Total',
          smooth: false, //否平滑曲线
          showSymbol: false, //未显示鼠标上移的圆点
          symbolSize: 10, //圆点大小
          // symbol:"circle", //设置折线点定位实心点
          itemStyle: {
            color: "#FD7F7F",
            fontWeigth: 300,
            emphasis: {
              // 圆点颜色
              color: "#fff",
              borderWidth: 5,
              borderColor: "#FD7F7F",
            },
          },
          data: props.userData.newUserList,
        },
      ],
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [props]);

  useEffect(initChart, [props, initChart]);

  return (
    <div className="user-container">
      <h2 className="homeTitle">User Statistics</h2>
      <div className="charBox">
        <div ref={chartRef} style={{ width: "100%", height: "320px" }} />
        <ul className="orderListLine user">
          <li className="one">
            <span></span>Total User
          </li>
          <li className="three">
            <span></span>New User
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserStatistics;