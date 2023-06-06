interface DisallowedToken {
	type: 'disallowed';
	cp: number;
}
interface IgnoredToken {
	type: 'ignored';
	cp: number;
}
interface ValidToken {
	type: 'valid';
	cps: number[];
}
interface MappedToken {
	type: 'mapped';	
	cp: number;
	cps: number[];
}
type TextToken = DisallowedToken | IgnoredToken | ValidToken | MappedToken;
interface EmojiToken {
	type: 'emoji';
	input: number[];
	emoji: number[];
	cps: number[];
}
interface NFCToken {
	type: 'nfc';
	input: number[];
	cps: number[];
	tokens: TextToken[]; 
}
interface StopToken {
	type: 'stop';
}
type Token = TextToken | EmojiToken | NFCToken | StopToken;

interface Label {
	input: number[];
	offset: number;
	error?: Error;
	tokens?: number[][];
	output?: number[];
	emoji?: boolean;
	type?: string;
}

/** Alias for namehash() */
export function hash(name: string): string;

export function namehash(name: string): string;
export function labelhash(label: string): string;
export function normhash(name: string): string;

export function normalize(name: string): string;
export function normalizeFragment(frag: string, decompose?: boolean): string;
export function beautify(name: string): string;
export function tokenize(name: string, options?: {nf?: boolean}): Token[];
export function split(name: string, preserve_emoji?: boolean): Label[];

export function allEmoji(): number[][];

export function shouldEscape(cp: number): boolean;
export function isCombiningMark(cp: number): boolean;
export function safeStringFromCodePoints(cps: number[]): string;

export function nfd(cps: number[]): number[];
export function nfc(cps: number[]): number[];
