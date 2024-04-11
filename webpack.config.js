const path = require('path');

module.exports = {
    entry: '/public/assets/js/xterm.js',
    output: {
        filename: 'bundle.js', // Specify the output filename
        path: path.resolve(__dirname, 'public/bundled.js') // Output directory
    }
};
