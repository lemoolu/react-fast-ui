/**
 * 数据处理函数
 */

export default {
  address2Submit(data) {
    return {
      ...data,
      ...data._address,
    }
  },
  address2Edit(data) {
    return {
      ...data,
      _address: {
        province: data.province,
        city: data.city,
        area: data.area,
        address: data.address,
      }
    }
  }
}
