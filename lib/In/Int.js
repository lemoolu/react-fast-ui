function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { InputNumber } from 'antd';
export default function (props) {
  const {
    addonBefore,
    addonAfter,
    ...others
  } = props;
  return React.createElement("span", null, addonBefore, React.createElement(InputNumber, _extends({
    min: 0,
    style: {
      width: 160
    }
  }, others)), "\xA0", addonAfter);
}