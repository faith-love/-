module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75;
      },
       // * 表示所有
       propList: ['*'],
       // 配置不要转换的样式资源
       exclude: 'github-markdown'  // 增加这一句！
    },
  },
};