
const express = require('express');
const path = require('path');

const app = express();

const publicDirectoryPath = path.join(__dirname, 'public');

app.use(express.static(publicDirectoryPath));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
