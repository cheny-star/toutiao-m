module.exports = {
  plugins: {
    //  vue-cli已经配置了
    //   'autoprefixer': {
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },
    'postcss-pxtorem': {
      // rootValue: 37.5,
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
