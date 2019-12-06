import { Select } from 'antd';

export default function (props) {
  return (
    <Select
      {...props}
    >
      <Select.Option value={1}>男</Select.Option>
      <Select.Option value={2}>女</Select.Option>
      <Select.Option value={0}>未知</Select.Option>
    </Select>
  )
}
