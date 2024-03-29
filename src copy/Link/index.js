import Link from 'umi/link';
import { Button } from 'antd';
import { pathMatchQuery } from '@/utils';

export default function (props) {
  return <Link to={pathMatchQuery(props.to)} style={props.style}>{props.children}</Link>
}
