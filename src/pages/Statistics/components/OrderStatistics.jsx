import React, { useEffect, useRef, useCallback } from "react";
import * as echarts from "echarts";

export const OrderStatistics = (props) => {
  const chartRef = useRef(null);

  const initChart = useCallback(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        borderRadius: 2,
        textStyle: {
          color: '#333',
          fontSize: 12,
          fontWeight: 300,
        },
      },
      grid: {
        top: '5%',
        left: '20',
        right: '50',
        bottom: '12%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          color: '#666',
          fontSize: '12px',
        },
        axisLine: {
          lineStyle: {
            color: '#E5E4E4',
            width: 1,
          },
        },
        data: props.orderData.dateList,
      },
      yAxis: [
        {
          type: 'value',
          min: 0,
          //max: 500,
          interval: 50,
          axisLabel: {
            color: '#666',
            fontSize: '12px',
          },
        },
      ],
      series: [
        {
          name: 'Total Orders',
          type: 'line',
          smooth: false,
          showSymbol: false,
          symbolSize: 10,
          lineStyle: {
            color: '#FFD000',
          },
          itemStyle: {
            color: '#FFD000',
            emphasis: {
              color: '#fff',
              borderWidth: 5,
              borderColor: '#FFC100',
            },
          },
          data: props.orderData.orderCountList,
        },
        {
          name: 'Valid Orders',
          type: 'line',
          smooth: false,
          showSymbol: false,
          symbolSize: 10,
          lineStyle: {
            color: '#FD7F7F',
          },
          itemStyle: {
            color: '#FD7F7F',
            emphasis: {
              color: '#fff',
              borderWidth: 5,
              borderColor: '#FD7F7F',
            },
          },
          data: props.orderData.validOrderCountList,
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
    <div className="order-container">
      <h2 className="homeTitle">Order Statistics</h2>
      <div className="charBox">
        <div className="orderProportion">
          <div>
            <p>Completion Rate</p>
            <p>{(props.orderData.orderCompletionRate * 100).toFixed(1)}%</p>
          </div>
          <div className="symbol">=</div>
          <div>
            <p>Valid Order Count</p>
            <p>{props.orderData.validOrderCount}</p>
          </div>
          <div className="symbol">/</div>
          <div>
            <p>Total Order Count</p>
            <p>{props.orderData.totalOrderCount}</p>
          </div>
        </div>
        <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
        <ul className="orderListLine">
          <li className="one"><span></span>Total Order Count</li>
          <li className="three"><span></span>Valid Order Count</li>
        </ul>
      </div>
    </div>
  );
};