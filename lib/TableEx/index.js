function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Table } from 'antd';
import Fetch, { withFetch } from './Fetch';
import _ from 'lodash';
import React, { PureComponent } from 'react';

class TableEx extends PureComponent {
  render() {
    const {
      dataSource,
      dataKey,
      pageNumKey,
      totalKey,
      rowsKey,
      ...otherProps
    } = this.props;
    let source = dataSource;

    if (otherProps.pagination === false) {
      if (!_.isArray(dataSource)) {
        source = [];
      }
    }

    return React.createElement(Table, _extends({
      dataSource: otherProps.pagination === false ? source : _.get(source, 'data', []),
      pagination: {
        current: _.get(source, pageNumKey),
        pageSize: _.get(source, rowsKey),
        total: _.get(source, totalKey),
        onChange: (current, size) => {
          this.props.onPaginationChange && this.props.onPaginationChange(current, size);
        }
      }
    }, otherProps));
  }

}

_defineProperty(TableEx, "defaultProps", {
  dataSource: {},
  dataKey: 'data',
  pageNumKey: 'page_now',
  totalKey: 'records',
  rowsKey: 'page_rows'
});

export default withFetch(TableEx);