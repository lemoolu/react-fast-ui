import { DatePicker } from 'antd';
import React, { PureComponent } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default class DateRange extends PureComponent {
  state = {
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  onChange = (v, strs) => {
    this.props.onChange && this.props.onChange(strs);
  }


  render() {
    let value = undefined;
    if (this.props.value) {
      value = [moment(this.props.value[0]), moment(this.props.value[1])]
    }

    return (
      <RangePicker
        ranges={{
          '今天': [moment().startOf('day'), moment().endOf('day')],
          '本周': [moment().startOf('week'), moment().endOf('week')],
          '本月': [moment().startOf('month'), moment().endOf('month')],
        }}
        format={'YYYY-MM-DD HH:mm'}
        {...this.props}
        value={value}
        onChange={(v, strs) => this.onChange(v, strs)}
      />
    )
  }
}
