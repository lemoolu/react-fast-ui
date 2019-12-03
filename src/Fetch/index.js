/**
 * 数据获取组件
 */
import React, { PureComponent } from 'react';
import _ from 'lodash';
import { request, pathMatchQuery } from '@/utils';

const acting = {}; // 用于存储缓存请求进行中

export default class Fetch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      response: null,
    };
  }

  static defaultProps = {
    api: null, // '/api/get' | { method: 'post', url: '' }
    history: null, // 请求参数
    defaultParams: null, // 默认请求参数
    dataIndex: 'data', // 响应体数据索引
    dataProps: 'dataSource', // 挂载到子节点上对应props
    onRequest: params => params, // 请求前
    onResponse: res => res, // 请求后
    render: null, // 用于处理显示
    cache: false, // 是否进行缓, 此参数将字符串化作为缓存key值，。如果传入时间戳，则表示每次刷新缓存失效
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.history && !_.isEqual(this.props.history, nextProps.history)) {
      this.getData(nextProps.history);
    }
    if (nextProps.defaultParams && !_.isEqual(this.props.defaultParams, nextProps.defaultParams)) {
      this.getData(nextProps.history);
    }
  }

  componentDidMount() {
    this.getData(this.props.history);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  getCacheKey = () => {
    const key = JSON.stringify(this.props.api || '') + JSON.stringify(this.props.cache);
    return key;
  }

  getCacheData = () => {
    let key = this.getCacheKey();
    let value = window.sessionStorage.getItem(key);
    if (!value) {
      return null;
    }
    let res = {};
    try {
      res = JSON.parse(window.sessionStorage.getItem(key) || '{}');
    } catch (err) {
      res = {};
    }
    return res;
  }

  setCacheData = (data) => {
    let key = this.getCacheKey();
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }

  getData = async (history) => {
    // 本地有缓存的情况是使用缓存
    if (this.props.cache) {
      // 数据获取中，定时轮询获取数据
      if (acting[this.getCacheKey()] === true) {
        this.interval = setInterval(() => {
          let data = this.getCacheData();
          if (data) {
            this.setState({
              response: this.props.onResponse(data) || data,
            });
            clearInterval(this.interval)
          }
        }, 100);
        return;
      }
      let data = this.getCacheData();
      if (data) {
        this.setState({
          response: this.props.onResponse(data) || data,
        });
        return;
      }
    }

    let api = this.props.api
    if (!api) {
      console.warn('Fetch:设置 api');
      return;
    }
    if (_.isArray(history) && history.length === 0) {
      return;
    }
    if (_.isString(api)) {
      api = pathMatchQuery(api);
    } else {
      api = {
        ...api,
        url: pathMatchQuery(api.url)
      }
    }
    const lastHistory = history ? history[history.length - 1] : {};
    let params = Object.assign({}, this.props.defaultParams, lastHistory);
    try {
      params = await this.props.onRequest(params) || params;
    } catch (e) {
      console.warn(e);
      return;
    }

    acting[this.getCacheKey()] = true;
    this.setState({ loading: true });
    if (Object.keys(params).length === 0) {
      params = undefined;
    }
    request(api, params).then(res => {
      const data = _.get(res, this.props.dataIndex)
      if (this.props.cache) {
        this.setCacheData(data);
      }
      this.setState({
        response: this.props.onResponse(data) || data,
        loading: false
      });
      acting[this.getCacheKey()] = false;
    }).catch(e => {
      console.error(e)
      this.setState({ loading: false });
      acting[this.getCacheKey()] = false;
    });
  }

  render() {
    if (this.props.render) {
      return this.props.render(this.state.response);
    }

    if (!this.props.children) {
      return null;
    }

    let props = {
      loading: this.state.loading,
      [this.props.dataProps]: this.state.response
    };

    if (_.isArray(this.props.children)) {
      return this.props.children.map(child => React.cloneElement(child, props));
    }

    return React.cloneElement(this.props.children, props);
  }
}


export function withFetch(WrappedComponent) {
  return class extends React.Component {
    render() {
      const { fetch, ...otherProps } = this.props;

      if (fetch) {
        return (
          <Fetch {...fetch}>
            <WrappedComponent {...otherProps} />
          </Fetch>
        )
      }
      return (
        <WrappedComponent {...otherProps} />
      )
    }
  }
}
