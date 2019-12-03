import { DatePicker } from 'antd';
import React, { PureComponent } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default class DateRange extends PureComponent {
  state = {
    dateString: null
  }

  componentDidMount() {
    this.setValue(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setValue(nextProps.value);
  }

  setValue = (v) => {
    if (v && v !== this.state.dateString) {
      this.setState({ dateString: v });
    }
  }

  onChange = (date, dateString) => {
    this.setState({ dateString });
    this.props.onChange && this.props.onChange(dateString);
  }

  render() {
    const value = this.state.dateString ? moment(this.state.dateString) : null

    return (
      <DatePicker format={'YYYY-MM-DD HH:mm:ss'} showTime {...this.props} value={value} onChange={this.onChange}  />
    )
  }
}
