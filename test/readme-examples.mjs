import * as lib from '../src/index.mjs';

let input = '👨️‍💻nIcK.EtH';
let normalized = lib.normalize(input);
console.log({normalized});

let node1 = lib.namehash(normalized);
let node2 = lib.normhash(input);
console.log({node1, node2, same: node1 === node2});

let hash = lib.labelhash("abc");
console.log({hash});

let pretty = lib.beautify('1⃣2⃣.eth'); 
console.log({pretty});

let tokens = lib.tokenize('_R💩\u{FE0F}a\u{FE0F}\u{304}\u{AD}./');
console.log(tokens);

let split = lib.split('💩Raffy.eth_');
console.log(split);

let emojis = lib.allEmoji();
console.log(emojis.slice(0, 3));
