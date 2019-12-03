function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { DatePicker } from 'antd';
import React, { PureComponent } from 'react';
import moment from 'moment';
const {
  RangePicker
} = DatePicker;
export default class DateRange extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "onChange", (v, strs) => {
      this.props.onChange && this.props.onChange(strs);
    });
  }

  componentDidMount() {}

  componentWillReceiveProps() {}

  render() {
    let value = undefined;

    if (this.props.value) {
      value = [moment(this.props.value[0]), moment(this.props.value[1])];
    }

    return React.createElement(RangePicker, _extends({
      ranges: {
        '今天': [moment().startOf('day'), moment().endOf('day')],
        '本周': [moment().startOf('week'), moment().endOf('week')],
        '本月': [moment().startOf('month'), moment().endOf('month')]
      },
      format: 'YYYY-MM-DD HH:mm'
    }, this.props, {
      value: value,
      onChange: (v, strs) => this.onChange(v, strs)
    }));
  }

}