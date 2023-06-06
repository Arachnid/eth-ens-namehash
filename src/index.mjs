// convert snake to camel
import {
	ens_normalize as normalize, 
	ens_beautify as beautify, 
	ens_tokenize as tokenize, 
	ens_emoji as allEmoji, 
	ens_split as split,
	ens_normalize_fragment as normalizeFragment, 
	is_combining_mark as isCombiningMark,
	should_escape as shouldEscape,
	safe_str_from_cps as safeStringFromCodePoints,
	nfc, nfd // as-is
} from './lib.mjs';

import {labelhash, namehash} from './hash.mjs';

function normhash(s) {
	return namehash(normalize(s));
}

export {
	namehash as hash, // backwards compat
	namehash, labelhash, normhash,
	normalize, normalizeFragment, beautify, tokenize, split, allEmoji,
	isCombiningMark, shouldEscape, safeStringFromCodePoints,
	nfd, nfc,
};
