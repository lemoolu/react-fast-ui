function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { DatePicker } from 'antd';
import moment from 'moment';
export default function (props) {
  function onChange(date, dateString) {
    console.log(date, dateString);
    props.onChange && props.onChange(dateString);
  }

  return React.createElement(DatePicker, _extends({
    placeholder: "\u8BF7\u9009\u62E9"
  }, props, {
    value: props.value ? moment(props.value) : null,
    onChange: onChange
  }));
}