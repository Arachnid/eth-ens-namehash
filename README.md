# Todo

* Decide Top-level API Names
	* Current export is: `{hash, normalize}`
		* `hash(name: string): string<0x+64hex>`
		* `normalize(name: string): string`
	* [@adraffy/ens_normalize](https://github.com/adraffy/eth-ens-namehash)
		* `ens_normalize(name: string): string`
		* `ens_beautify(name: string): string` (Util)  
			&rarr; `beautify()`
		* `ens_tokenize(name: string): Token[]` (Util)  
		&rarr; `tokenize()`
		* `ens_emoji(): number[][]`  
		&rarr; `emojis()`
		* `ens_normalize_fragment(frag: string): string` (LL)  
		&rarr; `normalizeFragment()`
		* `ens_normalize_post_check(norm: string): string` (LL)  
		 &rarr; `normalizePostCheck()`
		* `nfd(cps: number[]): number[]` (LL, Util) &rarr; *hide*
		* `nfc(cps: number[]): number[]` (LL, Util) &rarr; *hide*
* Decide Data Location  
*probably direct-copy from [@adraffy/ensip-norm](https://github.com/adraffy/ensip-norm)*
	* `chars.json`
	* `emoji.json`
	* `tests.json`
* Other Notes:
	* `js-sha3` shouldn't be a dev-dependancy
	* How do I link to the ENSIP?	


---

# Eth ENS Namehash (Fork)

A javascript library for generating Ethereum Name Service (ENS) namehashes per [spec](https://github.com/ethereum/EIPs/issues/137).

[Available on NPM](https://www.npmjs.com/package/@ensdomains/eth-ens-namehash)

## Installation

`npm install @ensdomains/eth-ens-namehash -S`

## Usage

```javascript
var namehash = require('@ensdomains/eth-ens-namehash')
var hash = namehash.hash('foo.eth')
// '0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f'

// Also supports normalizing strings to ENS compatibility:
var input = getUserInput()
var normalized = namehash.normalize(input)
```

## Security Warning

ENS Supports UTF-8 characters, and so many duplicate names are possible. For example:

- faceboоk.eth
- facebook.eth

The first one has non-ascii chars. (control+F on this page and search for facebook, only the second one will match).

namehash.normalize() doesn't automagically remap those, and so other precautions should be taken to avoid user phishing.

## Development

This module supports advanced JavaScript syntax, but exports an ES5-compatible module. To re-build the exported module after making changes, run `npm run bundle` (must have [browserify](http://browserify.org/) installed).

