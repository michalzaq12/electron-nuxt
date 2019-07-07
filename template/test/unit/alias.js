const path = require('path')

const ROOT = path.join(__dirname, '..', '..', 'src', 'renderer')

module.exports = {
  resolve: {
    alias: {
      '@': ROOT,
      '~': ROOT
    },
    extensions: [
      '.vue', '.js'
    ]
  }
}
