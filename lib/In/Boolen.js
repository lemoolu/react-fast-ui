import { Radio } from 'antd';
export default function (props) {
  return React.createElement(Radio.Group, props, React.createElement(Radio, {
    value: true
  }, "\u662F"), React.createElement(Radio, {
    value: false
  }, "\u5426"));
}