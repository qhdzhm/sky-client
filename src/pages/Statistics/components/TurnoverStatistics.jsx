import React, { useEffect, useRef, useCallback } from "react";
import * as echarts from "echarts";

const TurnoverStatistics = (props) => {
  const chartRef = useRef(null);

  const initChart = useCallback(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      // title: {
      //   text: 'Turnover (yuan)',
      //   top: 'bottom',
      //   left: 'center',
      //   textAlign: 'center',
      //   textStyle: {
      //     fontSize: 12,
      //     fontWeight: 'normal',
      //   },
      // },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: '5%',
        left: '10',
        right: '50',
        bottom: '12%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          // Axis label style directly
          color: '#666',
          fontSize: '12px',
        },
        axisLine: {
          // Directly set the style of the X-axis line
          lineStyle: {
            color: '#E5E4E4',
            width: 1, 
          },
        },
        data: props.turnoverData.dateList, 
      },
      yAxis: [
        {
          type: 'value',
          min: 0,
          //max: 50000,
          //interval: 1000,
          axisLabel: {
            // Directly set the style of the axis label
            color: '#666',
            fontSize: '12px',
            // formatter: "{value} ml", 
          }
        }
      ],
      series: [
        {
          name: 'Turnover',
          type: 'line',
          // stack: 'Total',
          smooth: false, 
          showSymbol: false, 
          symbolSize: 10,
          // symbol:"circle", 
          lineStyle: {
            color: '#FFD000',
          },
          itemStyle: {
            color: '#F29C1B',
            emphasis: {
              color: '#fff',
              borderWidth: 5,
              borderColor: '#FFC100',
            },
          },
          data:  props.turnoverData.turnoverList,
        },
      ],
    }

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [props]);

  useEffect(initChart, [props, initChart]);

  return (
    <div className="turnover-container">
      <h2 className="homeTitle">Turnover Statistics</h2>
      <div className="charBox">
        <div ref={chartRef} style={{ width: "100%", height: "320px" }} />
        <ul className="orderListLine turnover">
          <li>Turnover (AudD)</li>
        </ul>
      </div>
    </div>
  );
};

export default TurnoverStatistics;