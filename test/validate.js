import {ens_normalize} from '../src/lib.js';
import {run_tests} from '../src/utils.js';
import {readFileSync} from 'node:fs';

const TESTS = JSON.parse(readFileSync(new URL('./tests.json', import.meta.url)));

let errors = run_tests(ens_normalize, TESTS);
if (errors.length) {
	console.log(errors);
	console.log(`Errors: ${errors.length}`);
	throw new Error('validate');
}
console.log(`PASS validate`);
