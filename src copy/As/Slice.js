import { Popover } from 'antd';

export default function Slice(props) {
  const { value, length = 20 } = props;
  if (value.length < length) {
    return value;
  }
  return (
    <Popover content={value}>
      {value.slice(0, 20)}...
    </Popover>
  );
}
