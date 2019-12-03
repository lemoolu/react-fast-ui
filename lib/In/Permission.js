function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import Fetch from '../Fetch';
import SelectEx from '../SelectEx';
export default function (props) {
  return React.createElement(Fetch, {
    api: '/api/admin/permission',
    dataProps: "options"
  }, React.createElement(SelectEx, _extends({
    keys: {
      label: 'name',
      value: 'id'
    },
    mode: "multiple"
  }, props)));
}