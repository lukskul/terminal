const path = require('path');

module.exports = {
    entry: '/public/assets/js/xterm.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/assets/js/bundled.js')
    }
};
