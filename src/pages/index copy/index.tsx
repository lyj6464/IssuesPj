import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import * as echarts from "../components/ec-canvas/echarts";
export default class Index extends Component {
  constructor(props) {
    super(props);
    let _this = this;
    this.state = {
      loading: true,
      tabIndex: 0,
      ecBar: {
        onInit: function (canvas, width, height, dpr) {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          canvas.setChart(barChart);

          _this.lineChart = barChart;
          barChart.setOption({});
          return barChart;
        }
      },
      a:{
        clickFn:function () {
          let a = '我爱你'
          return a
        }
      }
    }
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <ec-canvas  ec={this.state.ecBar} a={this.state.a} ></ec-canvas>
      </View>
    )
  }
}
