import { Card, Button, Icon } from 'antd';

export default function (props) {
  let classNames = ["animate-show-left"];
  if (props.className) {
    classNames = [...classNames, ...props.className.split(' ')];
  }
  let backBtn;
  if(props.showBack === true) {
    backBtn = <Button onClick={() => window.history.back()}>返回</Button>;
  }

  return (
    <Card
      title={<span>{props.title}</span>}
      extra={
        <span>
          {backBtn}
          {props.extra}
        </span>
      }
      style={{ border: 'none', ...props.style }}
      className={classNames.join(' ')}
    >
      {props.children}
    </Card>
  )
}
