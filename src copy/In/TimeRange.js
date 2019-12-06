/**
 * 时间选择
 * 08:00 - 17:00
 */
import { TimePicker } from 'antd';
import React, { PureComponent } from 'react';
import moment from 'moment';

export default class TimeRange extends PureComponent {
  state = {
    start: '',
    end: '',
  }

  componentDidMount() {
    this.setRange(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setRange(nextProps.value);
  }

  setRange = (value) => {
    if (value) {
      const start = value.split('-')[0];
      const end = value.split('-')[1];
      this.setState({ start, end });
    }
  }

  onChange = (type, time, timeString) => {
    // console.log(timeString)
    this.setState({ [type]: timeString }, () => {
      if (this.state.start && this.state.end) {
        this.props.onChange && this.props.onChange(this.state.start + '-' + this.state.end)
      }
    });
  }

  render() {
    const start = this.state.start ? moment(this.state.start, 'HH:mm') : undefined;
    const end = this.state.end ? moment(this.state.end, 'HH:mm') : undefined;

    return (
      <div>
        <TimePicker format={'HH:mm'} placeholder="请选择" value={start} onChange={(...arg) => this.onChange('start', ...arg)} />
        -
        <TimePicker format={'HH:mm'} placeholder="请选择" value={end} onChange={(...arg) => this.onChange('end', ...arg)} />
      </div>
    )
  }
}
