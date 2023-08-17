const fs = require('fs-extra');

fs.copy('.htaccess', 'dist/frontend/.htaccess')
  .then(() => {
    console.log('.htaccess copied successfully');
  })
  .catch(err => {
    console.error('Error copying .htaccess', err);
  });