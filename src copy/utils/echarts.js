import _ from 'lodash';
import china from './china.json';

const COLOR_MAP = ['#3EA1FF', '#4ECB75', '#3DCBCA', '#FBD442', '#D87A80'];
const COLOR_LABEL = '#888888';
const COLOR_AXIOS = '#D1D1D1';

const OPTIONS_LINE = {
  color: COLOR_MAP,
  tooltip: {
    trigger: 'axis',
    // axisPointer: {
    //   type: 'cross',
    //   label: {
    //     backgroundColor: '#6a7985'
    //   }
    // }
  },
  xAxis: {
    type: 'category',
    axisLine: { lineStyle: { color: COLOR_AXIOS } },
    axisLabel: { color: COLOR_LABEL }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false, },
    axisLabel: { color: COLOR_LABEL }
  }
};

export function line(data = []) {
  if (!_.isArray(data)) {
    console.log('data must array', data);
    // return {};
    data = [];
  }
  // data = [
  //   { "name": "2019-10-01", "value": Math.random() * 10 + 10 },
  //   { "name": "2019-10-02", "value": Math.random() * 10 + 10 },
  //   { "name": "2019-10-03", "value": Math.random() * 10 + 10 }
  // ];
  return _.merge({}, OPTIONS_LINE, {
    xAxis: {
      data: data.map(x => x.name),
    },
    series: [{
      data: data.map(x => x.value),
      type: 'line'
    }]
  });
}

window.echarts.registerMap('china', china);

export function map(data = []) {
  if (!_.isArray(data)) {
    console.log('data must array', data);
    // return {};
    data = [];
  }
  // data = [
  //   { value: Math.random() * 100, name: '浙江' },
  //   { value: Math.random() * 100, name: '广东' },
  // ];
  return {
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function (params) {
        let value = params.value;
        return params.name ? params.name + ': ' + value : null;
      }
    },
    visualMap: {
      left: 'right',
      // min: 500000,
      // max: 38000000,
      inRange: {
        color: ['#E8F7FF', '#0051B4']
      },
      // text:['High','Low'],           // 文本，默认为数值文本
      calculable: true
    },
    // visualMap: {},
    series: [{
      type: 'map',
      map: 'china',
      data: data,
      itemStyle: {
        color: 'red'
      },
      emphasis: {
        itemStyle: {
          areaColor: '#E8F7FF',
        },
      }
    }]
  };
}

export function lineArea(data) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '直接访问',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        areaStyle: { normal: {} },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
}

export function pie(data) {
  if (!_.isArray(data)) {
    console.log('data must array', data);
    // return {};
    data = [];
  }
  return {
    color: COLOR_MAP,
    tooltip: {
      show: data.length > 0,
      trigger: 'item',
      formatter: "{b}: {c} ({d}%)"
    },
    legend: {
      show: data.length > 0,
      orient: 'vertical',
      x: 'left',
      data: data.map(x => x.name)
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: data.length > 0 ? data : [{name: '无数据', value: 0}]
      }
    ]
  };
}

export function bar(data) {
  return {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ['product', '2015', '2016', '2017'],
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      { type: 'bar' },
      { type: 'bar' },
      { type: 'bar' }
    ]
  };

}
