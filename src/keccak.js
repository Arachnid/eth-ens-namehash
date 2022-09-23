import {keccak256} from 'js-sha3';

export function labelhash(x) {
	return '0x' + keccak256.hex(x);
}

export function namehash(name) {
	if (typeof name !== 'string') throw new TypeError('expected string');
	let s = '0000';
	while (s.length < 64) s += s;
	if (name.length) {
		let buf = new Uint8Array(64);
		let h;
		for (let label of name.split('.').reverse()) {
			buf.set(new Uint8Array(keccak256.arrayBuffer(label)), 32);
			h = keccak256.create().update(buf);
			buf.set(new Uint8Array(h.arrayBuffer()), 0);
		}
		s = h.hex();
	}
	return '0x' + s;
}
