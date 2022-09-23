import {
	ens_normalize, 
	ens_beautify, 
	ens_tokenize, 
	ens_emoji, 
	ens_normalize_fragment, 
	ens_normalize_post_check
} from './lib.js';

import {nfc, nfd} from './nf.js';

import {labelhash, namehash} from './keccak.js';

function normhash(s) {
	return namehash(ens_normalize(s));
}

export default {
	hash: namehash,
	labelhash,
	normhash,
	normalize: ens_normalize,
	beautify: ens_beautify,
	tokenize: ens_tokenize,
	emojis: ens_emoji,
	normalizeFragment: ens_normalize_fragment,
	normalizeFragmentPostCheck: ens_normalize_post_check,	
	nfc,
	nfd
};