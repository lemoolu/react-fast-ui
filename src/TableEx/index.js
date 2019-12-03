import { Table } from 'antd';
import Fetch, { withFetch } from './Fetch';
import _ from 'lodash';
import React, { PureComponent } from 'react';

class TableEx extends PureComponent {
  static defaultProps = {
    dataSource: {},
    dataKey: 'data',
    pageNumKey: 'page_now',
    totalKey: 'records',
    rowsKey: 'page_rows',
  }

  render() {
    const {
      dataSource,
      dataKey,
      pageNumKey,
      totalKey,
      rowsKey,
      ...otherProps
    } = this.props;
    let source = dataSource
    if (otherProps.pagination === false) {
      if (!_.isArray(dataSource)) {
        source = [];
      }
    }
    return (
      <Table
        dataSource={otherProps.pagination === false ? source : _.get(source, 'data', [])}
        pagination={{
          current: _.get(source, pageNumKey),
          pageSize: _.get(source, rowsKey),
          total: _.get(source, totalKey),
          onChange: (current, size) => { this.props.onPaginationChange && this.props.onPaginationChange(current, size) }
        }}
        {...otherProps}>
      </Table>
    )
  }
}


export default withFetch(TableEx);
