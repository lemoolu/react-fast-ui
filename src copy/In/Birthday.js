import { DatePicker } from 'antd';
import moment from 'moment';

export default function (props) {
  function onChange(date, dateString) {
    console.log(date, dateString);
    props.onChange && props.onChange(dateString);
  }

  return (
    <DatePicker placeholder="请选择" {...props} value={props.value ? moment(props.value) : null} onChange={onChange} />
  )
}
