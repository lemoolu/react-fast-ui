function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import Fetch from '../Fetch';
import SelectEx from '../SelectEx';
export default function (props) {
  return React.createElement(Fetch, {
    api: '/api/code/agent',
    dataProps: "options",
    defaultParams: {
      level: props.level,
      parent_id: props.parentId
    }
  }, React.createElement(SelectEx, _extends({
    keys: {
      label: 'name',
      value: 'value'
    }
  }, props)));
}