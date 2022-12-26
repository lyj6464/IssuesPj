import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components';
import uCharts from '../u-charts';
import './index.scss';
var uChartsInstance = {};
export default class Index extends Component { 
  constructor(){
    super(...arguments)    
    this.state = {
      cWidth: 750,
      cHeight: 500,
      pixelRatio: 1,
    }
  }

  componentDidMount(){
    const sysInfo = Taro.getSystemInfoSync();
    const pixelRatio = sysInfo.pixelRatio;
    //这里的第一个 750 对应 css .charts 的 width
    const cWidth = 750 / 750 * sysInfo.windowWidth;
    //这里的 500 对应 css .charts 的 height
    const cHeight = 500 / 750 * sysInfo.windowWidth;
    this.setState({cWidth, cHeight, pixelRatio},()=>this.getServerData());
  }

  getServerData = ()=>{
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
            categories: ["2016","2017","2018","2019","2020","2021"],
            series: [
              {
                name: "成交量A",
                data: [35,8,25,37,4,20]
              },
              {
                name: "成交量B",
                data: [70,40,65,100,44,68]
              },
              {
                name: "成交量C",
                data: [100,80,95,150,112,132]
              }
            ]
          };
      this.drawCharts('WiIrjQhHXSEwJbKzYvVpBHOnuccJDBAF', res);
    }, 500);
  }

  drawCharts = (id, data)=>{
    const { cWidth, cHeight, pixelRatio } = this.state;
    const query = Taro.createSelectorQuery();
    query.select('#' + id).fields({ node: true, size: true }).exec(res => {
      if (res[0]) {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        canvas.width = res[0].width * pixelRatio;
        canvas.height = res[0].height * pixelRatio;
        uChartsInstance[id] = new uCharts({
          type: "line",
          context: ctx,
          width: cWidth * pixelRatio,
          height: cHeight * pixelRatio,
          categories: data.categories,
          series: data.series,
          pixelRatio: pixelRatio,
          animation: true,
          timing: "easeOut",
          duration: 1000,
          rotate: false,
          rotateLock: false,
          background: "#FFFFFF",
          color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
          padding: [15,10,0,15],
          fontSize: 13,
          fontColor: "#666666",
          dataLabel: true,
          dataPointShape: true,
          dataPointShapeType: "solid",
          touchMoveLimit: 60,
          enableScroll: false,
          enableMarkLine: false,
          legend: {
            show: true,
            position: "bottom",
            float: "center",
            padding: 5,
            margin: 5,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            fontSize: 13,
            fontColor: "#666666",
            lineHeight: 11,
            hiddenColor: "#CECECE",
            itemGap: 10
          },
          xAxis: {
            disableGrid: true,
            disabled: false,
            axisLine: true,
            axisLineColor: "#CCCCCC",
            calibration: false,
            fontColor: "#666666",
            fontSize: 13,
            rotateLabel: false,
            rotateAngle: 45,
            itemCount: 5,
            boundaryGap: "center",
            splitNumber: 5,
            gridColor: "#CCCCCC",
            gridType: "solid",
            dashLength: 4,
            gridEval: 1,
            scrollShow: false,
            scrollAlign: "left",
            scrollColor: "#A6A6A6",
            scrollBackgroundColor: "#EFEBEF",
            formatter: ""
          },
          yAxis: {
            gridType: "dash",
            dashLength: 2,
            disabled: false,
            disableGrid: false,
            splitNumber: 5,
            gridColor: "#CCCCCC",
            padding: 10,
            showTitle: false,
            data: []
          },
          extra: {
            line: {
              type: "straight",
              width: 2,
              activeType: "hollow"
            },
            tooltip: {
              showBox: true,
              showArrow: true,
              showCategory: false,
              borderWidth: 0,
              borderRadius: 0,
              borderColor: "#000000",
              borderOpacity: 0.7,
              bgColor: "#000000",
              bgOpacity: 0.7,
              gridType: "solid",
              dashLength: 4,
              gridColor: "#CCCCCC",
              fontColor: "#FFFFFF",
              splitLine: true,
              horizentalLine: false,
              xAxisLabel: false,
              yAxisLabel: false,
              labelBgColor: "#FFFFFF",
              labelBgOpacity: 0.7,
              labelFontColor: "#666666"
            },
            markLine: {
              type: "solid",
              dashLength: 4,
              data: []
            }
          }
        });
      }else{
        console.error("[uCharts]: 未获取到 context");
      }
    });
  }

  tap = (e)=>{
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
  }

  render () {
    const { cWidth, cHeight } = this.state;
    const canvasProps = { style: { width: cWidth, height: cHeight } };
    return (
      <View>
        <Canvas
          {...canvasProps}
          canvas-id="WiIrjQhHXSEwJbKzYvVpBHOnuccJDBAF"
          id="WiIrjQhHXSEwJbKzYvVpBHOnuccJDBAF"
          type="2d"
          className="charts"
          onTouchEnd={this.tap}/>
      </View>
    )
  }
}
