import { Radio } from 'antd';

export default function (props) {
  return <Radio.Group {...props}>
    <Radio value={true}>是</Radio>
    <Radio value={false}>否</Radio>
  </Radio.Group>
}
