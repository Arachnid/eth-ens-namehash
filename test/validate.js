import {readFileSync} from 'node:fs';
import {normalize, tokenize, normalizePostCheck} from '../src/index.js';

const TESTS = JSON.parse(readFileSync(new URL('../validate/tests.json', import.meta.url)));

function run_tests(fn) {
	let errors = [];
	for (let test of TESTS) {
		let {name, norm, error} = test;
		if (typeof norm !== 'string') norm = name;
		try {
			let result = fn(name);
			if (error) {	
				errors.push({type: 'expected error', result, ...test});
			} else if (result != norm) {
				errors.push({type: 'wrong norm', result, ...test});
			}
		} catch (err) {
			if (!error) {
				errors.push({type: 'unexpected error', result: err.message, ...test});
			}
		}
	}
	return errors;
}

// proof of concept
function normalize_via_tokenize(name) {
	return normalizePostCheck(tokenize(name).flatMap(token => {
		switch (token.type) {
			case 'disallowed': throw new Error('disallowed'); 
			case 'ignored': return '';
			case 'stop': return '.';
			case 'isolated': return String.fromCodePoint(token.cp);
			default: return String.fromCodePoint(...token.cps);
		}
	}).join(''));
}

test(normalize);
test(normalize_via_tokenize);
console.log('OK');

function test(fn) {
	let errors = run_tests(fn);
	if (errors.length) {
		console.log(errors);
		console.log(`Errors: ${errors.length}`);
		throw new Error(fn.name);
	}
	console.log(`PASS ${fn.name}`);
}

