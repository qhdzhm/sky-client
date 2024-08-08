import React, { useEffect, useRef, useCallback } from "react";
import * as echarts from "echarts";
const Top10 = (props) => {
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
        top: "-10px",
        left: "0",
        right: "0",
        bottom: "0",
        containLabel: true,
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
        },
        type: "category",
        axisLabel: {
          color: "#666",
          fontSize: "12px",
        },
        data: props.top10Data.nameList,
      },
      series: [
        {
          data: props.top10Data.numberList,
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "#F3F4F7",
          },
          barWidth: 20,
          barGap: "80%",
          barCategoryGap: "80%",
          lineStyle: {
            color: new echarts.graphic.LinearGradient(
              1,
              0,
              0,
              0,
              [
                { offset: 0, color: "#FFBD00" },
                { offset: 1, color: "#FFD000" },
              ]
            ),
          },
          itemStyle: {
            color: "#FFBD00",
            emphasis: {
              barBorderRadius: 30,
            },
            label: {
              // Content style
              show: true,
              formatter: "{@score}",
              color: "#333",
              position: ["8", "5"],
            },
          },
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
    <div className="top10-container">
      <h2 className="homeTitle">Top 10 Dishes</h2>
      <div className="charBox">
        <div ref={chartRef} style={{ width: "80%", height: "380px" }} />
      </div>
    </div>
  );
};

export default Top10;