function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * https://github.com/hustcc/echarts-for-react
 */
import React, { PureComponent } from 'react';
import { withFetch } from './Fetch'; // import ReactEcharts from 'echarts-for-react';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import _ from 'lodash';

class Echart extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      dataSource: null
    });

    _defineProperty(this, "setOption", () => {
      let opt = this.getOption();
      this.echarts.getEchartsInstance().setOption(opt);
    });

    _defineProperty(this, "getOption", () => {
      // console.log(this.props.option);
      if (_.isFunction(this.props.option)) {
        return this.props.option(this.props.dataSource) || {};
      }

      return {};
    });
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.option, this.props.option) || !_.isEqual(nextProps.dataSource, this.props.dataSource)) {
      setTimeout(() => {
        this.setOption();
      });
    }
  }

  render() {
    return React.createElement(ReactEchartsCore, _extends({
      notMerge: true,
      lazyUpdate: true
    }, this.props, {
      echarts: window.echarts,
      option: this.getOption(),
      ref: e => {
        this.echarts = e;
      } // onChartReady={this.onChartReadyCallback}
      // onEvents={EventsDict}
      // opts={}

    }));
  }

}

_defineProperty(Echart, "defaultProps", {
  dataSource: null
});

export default withFetch(Echart);