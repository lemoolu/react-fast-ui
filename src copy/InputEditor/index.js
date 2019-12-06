import React, { PureComponent } from 'react';
import wangEditor from 'wangeditor';

export default class InputEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = null;
    this.isEdited = false;
  }

  componentDidMount() {
    this.editor = new wangEditor(this.ref);
    this.editor.customConfig.zIndex = 10;
    this.editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      // 'fontName',  // 字体
      'italic',  // 斜体
      // 'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      // 'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      // 'quote',  // 引用
      // 'emoticon',  // 表情
      'image',  // 插入图片
      // 'table',  // 表格
      // 'video',  // 插入视频
      // 'code',  // 插入代码
      // 'undo',  // 撤销
      // 'redo'  // 重复
    ];
    this.editor.customConfig.onchange = (html) => {
      this.isEdited = true;
      this.props.onChange && this.props.onChange(html)
    }
    this.editor.create();
    this.setHtml(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.setHtml(nextProps.value);
    }
  }

  setHtml = (v) => {
    console.log(v, this.isEdited)
    if (this.isEdited) {
      return;
    }
    console.log('--')
    this.editor.txt.html(v);
  }

  render() {
    return (
      <div ref={r => this.ref = r}></div>
    )
  }
}
