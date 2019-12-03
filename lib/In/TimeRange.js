function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 时间选择
 * 08:00 - 17:00
 */
import { TimePicker } from 'antd';
import React, { PureComponent } from 'react';
import moment from 'moment';
export default class TimeRange extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      start: '',
      end: ''
    });

    _defineProperty(this, "setRange", value => {
      if (value) {
        const start = value.split('-')[0];
        const end = value.split('-')[1];
        this.setState({
          start,
          end
        });
      }
    });

    _defineProperty(this, "onChange", (type, time, timeString) => {
      // console.log(timeString)
      this.setState({
        [type]: timeString
      }, () => {
        if (this.state.start && this.state.end) {
          this.props.onChange && this.props.onChange(this.state.start + '-' + this.state.end);
        }
      });
    });
  }

  componentDidMount() {
    this.setRange(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setRange(nextProps.value);
  }

  render() {
    const start = this.state.start ? moment(this.state.start, 'HH:mm') : undefined;
    const end = this.state.end ? moment(this.state.end, 'HH:mm') : undefined;
    return React.createElement("div", null, React.createElement(TimePicker, {
      format: 'HH:mm',
      placeholder: "\u8BF7\u9009\u62E9",
      value: start,
      onChange: (...arg) => this.onChange('start', ...arg)
    }), "-", React.createElement(TimePicker, {
      format: 'HH:mm',
      placeholder: "\u8BF7\u9009\u62E9",
      value: end,
      onChange: (...arg) => this.onChange('end', ...arg)
    }));
  }

}