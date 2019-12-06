/**
 * 时间选择
 * 08:00 - 17:00
 */
import { TimePicker } from 'antd';

export default function (props) {
  return (
    <TimePicker format={'HH:mm'} placeholder="请选择" />
  )
}
