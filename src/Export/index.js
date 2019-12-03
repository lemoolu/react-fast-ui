import { Button } from 'antd';
import { pathMatchQuery } from '@/utils';

export default function (props) {
  return (
    <a href={pathMatchQuery(props.url)} target="_blank">
      {props.children ? props.children :
        <Button>导出</Button>
      }
    </a>
  )
}
