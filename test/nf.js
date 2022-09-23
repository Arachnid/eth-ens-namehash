import {readFileSync} from 'node:fs';
import {compare_arrays, explode_cp} from '../src/utils.js';
import {nfc as nfc_custom, nfd as nfd_custom} from '../src/nf.js';

const TESTS = JSON.parse(readFileSync(new URL('../derive/output/nf-tests.json', import.meta.url)));

function run_tests(nfd, nfc) {
	let errors = [];
	for (let [name, cases] of Object.entries(TESTS)) {
		for (let strs of cases) {
			let [input, nfd0, nfc0] = strs.map(explode_cp);
			let nfd1 = nfd(input);
			if (compare_arrays(nfd0, nfd1)) {
				errors.push({name, input, nfd0, nfd1});
			}
			let nfc1 = nfc(input);
			if (compare_arrays(nfc0, nfc1)) {
				console.log({name, input, nfc0, nfc1});
			}
		}
	}
	return errors;
}

// test custom (must pass)
if (run_tests(nfd_custom, nfc_custom).length) throw new Error('custom');
