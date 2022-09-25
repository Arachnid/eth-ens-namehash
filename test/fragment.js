import {normalize, normalizeFragment, nfd} from '../src/index.js';

// naive implementation
function name_contains_fragment(name, frag) {
	// convert the name to NFD because:
	//   è = E8 => 65 300
	// note that:
	//   name_contains_fragment("è", "e") => true
	//   name_contains_fragment("è", String.fromCodePoint(300)) => true
	// if instead, you want exact codepoint matching: 
	//   use normalizeFragment() without the nfd argument (which defaults to nfc)
	try {
		return normalizeFragment(name, nfd).includes(normalizeFragment(frag, nfd));
	} catch (ignored) {
	}
}

// examples
test('1234--a', '34--A');    // error: invalid label extension
test('e\u{303}', '\u{303}'); // error: leading combining mark

function test(name, frag) {
	try {
		normalize(name);
	} catch (err) {
		throw new Error(`expected name should normalize: ${name}`);
	}
	ok: {
		try {
			normalize(frag);
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
