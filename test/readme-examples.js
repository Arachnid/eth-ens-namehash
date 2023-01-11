import * as lib from '../src/index.js';

let name = '👨️‍💻nIcK.EtH';
let normalized = lib.normalize(name);
console.log({normalized});

let node = lib.namehash(normalized);
console.log({node});
console.log(node === lib.normhash(name));

let pretty = lib.beautify('1⃣2⃣.eth'); 
console.log({pretty});

let tokens = lib.tokenize('_R💩\u{FE0F}a\u{FE0F}\u{304}\u{AD}./');
console.log(tokens);

let split = lib.split('💩Raffy.eth_');
console.log(split);

let emojis = lib.emojis();
console.log(emojis.slice(0, 3));
