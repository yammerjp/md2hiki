`use strict`

const { promises : fs } = require('fs');

fs.readFile( process.argv[2], { encoding: 'utf-8' }).then( text => {
  console.log(text);
});
