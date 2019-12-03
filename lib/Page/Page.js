import { Card, Button, Icon } from 'antd';
export default function (props) {
  let classNames = ["animate-show-left"];

  if (props.className) {
    classNames = [...classNames, ...props.className.split(' ')];
  }

  let backBtn;

  if (props.showBack === true) {
    backBtn = React.createElement(Button, {
      onClick: () => window.history.back()
    }, "\u8FD4\u56DE");
  }

  return React.createElement(Card, {
    title: React.createElement("span", null, props.title),
    extra: React.createElement("span", null, backBtn, props.extra),
    style: {
      border: 'none',
      ...props.style
    },
    className: classNames.join(' ')
  }, props.children);
}