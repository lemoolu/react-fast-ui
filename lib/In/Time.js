/**
 * 时间选择
 * 08:00 - 17:00
 */
import { TimePicker } from 'antd';
export default function (props) {
  return React.createElement(TimePicker, {
    format: 'HH:mm',
    placeholder: "\u8BF7\u9009\u62E9"
  });
}