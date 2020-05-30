`use strict`

const { promises : fs } = require('fs');
const marked = require('marked');
const { html2json } = require('html2json');

let printString = '';
function print(text) {
  printString += text;
}
function printStdout() {
  console.log(printString);
};

function printNode(node) {
  if( node.node === 'text' ) {
    print(node.text);
    return;
  }
  if( node.node !== 'element' ) {
    console.error(`unknown node : ${node}`);
    process.exit(1);
  }
  switch ( node.tag ) {
    case 'h1':
      print('!');
      break;
    case 'h2':
      print('!!');
      break;
    case 'h3':
      print('!!!');
      break;
    case 'h4':
      print('!!!!');
      break;
    case 'a':
      print(`[[`);
      node.child.forEach( node => printNode(node) );
      print(`|${node.attr.href}]]`);
      return;
    case 'p':
      node.child.forEach( node => printNode(node) );
      print(`\n`);
      return;
    case 'ul':
      break;
    case 'li':
      print("#");
      break;
    case 'strike':
      print("==");
      node.child.forEach( node => printNode(node) );
      print("==");
      return;
    default :
      console.error(`unknown node : ${node}`);
      process.exit(1);
  }
  node.child.forEach( node => printNode(node) );
}

fs.readFile( process.argv[2], { encoding: 'utf-8' }).then( markdown => {

  const html = marked( markdown );
  const dom = html2json( html );

  if ( dom.node !== 'root') {
    console.error('parse html2json is failed');
    process.exit(1);
  } 

  dom.child.forEach( node => {
    printNode(node);
  });

  printStdout();
});


/*
{
  node: 'root',
  child: [
    { node: 'element', tag: 'h1', attr: [Object], child: [Array] },
    { node: 'text', text: '\n' },
    { node: 'element', tag: 'h2', attr: [Object], child: [Array] },
    { node: 'text', text: '\n' }
  ]
}

*/
