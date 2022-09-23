# Todo

* Decided Top-level API Names
	* Current export is: `{hash, normalize}`
		* ✅`hash(name: string): string<0x+64hex>`
		* ✅`normalize(name: string): string`
	* [@adraffy/ens_normalize](https://github.com/adraffy/eth-ens-namehash)
		* ✅`labelhash(name: string): string`
		* ✅`normhash(name: string): string`
		* ✅`ens_normalize(name: string): string` &rarr; `normalize()`
		* ✅`ens_beautify(name: string): string` &rarr; `beautify()`
		* ✅`ens_tokenize(name: string): Token[]` &rarr; `tokenize()`
		* ✅`ens_emoji(): number[][]` &rarr; `emojis()`
		* ✅`ens_normalize_fragment(frag: string): string`  &rarr; `normalizeFragment()`
		* `ens_normalize_post_check(norm: string): string`  &rarr; `normalizeFragmentPostCheck()`
		* ✅ `nfd(cps: number[]): number[]`
		* ✅ `nfc(cps: number[]): number[]`
* ~~Decide Data Location~~ Included Directly in `/derive/`
* Other Notes:
	* `js-sha3` shouldn't be a dev-dependancy
	* ~~How do I link to the ENSIP?~~

---

# eth-ens-namehash.js

[Ethereum Name Service](https://ens.domains/) (ENS) Name Normalizer.

* Follows [ENS Name Normalization Standard](https://github.com/adraffy/ensip-norm/blob/main/draft.md)
* Passes **100%** Validation Tests
* Custom [`NFC`](https://unicode.org/reports/tr15/) Implementation (or use native)
	* Passes **100%** Unicode `15.0.0` [Normalization Tests](https://www.unicode.org/Public/15.0.0/ucd/NormalizationTest.txt)
* Unminified File Size: `44KB`

```Javascript
import {normalize} from '@ensdomains/eth-ens-namehash';

// string -> string
// throws on invalid names
// output ready for namehash
let normalized = normalize('RaFFY🚴‍♂️.eTh');
// "raffy🚴‍♂.eth"

// note: does not enforce .eth TLD 3-character minimum
```
Format names with fully-qualified emoji:
```JavaScript
// works like ens_normalize
// output ready for display
let pretty = beautify('1⃣2⃣.eth'); 
// "1️⃣2️⃣.eth"

// note: normalization is unchanged:
// ens_normalize(ens_beautify(x)) == ens_normalize(x)
```

Normalize name fragments:
```Javascript
// these fragments fail ens_normalize() due to ens_normalize_post_check() rules
// but will normalize fine as fragments
let frag1 = normalizeFragment('AB--');
let frag2 = normalizeFragment('\u{303}');

// structural logic is delayed until Post-check:
let norm_gTLD = normalizeFragmentPostCheck('eth');
```

Instead of exposing an IDNA-like API (`is_valid()`, `get_mapped()`, etc.), this library exposes a single function which converts names to tokens:
```JavaScript
// string -> Token[]
let tokens = tokenize('_R💩\u{FE0F}a\u{FE0F}\u{304}\u{AD}./'); // never throws
// [
//     { type: 'isolated', cp: 95 }, // valid w/restrictions
//     {                             // (eg. no combining marks)
//         type: 'mapped', 
//         cp: 82,         // input
//         cps: [ 114 ]    // output
//     }, 
//     { 
//         type: 'emoji',
//         input: [ 128169, 65039 ],  // input 
//         emoji: [ 128169, 65039 ],  // fully-qualified
//         cps: [ 128169 ]            // output
//     },
//     {
//         type: 'nfc',
//         input: [ 97, 772 ],  // input (before nfc, only valid or mapped)
//         cps: [ 257 ],        // output (after nfc)
//         tokens: [            // tokens (before nfc)
//             { type: 'valid', cps: [ 97 ] },
//             { type: 'ignored', cp: 65039 },
//             { type: 'valid', cps: [ 772 ] }
//         ]
//     },
//     { type: 'ignored', cp: 173 },
//     { type: 'stop' },
//     { type: 'disallowed', cp: 47 }
// ]
```

Generates an array of supported emoji codepoints:
```Javascript
// () -> number[][]
console.log(emojis());
// [
//     [ 2764 ],
//     [ 128169, 65039 ],
//     [ 128105, 127997, 8205, 9877, 65039 ],
//     ...
// ]
```

## Build

* `git clone` this repo, then `npm install` 
* Follow instructions in [/derive/](./derive/) to generate data files
	* `npm run derive` 
		* [spec.json](./derive/output/spec.json)
		* [nf.json](./derive/output/nf.json)
		* [nf-tests.json](./derive/output/nf-tests.json)
* `npm run make` — compress data files from `/derive/output/`
	* [include-ens.js](./src/include-ens.js)
	* [include-nf.js](./src/include-nf.js)
* Follow instructions in [/validate/](./validate/) to generate validation tests
	* `npm run validate`
		* [tests.json](./validate/tests.json)
* `npm run test` — perform validation tests
* `npm run build` — create `/dist/`

---

# Eth ENS Namehash

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

