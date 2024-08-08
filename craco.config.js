const path = require('path')

module.exports = {
  // webpack 
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}