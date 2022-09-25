import {normalize, namehash, beautify, tokenize, supportedEmojis} from '../src/index.js';

let normalized = normalize('👨️‍💻nIcK.EtH');
console.log({normalized});

let node = namehash(normalized);
console.log({node});

let pretty = beautify('1⃣2⃣.eth'); 
console.log({pretty});

let tokens = tokenize('_R💩\u{FE0F}a\u{FE0F}\u{304}\u{AD}./');
console.log(tokens);

let emojis = supportedEmojis();
console.log(emojis);
