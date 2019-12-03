import { Select } from 'antd';
export default function (props) {
  return React.createElement(Select, props, React.createElement(Select.Option, {
    value: 1
  }, "\u7537"), React.createElement(Select.Option, {
    value: 2
  }, "\u5973"), React.createElement(Select.Option, {
    value: 0
  }, "\u672A\u77E5"));
}