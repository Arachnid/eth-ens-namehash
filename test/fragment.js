import lib from '../src/index.js';

// naive implementation
function name_contains_fragment(name, frag) {
	try {
		return lib.normalizeFragment(name).normalize('NFD').includes(lib.normalizeFragment(frag).normalize('NFD'));
	} catch (ignored) {
	}
}

// examples
test('1234--a', '34--A');    // error: invalid label extension
test('e\u{303}', '\u{303}'); // error: leading combining mark

function test(name, frag) {
	try {
		lib.normalize(name);
	} catch (err) {
		throw new Error(`expected name should normalize: ${name}`);
	}
	ok: {
		try {
			lib.normalize(frag);
		} catch (err) {		
			break ok;
		}
		throw new Error(`expected frag shouldn't normalize: ${frag}`);
	}
	let contains = name_contains_fragment(name, frag); 
	if (!contains) {
		throw new Error(`expected containment: ${name} ${frag}`)
	}
	console.log({name, frag, contains});
}
