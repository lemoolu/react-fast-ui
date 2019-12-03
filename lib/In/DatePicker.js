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

    _defineProperty(this, "state", {
      dateString: null
    });

    _defineProperty(this, "setValue", v => {
      if (v && v !== this.state.dateString) {
        this.setState({
          dateString: v
        });
      }
    });

    _defineProperty(this, "onChange", (date, dateString) => {
      this.setState({
        dateString
      });
      this.props.onChange && this.props.onChange(dateString);
    });
  }

  componentDidMount() {
    this.setValue(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setValue(nextProps.value);
  }

  render() {
    const value = this.state.dateString ? moment(this.state.dateString) : null;
    return React.createElement(DatePicker, _extends({
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true
    }, this.props, {
      value: value,
      onChange: this.onChange
    }));
  }

}