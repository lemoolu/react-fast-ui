function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 经纬度
 */
import react, { PureComponent } from 'react';
import _ from 'lodash';
export default class Map extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", ({
      lng,
      lat
    }) => {
      this.setState({
        position: {
          lng,
          lat
        }
      });
      this.onShowPint(lng, lat);
      this.props.onChange && this.props.onChange({
        lng,
        lat
      });
    });

    _defineProperty(this, "onSearch", key => {
      this.placeSearch.search(key, (status, result) => {
        // console.log(result)
        const pois = _.get(result, 'poiList.pois[0].location');

        pois && this.onChange({
          lng: pois.lng,
          lat: pois.lat
        });
      });
    });

    _defineProperty(this, "onShowPint", (lng, lat) => {
      this.point && this.point.hide();
      this.point = new this.SimpleMarker({
        //显示定位基点
        showPositionPoint: true,
        // iconStyle: 'blue',
        map: this.map,
        position: [lng, lat]
      });
      this.map.setCenter([lng, lat]);
    });
  }

  componentDidMount() {
    if (!window.AMap) {
      console.error('window.AMap is not define');
      return;
    }

    this.map = new window.AMap.Map('container', {
      resizeEnable: true
    });
    this.map.on('click', e => {
      // console.log(e.lnglat.getLng(), e.lnglat.getLat());
      this.onChange({
        lng: e.lnglat.getLng(),
        lat: e.lnglat.getLat()
      });
    });
    window.AMap.plugin('AMap.PlaceSearch', () => {
      this.placeSearch = new window.AMap.PlaceSearch({
        city: '全国'
      });
    });
    window.AMapUI.loadUI(['overlay/SimpleMarker'], SimpleMarker => {
      this.SimpleMarker = SimpleMarker;

      if (this.props.value && this.props.value.lng) {
        this.onChange(this.props.value);
      }
    });
    this.searchHandle = _.debounce(this.onSearch, 500);
  }

  componentWillUnmount() {
    this.map && this.map.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search && nextProps.search !== this.props.search) {
      this.searchHandle && this.searchHandle(nextProps.search);
    }

    if (!_.isEqual(nextProps.value && this.props.value)) {
      this.onChange(this.props.value);
    }
  }

  render() {
    let style;

    if (this.props.size === 'preset') {
      style = {
        width: 400,
        height: 200,
        ...this.props.style
      };
    } else {
      style = {
        width: '100%',
        height: '100%',
        ...this.props.style
      };
    }

    return React.createElement("div", {
      id: "container",
      style: style
    });
  }

}

_defineProperty(Map, "defaultProps", {
  search: '',
  // 搜索位置，自动定位
  value: undefined,
  size: 'preset' // auto 根据外部大小100%，preset预设大小

});