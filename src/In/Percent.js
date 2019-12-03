/**
 * 百分比输入框 0-1
 */
import React from 'react';
import { InputNumber } from 'antd';
import np from 'number-precision';

export default class InputPrecent extends React.Component {

  static defaultProps = {
    min: 0,
    max: 100,
    formatter: value => `${value}%`,
    parser: value => value.replace('%', ''),
    precision: 2,
    style: { width: 200 }
  };

  state = {
    value: '',
    propsValue: '',
  }

  componentDidMount() {
    this.checkValue();
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.checkValue();
    });
  }

  checkValue = () => {
    if (this.props.value !== '' && this.props.value !== null && this.props.value !== undefined && this.props.value !== this.state.propsValue) {
      this.setState({ value: np.times(this.props.value, 100), propsValue: this.props.value });
    }
  }

  onChange = (v) => {
    if (v === '' || v === undefined || v === null) {
      this.setState({ value: v, propsValue: v });
      this.props.onChange(v);
      return;
    }
    this.setState({ value: v, propsValue: np.divide(v, 100) });
    this.props.onChange(np.divide(v, 100));
  }

  render() {
    const { onChange, value, ...otherProps } = this.props;
    return (
      <InputNumber {...otherProps} value={this.state.value} onChange={this.onChange} />
    );
  }
}
