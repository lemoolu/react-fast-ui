function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 百分比输入框 0-1
 */
import React from 'react';
import { InputNumber } from 'antd';
import np from 'number-precision';
export default class InputPrecent extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      value: '',
      propsValue: ''
    });

    _defineProperty(this, "checkValue", () => {
      if (this.props.value !== '' && this.props.value !== null && this.props.value !== undefined && this.props.value !== this.state.propsValue) {
        this.setState({
          value: np.times(this.props.value, 100),
          propsValue: this.props.value
        });
      }
    });

    _defineProperty(this, "onChange", v => {
      if (v === '' || v === undefined || v === null) {
        this.setState({
          value: v,
          propsValue: v
        });
        this.props.onChange(v);
        return;
      }

      this.setState({
        value: v,
        propsValue: np.divide(v, 100)
      });
      this.props.onChange(np.divide(v, 100));
    });
  }

  componentDidMount() {
    this.checkValue();
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.checkValue();
    });
  }

  render() {
    const {
      onChange,
      value,
      ...otherProps
    } = this.props;
    return React.createElement(InputNumber, _extends({}, otherProps, {
      value: this.state.value,
      onChange: this.onChange
    }));
  }

}

_defineProperty(InputPrecent, "defaultProps", {
  min: 0,
  max: 100,
  formatter: value => `${value}%`,
  parser: value => value.replace('%', ''),
  precision: 2,
  style: {
    width: 200
  }
});