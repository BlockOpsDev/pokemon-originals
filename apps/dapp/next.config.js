const path = require('path');

module.exports = {
  reactStrictMode: true,
  experimental: {
    turbotrace: {
      contextDirectory: path.join(__dirname, "../../"),
    },
},
};
