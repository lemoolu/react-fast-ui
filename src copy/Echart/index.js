/**
 * https://github.com/hustcc/echarts-for-react
 */
import React, { PureComponent } from 'react';
import { withFetch } from './Fetch';
// import ReactEcharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import _ from 'lodash';

class Echart extends PureComponent {
  state = {
    dataSource: null
  }

  static defaultProps = {
    dataSource: null,
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.option, this.props.option) || !_.isEqual(nextProps.dataSource, this.props.dataSource)) {
      setTimeout(() => {
        this.setOption();
      });
    }
  }

  setOption = () => {
    let opt = this.getOption();
    this.echarts.getEchartsInstance().setOption(opt);
  }

  getOption = () => {
    // console.log(this.props.option);
    if (_.isFunction(this.props.option)) {
      return this.props.option(this.props.dataSource) || {}
    }
    return {}
  }

  render() {
    return (
      <ReactEchartsCore
        notMerge={true}
        lazyUpdate={true}
        {...this.props}
        echarts={window.echarts}
        option={this.getOption()}
        ref={(e) => { this.echarts = e; }}
      // onChartReady={this.onChartReadyCallback}
      // onEvents={EventsDict}
      // opts={}
      />
    )
  }
}

export default withFetch(Echart);
