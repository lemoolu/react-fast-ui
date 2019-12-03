import { InputNumber } from 'antd';

export default function (props) {
  const { addonBefore, addonAfter, ...others } = props;
  return (
    <span>
      {addonBefore}
      <InputNumber min={0} style={{width: 160}} {...others} />
      &nbsp;
      {addonAfter}
    </span>
  )
}
