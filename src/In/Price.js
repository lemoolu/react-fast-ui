import { InputNumber } from 'antd';

export default function (props) {
  return (
    <span>
      <InputNumber placeholder="请输入" min={0} style={{width: 160}} {...props} /> 元
    </span>
  )
}
