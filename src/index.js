`use strict`

const { promises : fs } = require('fs');
const marked = require('marked');

fs.readFile( process.argv[2], { encoding: 'utf-8' }).then( text => {

  console.log(marked(text));
});
