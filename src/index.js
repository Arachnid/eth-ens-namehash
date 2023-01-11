import {
	ens_normalize as normalize, 
	ens_beautify as beautify, 
	ens_tokenize as tokenize, 
	ens_emoji as emojis, 
	ens_split as split,
	ens_normalize_fragment as normalizeFragment, 
	nfc, nfd,
	is_combining_mark as isCombiningMark,
	should_escape as shouldEscape,
	safe_str_from_cps as safeStringFromCodePoints
} from './lib.js';

import {labelhash, namehash} from './hash.js';

function normhash(s) {
	return namehash(normalize(s));
}

export {
	namehash as hash, // backwards compat
	namehash, labelhash, normhash,
	normalize, normalizeFragment, beautify, tokenize, split, 
	emojis,
	isCombiningMark, shouldEscape, safeStringFromCodePoints,
	nfd, nfc,
};
