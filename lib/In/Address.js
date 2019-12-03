function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import { Row, Col, Input } from 'antd';
import SelectEx from '../SelectEx';
import Map from './Map';
import { request } from '@/utils';
import _ from 'lodash';
export default class InputAddress extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      provinceList: [],
      cityList: [],
      areaList: [],
      sel: {
        province: undefined,
        city: undefined,
        area: undefined,
        address: ''
      }
    });

    _defineProperty(this, "getData", () => {
      const province = this.state.sel.province;
      const city = this.state.sel.city;
      request('/api/code/address', {
        province,
        city
      }).then(res => {
        if (!province) {
          this.setState({
            provinceList: res.data,
            cityList: [],
            areaList: []
          });
          return;
        }

        if (province && !city) {
          this.setState({
            cityList: res.data,
            areaList: []
          });
          return;
        }

        if (province && city) {
          this.setState({
            areaList: res.data
          });
          return;
        }
      });
    });

    _defineProperty(this, "onChange", (type, v, isGetData = true, isOnChange = true) => {
      let sel = this.state.sel;
      sel[type] = v;

      if (type === 'province') {
        sel.city = undefined;
        sel.area = undefined;
      }

      if (type === 'city') {
        sel.area = undefined;
      }

      this.setState({
        sel
      }, () => {
        isGetData && this.getData();
      });

      if (isOnChange) {
        this.props.onChange && this.props.onChange(sel);
      }
    });

    _defineProperty(this, "onInput", (type, v, isGetData = true, isOnChange = true) => {
      let sel = this.state.sel;
      sel[type] = v;
      console.log(v);
      this.setState({
        address: v
      });
      this.props.onChange && this.props.onChange({ ...this.state.sel,
        address: v
      });
    });
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sel: nextProps.value || {}
    });

    if (!this.state.address) {
      this.setState({
        address: _.get(nextProps, 'value.address')
      });
    }
  }

  render() {
    let sel = this.state.sel;
    return React.createElement(Row, {
      gutter: 16
    }, React.createElement(Col, {
      span: 8
    }, React.createElement(SelectEx, {
      options: this.state.provinceList,
      style: {
        width: '100%'
      },
      onChange: v => this.onChange('province', v),
      value: sel.province,
      keys: {
        label: 'name',
        value: 'value'
      },
      render: r => _.get(r, 'name'),
      placeholder: "\u7701"
    })), React.createElement(Col, {
      span: 8
    }, React.createElement(SelectEx, {
      options: this.state.cityList,
      style: {
        width: '100%'
      },
      onChange: v => this.onChange('city', v),
      value: sel.city,
      keys: {
        label: 'name',
        value: 'value'
      },
      render: r => _.get(r, 'name'),
      placeholder: "\u5E02"
    })), React.createElement(Col, {
      span: 8
    }, React.createElement(SelectEx, {
      options: this.state.areaList,
      style: {
        width: '100%'
      },
      onChange: v => this.onChange('area', v),
      value: sel.area,
      keys: {
        label: 'name',
        value: 'value'
      },
      render: r => _.get(r, 'name'),
      placeholder: "\u533A"
    })), React.createElement(Col, {
      span: 24
    }, React.createElement(Input, {
      value: this.state.address,
      onChange: e => this.onInput('address', e.target.value)
    })), React.createElement(Col, {
      span: 24
    }, React.createElement(Map, {
      search: `${this.state.sel.province || ''}${this.state.sel.city || ''}${this.state.sel.area || ''}${this.state.sel.address || ''}`,
      onChange: ({
        lng,
        lat
      }) => {
        this.onChange('lng', lng, false, false);
        this.onChange('lat', lat, false, true);
      }
    })));
  }

}