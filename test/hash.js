import lib from '../src/index.js';

let m = [
	['0x0000000000000000000000000000000000000000000000000000000000000000', ''],
	['0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae', 'eth'],
	['0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f', 'foo.eth'],
];

for (let [hash0, name] of m) {
	let hash = lib.hash(name);
	if (hash0 !== hash) {
		console.log({name, hash0, hash});
		throw new Error(`namehash`);
	}
}
console.log('PASS namehash');
