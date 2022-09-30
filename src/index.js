import {
	ens_normalize as normalize, 
	ens_beautify as beautify, 
	ens_tokenize as tokenize, 
	ens_emoji as supportedEmojis, 
	ens_normalize_fragment as normalizeFragment, 
	ens_normalize_post_check as normalizePostCheck,
	nfc, nfd
} from './lib.js';

import {labelhash, namehash} from './hash.js';

function normhash(s) {
	return namehash(normalize(s));
}

export {
	namehash as hash,
	namehash, labelhash, normhash,
	normalize, beautify, tokenize, supportedEmojis,
	normalizeFragment, normalizePostCheck,	
	nfd, nfc,
};

/*
// this is a better idiom?
// `import * as f from ...`
export default {
	hash: namehash, 
	namehash, labelhash, normhash,
	normalize, beautify, tokenize, supportedEmojis,
	normalizeFragment, normalizePostCheck,	
	nfd, nfc,
};
*/