function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { Select, Icon } from 'antd';
import { request } from '@/utils';
import _ from 'lodash';
import PropTypes from 'prop-types';
const {
  Option
} = Select;
const DEF_KEYS = {
  options: 'data',
  search: 'search',
  searchAsId: null,
  // 根据用户输入的是否为id进行不同的参数请求
  label: 'label',
  value: 'value'
}; // 当this.props.api存在时，select默认props

const DEF_WITH_API_PROPS = {
  showSearch: true,
  filterOption: false
};

class _Select extends React.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "genSelItem", value => {
      if (!value || _.isArray(value) && value.length === 0) {
        this.setState({
          selItems: []
        });

        if (this.currentValue !== value) {
          this.onChange(value);
        }

        return;
      }

      let ids = _.isArray(value) ? value : [value];
      let selItems = this.state.selItems;
      const valueKey = this.state.keys.value; // 移除取消选中的item

      selItems = selItems.filter(x => ids.includes(_.get(x, valueKey))); // console.log('selItems', selItems);
      // 获取已存在item的id列表

      let inItemsId = selItems.map(x => x[valueKey]); // 筛选出不在item列表中的id

      let notInItemIds = ids.filter(x => !inItemsId.includes(x));
      let optionsIds = this.state.options.map(x => x[valueKey]); // 筛选出不在当前options列表中的id

      notInItemIds = notInItemIds.filter(x => !optionsIds.includes(x)); // console.log('inItemsId', inItemsId);
      // console.log('notInItemIds', notInItemIds);

      if (this.props.isStringifySearch && _.isArray(value)) {
        notInItemIds = [notInItemIds.join(',')];
      }

      const reqs = notInItemIds.map(x => this.setOptions(x, false));
      Promise.all(reqs).then(res => {
        const options = selItems.concat(...res); // console.log('selItems', options)
        // 触发外部onChange事件，传递选中item给外部处理

        this.setState({
          selItems: options
        }, () => {
          if (this.currentValue !== value) {
            this.onChange(value);
          }
        });
      });
    });

    _defineProperty(this, "genRequestOptions", searchValue => {
      const KEYS = this.state.keys;
      let opt = {
        method: 'GET'
      };

      if (_.isObject(this.props.api)) {
        opt = { ...opt,
          ...this.props.api
        };
      } else if (_.isString(this.props.api)) {
        opt = { ...opt,
          url: this.props.api
        };
      }

      const params = { ...(opt.params || {})
      };

      if (KEYS.searchAsId && /^[0-9,]+$/.test(searchValue)) {
        params[KEYS.searchAsId] = searchValue;
      } else {
        params[KEYS.search] = searchValue;
      }

      if (opt.method === 'POST' || opt.method === 'PUT' || opt.method === 'DELETE') {
        opt.body = params;
      } else {
        opt.params = params;
      }

      return opt;
    });

    _defineProperty(this, "setOptions", async (searchValue, isSetOptions = true) => {
      if (!this.props.api) {
        this.setState({
          options: this.props.options || []
        });
        return;
      }

      this.setState({
        loading: true
      });
      const KEYS = this.state.keys;
      let opt = this.genRequestOptions(searchValue);

      if (_.get(this.props, 'api.beforeRequest')) {
        opt = await this.props.api.beforeRequest(opt);
      }

      let options;

      try {
        const res = await request(opt.url, opt);
        options = _.get(res, KEYS.options, []);

        if (!_.isArray(options)) {
          console.error('schema: options is not Array, please check  \'keys.options\'');
          return;
        }

        if (isSetOptions) {
          // 重新搜索时，把当前已选中的item存储下来
          let ids = _.isArray(this.props.value) ? this.props.value : [this.props.value];

          const allOptions = _.unionBy([...this.state.selItems, ...this.state.options], KEYS.value);

          const valueKey = this.state.keys.value;
          let selItems = allOptions.filter(x => ids.includes(x[valueKey]));
          this.setState({
            selItems,
            options
          });
        }
      } catch (err) {
        console.error(err);
      }

      this.setState({
        loading: false
      });
      return options;
    });

    _defineProperty(this, "onChange", v => {
      console.log(v);
      this.currentValue = v;
      const KEYS = this.state.keys;

      const allOptions = _.unionBy([...this.state.selItems, ...this.state.options], KEYS.value);

      const sel = _.find(allOptions, [KEYS.value, v]);

      this.props.onChange && this.props.onChange(v, sel, this.state.options);
    });

    _defineProperty(this, "onFocus", () => {
      if (!this.state.options || this.state.options.length === 0) {
        this.onSearch();
      }
    });

    this.state = {
      options: [],
      loading: false,
      keys: { ...DEF_KEYS,
        ...this.props.keys
      },
      selItems: [] // 存储已选中的items

    };
    this.onSearch = _.debounce(this.setOptions, 500);
  }

  componentDidMount() {
    if (!this.props.api) {
      if (_.isArray(this.props.options)) {
        this.setState({
          options: this.props.options || []
        });
      } else {
        console.warn('nextProps.options must be Array');
      }
    } else {
      this.genSelItem(this.props.value);
      this.setOptions();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.api) {
      if (_.isArray(nextProps.options)) {
        this.setState({
          options: nextProps.options || []
        });
      } else {
        console.warn('nextProps.options must be Array');
      }

      return;
    }

    const nextParams = _.get(nextProps, 'api.params');

    const params = _.get(this.props, 'api.params');

    if (!_.isEqual(nextProps.value, this.props.value) || nextParams && !_.isEqual(nextParams, params)) {
      this.genSelItem(nextProps.value);
    }
  } // 保证已选中的id，存在对应的选中项


  render() {
    const {
      options,
      api,
      keys,
      addonAfter,
      onChange,
      onSearch,
      ...others
    } = this.props;
    const KEYS = this.state.keys;
    let withApiProps;

    if (this.props.api) {
      withApiProps = DEF_WITH_API_PROPS;
    }

    const allOptions = _.unionBy([...this.state.selItems, ...this.state.options], KEYS.value);

    return React.createElement(React.Fragment, null, React.createElement(Select, _extends({
      loading: this.state.loading,
      onChange: this.onChange,
      onSearch: this.onSearch,
      onFocus: this.onFocus,
      notFoundContent: this.state.loading ? React.createElement("div", {
        style: {
          textAlign: 'center'
        }
      }, React.createElement(Icon, {
        type: "loading",
        style: {
          fontSize: 18
        },
        spin: true,
        delay: 300
      })) : undefined
    }, withApiProps, others), allOptions.map((item, index) => React.createElement(Option, {
      key: _.get(item, KEYS.value),
      value: _.get(item, KEYS.value),
      title: _.get(item, KEYS.label)
    }, this.props.render(item, index, KEYS))), this.props.children), this.props.addonAfter);
  }

}

_defineProperty(_Select, "defaultProps", {
  options: [],
  api: null,
  keys: {},
  addonAfter: null,
  isStringifySearch: true,
  // render: (item, index, keys) => `${_.get(item, keys.label)}(${_.get(item, keys.value)})`
  render: (item, index, keys) => `${_.get(item, keys.label)}`
});

_Select.propTypes = {
  options: PropTypes.array,
  api: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  keys: PropTypes.object,
  addonAfter: PropTypes.node,
  isStringifySearch: PropTypes.bool,
  render: PropTypes.func
};
_Select.Option = Option;
export default _Select;