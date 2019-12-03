import { Button } from 'antd';
import { pathMatchQuery } from '@/utils';
export default function (props) {
  return React.createElement("a", {
    href: pathMatchQuery(props.url),
    target: "_blank"
  }, props.children ? props.children : React.createElement(Button, null, "\u5BFC\u51FA"));
}