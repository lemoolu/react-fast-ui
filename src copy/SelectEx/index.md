# 高级选择器-支持接口

|    参数    |                         说明                         |   类型   |  默认值  |
|------------|------------------------------------------------------|----------|----------|
| onChange | 选中变更 | Func(value, selObj, options)，当前选择id，当前选中项，当前可选列表 | [] |
| options | 下拉可选列表 | Array | [] |
| api | 接口，接口url或者{ url, method} | Object\|String | null |
|  | api.url 请求地址，'/api/getlist' | String | null |
|  | api.method 请求方式 | String | 'GET' |
|  | api.headers 请求headera，如 { ticket: Cookies.get('SSO_BOSS_SUB_TICKET') } | Object | null |
|  | api.params 请求基础参数，如 { pageSize: 10, page: 1} | Object | null |
| keys | 对应数据中的索引配置 { options, search, title, value} | Object | { options: 'data', search: 'search', title: 'name', value: 'id'} |
|  | keys.options 响应中对应下拉数组 | String | 'data' |
|  | keys.search 搜索对应参数 | String | 'search' |
|  | keys.searchAsId 对搜索参数的补充，当用户输入为数值时，使用该参数进行请求 | String | null |
|  | keys.title 下拉选项文本索引 | String | 'name' |
|  | keys.value 下拉选项值索引 | String | 'id' |
| addonAfter | 添加在select下方的描述文件，如：请前往xx系统进行配置 | Any | null |
| isStringifySearch | 是否在请求时将value 数组转化为字符串。true一次请求:/api?id=1,2；flase多次请求:/api?id=1,/api?id=2。需后端接口支持 | Boolen | true |
| ... | 其余antd参数 |  |  |
