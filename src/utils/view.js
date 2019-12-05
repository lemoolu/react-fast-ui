/*
数据展示函数
*/

import { Avatar, Badge, Tag } from 'antd';
import { Fetch } from '@/components';
import _ from 'lodash';

const current = Date.now();

function VideoType(props) {
  return (
    <Fetch
      api="/api/video/category"
      render={list => {
        list = list || [];
        const item = list.find(x => x.id === props.value);
        return item ? item.name : ''
      }}
      cache={current}
    />
  )
}


function Roles(props) {
  return (
    <Fetch
      api="/api/admin/permission"
      render={list => {
        if (!props.value) {
          return '';
        }
        list = list || [];
        console.log(props.value)
        console.log(list)
        const item = list.filter(x => props.value.includes(x.id));
        return item ? item.map(x => x.name).join(',') : ''
      }}
      cache={current}
    />
  )
}

export default {
  asSender: v => {
    const enums = { 1: '男', 2: '女', 0: '未知' };
    return enums[v] || enums[0];
  },
  asAvailable: v => {
    if (v === true) {
      return <Tag color="green">可用</Tag>
    }
    if (v === false) {
      return <Tag color="red">禁用</Tag>
    }
    return ''
  },
  asPercent: v => {
    if (_.isNumber(v)) {
      return v * 100 + '%';
    }
    return ''
  },
  asAvatar: v => <Avatar shape="square" icon="user" src={v} />,
  asStatus: v => v === true ? <Tag color="green">是</Tag> : v === false ? <Tag color="red">否</Tag> : v,
  asFeedBackDone:
    v => v === true ? <Tag color="green">已处理</Tag>
      : v === false ?
        <Tag color="red">未处理</Tag> : v,
  asBan:
    v => v === true ? <Tag color="red">冻结</Tag>
      : v === false ?
        <Tag color="green">正常</Tag> : v,
  asShelf:
    v => v === true ? <Tag color="red">下架</Tag>
      : v === false ?
        <Tag color="green">上架</Tag> : v,
  asProvince: (t, record) => `${record.province}-${record.city}-${record.area}`,
  asAddressAll: (t, record) => `${record.province}-${record.city}-${record.area} ${record.address}`,
  asImage: v => <a href={v} target="_blank"><img src={v} style={{ maxWidth: 300, maxHeight: 100 }} /></a>,
  asVieoType: v => <VideoType value={v} />,
  asRoles: v => <Roles value={v}></Roles>,
  asPermission: v => v.join(','),
  asStoreCategory: v => {
    if (v === 0)
      return '自营门店';
    if (v === 1)
      return '招商门店';
    return v
  },
  asUserLevel: v => {
    if (v === 0)
      return '注册用户';
    if (v === 1)
      return '激活用户';
    if (v === 2)
      return 'VIP用户';
    return v
  },
  asAgent: v => {
    return v;
  },
  asShop: v => {
    return v;
  },
  asMoney: v => {
    return _.isNumber(v) ? v + '元' : '';
  },
  asDays: v => {
    return _.isNumber(v) ? v + '天' : '';
  },
  asHours: v => {
    return _.isNumber(v) ? v + '小时' : '';
  },
  asSeconds: v => {
    return _.isNumber(v) ? v + '秒' : '';
  },
}
