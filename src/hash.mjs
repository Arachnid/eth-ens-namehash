// this doesn't import correctly
// potentially switch to https://github.com/adraffy/keccak.js
import pkg from 'js-sha3'; 
const {keccak256} = pkg;

export function labelhash(x) {
	return '0x' + keccak256.hex(x);
}

// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md
export function namehash(name) {
	if (typeof name !== 'string') throw new TypeError('expected string');
	if (!name) return '0x0000000000000000000000000000000000000000000000000000000000000000';
	let h;
	let v = new Uint8Array(64);
	let i = name.length;
	while (true) {
		let j = i ? name.lastIndexOf('.', i-1) : -1;
		v.set(new Uint8Array(keccak256.arrayBuffer(name.slice(j+1, i))), 32);
		h = keccak256.create().update(v);
		if (j < 0) break;
		v.set(new Uint8Array(h.arrayBuffer()), 0);
		i = j;
	}
	return '0x' + h.hex();
}
