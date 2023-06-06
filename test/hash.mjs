import {namehash} from '../src/index.mjs';

let m = [
	['0x0000000000000000000000000000000000000000000000000000000000000000', ''],
	['0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae', 'eth'],
	['0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f', 'foo.eth'],
	['0xb791e49ae023e1ed2b4f9ef547cf221fc54ff5bf8a177cecfb0bf4287c2655ff', 'FOO.eth'],
	['0x62948a9e725afc2b201c0c643189fa475595b51e411b9306d25bb2cbf7a69518', '..'],
	['0xa9291d52bd57884645cecbfdaff35cd969acf3fe22507f4087b8e95470907928', '.a..b...cde']
];

for (let [hash0, name] of m) {
	let hash = namehash(name);
	if (hash0 !== hash) {
		console.log({name, hash0, hash});
		throw new Error(`namehash`);
	}
}
console.log('PASS namehash');
