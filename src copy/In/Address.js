import React, { PureComponent } from 'react';
import { Row, Col, Input } from 'antd';
import SelectEx from '../SelectEx';
import Map from './Map';
import { request } from '@/utils';
import _ from 'lodash';

export default class InputAddress extends PureComponent {
  state = {
    provinceList: [],
    cityList: [],
    areaList: [],
    sel: {
      province: undefined,
      city: undefined,
      area: undefined,
      address: ''
    }
  }
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const province = this.state.sel.province;
    const city = this.state.sel.city;
    request('/api/code/address', { province, city }).then(res => {
      if (!province) {
        this.setState({ provinceList: res.data, cityList: [], areaList: [] });
        return;
      }
      if (province && !city) {
        this.setState({ cityList: res.data, areaList: [] });
        return;
      }
      if (province && city) {
        this.setState({ areaList: res.data });
        return;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ sel: nextProps.value || {} });
    if (!this.state.address) {
      this.setState({ address: _.get(nextProps, 'value.address') })
    }
  }

  onChange = (type, v, isGetData = true, isOnChange = true) => {
    let sel = this.state.sel;
    sel[type] = v;
    if (type === 'province') {
      sel.city = undefined;
      sel.area = undefined;
    }
    if (type === 'city') {
      sel.area = undefined;
    }
    this.setState({ sel }, () => {
      isGetData && this.getData();
    });
    if (isOnChange) {
      this.props.onChange && this.props.onChange(sel);
    }
  }

  onInput = (type, v, isGetData = true, isOnChange = true) => {
    let sel = this.state.sel;
    sel[type] = v;
    console.log(v)
    this.setState({ address: v });
    this.props.onChange && this.props.onChange({ ...this.state.sel, address: v });
  }

  render() {
    let sel = this.state.sel;

    return (
      <Row gutter={16}>
        <Col span={8}>
          <SelectEx
            options={this.state.provinceList}
            style={{ width: '100%' }}
            onChange={v => this.onChange('province', v)}
            value={sel.province}
            keys={{ label: 'name', value: 'value' }}
            render={r => _.get(r, 'name')}
            placeholder="省"
          ></SelectEx>
        </Col>
        <Col span={8}>
          <SelectEx
            options={this.state.cityList}
            style={{ width: '100%' }}
            onChange={v => this.onChange('city', v)}
            value={sel.city}
            keys={{ label: 'name', value: 'value' }}
            render={r => _.get(r, 'name')}
            placeholder="市"
          ></SelectEx>
        </Col>
        <Col span={8}>
          <SelectEx
            options={this.state.areaList}
            style={{ width: '100%' }}
            onChange={v => this.onChange('area', v)}
            value={sel.area}
            keys={{ label: 'name', value: 'value' }}
            render={r => _.get(r, 'name')}
            placeholder="区"
          ></SelectEx>
        </Col>
        <Col span={24}>
          <Input value={this.state.address} onChange={e => this.onInput('address', e.target.value)}></Input>
        </Col>
        <Col span={24}>
          <Map
            search={`${this.state.sel.province || ''}${this.state.sel.city || ''}${this.state.sel.area || ''}${this.state.sel.address || ''}`}
            onChange={({ lng, lat }) => {
              this.onChange('lng', lng, false, false)
              this.onChange('lat', lat, false, true)
            }}
          ></Map>
        </Col>
      </Row>
    )
  }
}
